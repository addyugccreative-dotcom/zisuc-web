import React, { useEffect, useRef, useState } from 'react';
import { registerVideoPlayback, unregisterVideoPlayback } from './OptimizedVideo';

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  removeSilverCap?: boolean;
  zoom?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  aboveTheFold?: boolean;
}

export const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({
  src,
  className,
  style,
  removeSilverCap = false,
  zoom = 1.48,
  flipHorizontal = false,
  flipVertical = false,
  aboveTheFold = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(aboveTheFold);
  const [webglError, setWebglError] = useState(false);

  const getOptimizedUrls = (originalSrc: string) => {
    if (!originalSrc) return { video: '', poster: '' };
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    let decoded = originalSrc;
    try {
      decoded = decodeURIComponent(originalSrc);
    } catch (e) {
      console.warn("Failed to decode URI in ChromaKeyVideo:", originalSrc, e);
    }
    const lastDotIdx = decoded.lastIndexOf('.');
    if (lastDotIdx === -1) return { video: originalSrc, poster: '' };
    const base = decoded.substring(0, lastDotIdx);
    return {
      video: isMobile ? `${base}_mobile.mp4` : `${base}_desktop.mp4`,
      poster: `${base}_poster.webp`
    };
  };

  const urls = getOptimizedUrls(src);
  const [videoSrc, setVideoSrc] = useState(urls.video);

  useEffect(() => {
    setVideoSrc(urls.video);
  }, [urls.video]);

  const currentVideoSrc = isNearViewport ? videoSrc : '';

  // 1. Near Viewport Observer (300px prefetch threshold to load and unload)
  useEffect(() => {
    if (aboveTheFold) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefetchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsNearViewport(entry.isIntersecting);
        });
      },
      { rootMargin: '300px 0px 300px 0px', threshold: 0.01 }
    );

    prefetchObserver.observe(canvas);
    return () => {
      prefetchObserver.disconnect();
    };
  }, [aboveTheFold]);

  // 2. WebGL Rendering and Active Viewport Playback Observer
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !currentVideoSrc) {
      setIsLoaded(false);
      return;
    }

    if (webglError) {
      // If WebGL failed previously, don't attempt context initialization
      return;
    }

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true }) || 
            canvas.getContext('experimental-webgl', { premultipliedAlpha: false, alpha: true })) as WebGLRenderingContext | null;
    } catch (e) {
      console.warn("WebGL context acquisition failed, falling back to standard video element:", e);
      setWebglError(true);
      return;
    }

    if (!gl) {
      console.warn("WebGL is not supported, falling back to standard video element.");
      setWebglError(true);
      return;
    }

    let animationFrameId: number;
    let isIntersecting = aboveTheFold;
    let program: WebGLProgram | null = null;
    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let texture: WebGLTexture | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let texCoordBuffer: WebGLBuffer | null = null;
    let render: () => void = () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            registerVideoPlayback(video);
            video.play().catch(() => {});
          } else {
            video.pause();
            unregisterVideoPlayback(video);
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(canvas);

    const handleLoadedMetadata = () => {
      canvas.width = video.videoWidth || 1080;
      canvas.height = video.videoHeight || 1080;
      setIsLoaded(true);
      if (isIntersecting) {
        registerVideoPlayback(video);
        video.play().catch(e => console.warn(e));
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.load();
    }

    try {
      const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
          v_texCoord = a_texCoord;
        }
      `;

      const fragmentShaderSource = `
        precision highp float;
        varying vec2 v_texCoord;
        uniform sampler2D u_image;
        uniform int u_removeSilverCap;
        uniform float u_zoom;
        uniform int u_flipHorizontal;
        uniform int u_flipVertical;

        void main() {
          vec2 texCoord = v_texCoord;
          if (u_flipHorizontal == 1) {
            texCoord.x = 1.0 - texCoord.x;
          }
          if (u_flipVertical == 1) {
            texCoord.y = 1.0 - texCoord.y;
          }

          vec2 centeredCoord = (texCoord - 0.5) / u_zoom + 0.5;

          if (centeredCoord.x < 0.0 || centeredCoord.x > 1.0 || centeredCoord.y < 0.0 || centeredCoord.y > 1.0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            return;
          }

          vec4 color = texture2D(u_image, centeredCoord);

          float r = color.r;
          float g = color.g;
          float b = color.b;

          // Custom green removal logic optimized for green-screen video rendering
          bool isGreen = (g > 0.43 && r < 0.55 && b < 0.55) || 
                         (g > 0.35 && g - r > 0.12 && g - b > 0.12);

          if (isGreen) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          } else {
            // Chroma cap threshold for cleaner blending
            if (u_removeSilverCap == 1) {
              float brightness = (r + g + b) / 3.0;
              if (brightness > 0.88 && abs(r - g) < 0.05 && abs(g - b) < 0.05) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
                return;
              }
            }
            gl_FragColor = color;
          }
        }
      `;

      const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
        const shader = glContext.createShader(type);
        if (!shader) return null;
        glContext.shaderSource(shader, source);
        glContext.compileShader(shader);
        if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
          console.error(glContext.getShaderInfoLog(shader));
          glContext.deleteShader(shader);
          return null;
        }
        return shader;
      };

      vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
      if (!vertexShader || !fragmentShader) {
        throw new Error("Shader compilation failed");
      }

      program = gl.createProgram();
      if (!program) throw new Error("Program creation failed");
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        throw new Error("Program linking failed");
      }

      gl.useProgram(program);

      const positionLocation = gl.getAttribLocation(program, "a_position");
      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const texCoordBufferRef = gl.createBuffer();
      texCoordBuffer = texCoordBufferRef;
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBufferRef);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0, 1.0,
        1.0, 1.0,
        0.0, 0.0,
        0.0, 0.0,
        1.0, 1.0,
        1.0, 0.0,
      ]), gl.STATIC_DRAW);

      const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const removeSilverCapLocation = gl.getUniformLocation(program, "u_removeSilverCap");
      const zoomLocation = gl.getUniformLocation(program, "u_zoom");
      const flipHorizontalLocation = gl.getUniformLocation(program, "u_flipHorizontal");
      const flipVerticalLocation = gl.getUniformLocation(program, "u_flipVertical");
      
      if (removeSilverCapLocation !== null) {
        gl.uniform1i(removeSilverCapLocation, removeSilverCap ? 1 : 0);
      }
      if (zoomLocation !== null) {
        gl.uniform1f(zoomLocation, zoom);
      }
      if (flipHorizontalLocation !== null) {
        gl.uniform1i(flipHorizontalLocation, flipHorizontal ? 1 : 0);
      }
      if (flipVerticalLocation !== null) {
        gl.uniform1i(flipVerticalLocation, flipVertical ? 1 : 0);
      }

      render = () => {
        if (isIntersecting && video.readyState >= 2 && gl) {
          try {
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
          } catch (e) {
            // Ignore
          }
        }
        animationFrameId = requestAnimationFrame(render);
      };

      video.addEventListener('play', render);
      if (isIntersecting) {
        registerVideoPlayback(video);
        video.play().catch(e => console.warn(e));
      }
      render();

    } catch (err) {
      console.warn("Failed initializing WebGL shader program. Falling back to default video renderer:", err);
      setWebglError(true);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('play', render);
        unregisterVideoPlayback(video);
      }
      if (gl) {
         try {
           if (program) gl.deleteProgram(program);
           if (vertexShader) gl.deleteShader(vertexShader);
           if (fragmentShader) gl.deleteShader(fragmentShader);
           if (texture) gl.deleteTexture(texture);
           if (positionBuffer) gl.deleteBuffer(positionBuffer);
           if (texCoordBuffer) gl.deleteBuffer(texCoordBuffer);
         } catch (e) {
           console.warn("Cleanup WebGL error:", e);
         }
      }
    };
  }, [currentVideoSrc, removeSilverCap, zoom, flipHorizontal, flipVertical, isNearViewport, aboveTheFold, webglError]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={style}>
      {/* Compressed WebP Poster Frame to prevent blank/white flash */}
      {urls.poster && (
        <img
          src={urls.poster}
          alt="Video poster frame"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ease-in-out z-5"
          style={{
            opacity: isLoaded ? 0 : 1,
          }}
          loading="lazy"
          decoding="async"
        />
      )}
      <video
        ref={videoRef}
        src={currentVideoSrc}
        loop
        muted
        autoPlay
        playsInline
        preload={aboveTheFold ? "auto" : "metadata"}
        crossOrigin="anonymous"
        onLoadedMetadata={() => setIsLoaded(true)}
        onError={() => {
          if (currentVideoSrc && currentVideoSrc !== src) {
            console.warn(`Optimized video failed to load, falling back to original: ${src}`);
            setVideoSrc(src);
          }
        }}
        className={webglError ? className : ''}
        style={webglError ? {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          ...style
        } : {
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      {!webglError && (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.04)]"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
    </div>
  );
};
