import React, { useEffect, useRef, useState } from 'react';

interface ColorReplaceVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  zoom?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  aboveTheFold?: boolean;
  reduceSilverLine?: boolean;
}

export const ColorReplaceVideo: React.FC<ColorReplaceVideoProps> = ({
  src,
  className,
  style,
  zoom = 1.0,
  flipHorizontal = false,
  flipVertical = false,
  aboveTheFold = false,
  reduceSilverLine = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const requestRef = useRef<number>();
  const [webglError, setWebglError] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(aboveTheFold);

  useEffect(() => {
    if (aboveTheFold) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, [aboveTheFold]);

  useEffect(() => {
    if (!isNearViewport || webglError) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      premultipliedAlpha: false,
      alpha: true,
      antialias: true
    });

    if (!gl) {
      console.warn("WebGL not supported, falling back to standard video player.");
      setWebglError(true);
      return;
    }

    let video = videoRef.current;
    if (!video) {
      video = document.createElement('video');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      video.autoplay = true;
      videoRef.current = video;
    }

    if (video.src !== new URL(src, window.location.href).href) {
      video.src = src;
      video.load();
    }

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
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_image;
      uniform float u_zoom;
      uniform int u_flipHorizontal;
      uniform int u_flipVertical;
      uniform int u_reduceSilverLine;

      void main() {
        // Zoom and flip logic
        vec2 center = vec2(0.5, 0.5);
        vec2 texCoord = v_texCoord;
        
        if (u_flipHorizontal == 1) texCoord.x = 1.0 - texCoord.x;
        if (u_flipVertical == 1) texCoord.y = 1.0 - texCoord.y;
        
        vec2 zoomedCoord = center + (texCoord - center) / u_zoom;
        
        if (zoomedCoord.x < 0.0 || zoomedCoord.x > 1.0 || zoomedCoord.y < 0.0 || zoomedCoord.y > 1.0) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          return;
        }

        vec4 color = texture2D(u_image, zoomedCoord);
        
        float r = color.r;
        float g = color.g;
        float b = color.b;
        
        float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        
        // If it's pure black or very close to it, replace it with transparent
        // Video compression usually makes black around 16/255 (0.062)
        if (luma < 0.07 && r < 0.08 && g < 0.08 && b < 0.08) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        } else if (luma < 0.2) {
          // Smooth blend for near-black pixels to remove jagged edges
          float alpha = smoothstep(0.07, 0.2, luma);
          gl_FragColor = vec4(color.rgb * alpha, alpha);
        } else {
          if (u_reduceSilverLine == 1 && r > 0.8 && g > 0.8 && b > 0.8) {
            // Darken silver reflection in the center
            float silverIntensity = (r + g + b) / 3.0;
            // Map 0.8-1.0 down to 0.7-0.75
            color.rgb = mix(color.rgb, color.rgb * 0.7, smoothstep(0.8, 1.0, silverIntensity));
          }
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0, 1.0,  1.0, 1.0,  0.0, 0.0,
      0.0, 0.0,  1.0, 1.0,  1.0, 0.0,
    ]), gl.STATIC_DRAW);

    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const zoomLocation = gl.getUniformLocation(program, "u_zoom");
    const flipHorizontalLocation = gl.getUniformLocation(program, "u_flipHorizontal");
    const flipVerticalLocation = gl.getUniformLocation(program, "u_flipVertical");
    const reduceSilverLineLocation = gl.getUniformLocation(program, "u_reduceSilverLine");

    if (zoomLocation !== null) gl.uniform1f(zoomLocation, zoom);
    if (flipHorizontalLocation !== null) gl.uniform1i(flipHorizontalLocation, flipHorizontal ? 1 : 0);
    if (flipVerticalLocation !== null) gl.uniform1i(flipVerticalLocation, flipVertical ? 1 : 0);
    if (reduceSilverLineLocation !== null) gl.uniform1i(reduceSilverLineLocation, reduceSilverLine ? 1 : 0);

    let isPlaying = false;

    video.addEventListener('playing', () => {
      isPlaying = true;
    });
    
    video.addEventListener('pause', () => {
      isPlaying = false;
    });

    const render = () => {
      if (isPlaying && video.readyState >= 2) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
        
        // Clear the canvas to transparent before drawing
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      requestRef.current = requestAnimationFrame(render);
    };

    video.play().catch(err => {
      console.warn("Video auto-play failed, usually due to browser policy:", err);
    });

    requestRef.current = requestAnimationFrame(render);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      // We do not destroy the video element to allow reusing it if re-rendered quickly
    };
  }, [src, zoom, flipHorizontal, flipVertical, isNearViewport, aboveTheFold, webglError]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={style}>
      {webglError ? (
        <video 
          src={src} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-contain"
        />
      ) : (
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
};
