import React, { useEffect, useRef, useState } from 'react';

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  removeSilverCap?: boolean;
  zoom?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
}

export const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({
  src,
  className,
  style,
  removeSilverCap = false,
  zoom = 1.48,
  flipHorizontal = false,
  flipVertical = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true }) || 
             canvas.getContext('experimental-webgl', { premultipliedAlpha: false, alpha: true }) as WebGLRenderingContext;
    if (!gl) return;

    let animationFrameId: number;

    const handleLoadedMetadata = () => {
      canvas.width = video.videoWidth || 1080;
      canvas.height = video.videoHeight || 1080;
      setIsLoaded(true);
      video.play().catch(e => console.warn(e));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
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
      precision highp float;
      varying vec2 v_texCoord;
      uniform sampler2D u_image;
      uniform bool u_removeSilverCap;
      uniform float u_zoom;
      uniform bool u_flipHorizontal;
      uniform bool u_flipVertical;
      
      void main() {
        vec2 uv = v_texCoord;
        
        if (u_flipHorizontal) {
          uv.x = 1.0 - uv.x;
        }
        if (u_flipVertical) {
          uv.y = 1.0 - uv.y;
        }
        
        // Zooming from center
        uv = uv - 0.5;
        uv = uv / u_zoom;
        uv = uv + 0.5;
        
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
           gl_FragColor = vec4(0.0);
           return;
        }

        vec4 color = texture2D(u_image, uv);
        
        float maxVal = max(color.r, max(color.g, color.b));
        float alpha = color.a; // Use native alpha if present
        
        if (maxVal < 0.07) {
          alpha = min(alpha, 0.0);
        } else if (maxVal < 0.176) {
          alpha = min(alpha, (maxVal - 0.07) / (0.176 - 0.07));
        }
        
        if (u_removeSilverCap) {
          if (uv.y > 0.05 && uv.y < 0.46 && uv.x > 0.40 && uv.x < 0.60) {
            bool isSilver = color.r > 0.35 && color.g > 0.39 && color.b > 0.39 &&
                            abs(color.r - color.g) < 0.1 &&
                            abs(color.g - color.b) < 0.1 &&
                            abs(color.r - color.b) < 0.1;
            if (isSilver) {
              color = texture2D(u_image, vec2(0.35, uv.y));
            }
          }
        }
        
        // Output premultiplied color
        gl_FragColor = vec4(color.rgb * alpha, alpha);
      }
    `;

    const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
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

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
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
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
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

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const removeSilverCapLocation = gl.getUniformLocation(program, "u_removeSilverCap");
    const zoomLocation = gl.getUniformLocation(program, "u_zoom");
    const flipHorizontalLocation = gl.getUniformLocation(program, "u_flipHorizontal");
    const flipVerticalLocation = gl.getUniformLocation(program, "u_flipVertical");
    
    gl.uniform1i(removeSilverCapLocation, removeSilverCap ? 1 : 0);
    gl.uniform1f(zoomLocation, zoom);
    gl.uniform1i(flipHorizontalLocation, flipHorizontal ? 1 : 0);
    gl.uniform1i(flipVerticalLocation, flipVertical ? 1 : 0);

    const render = () => {
      if (video.readyState >= 2 && gl) {
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
    video.play().catch(e => console.warn(e));
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('play', render);
      }
      if (gl) {
         gl.deleteProgram(program);
         gl.deleteShader(vertexShader);
         gl.deleteShader(fragmentShader);
         gl.deleteTexture(texture);
         gl.deleteBuffer(positionBuffer);
         gl.deleteBuffer(texCoordBuffer);
      }
    };
  }, [src, removeSilverCap, zoom, flipHorizontal, flipVertical]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={style}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        autoPlay
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.04)]"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};
