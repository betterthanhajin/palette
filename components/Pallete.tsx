"use client";
import React, { useRef, useEffect, useState } from "react";

const Palette = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
      }
    }
  }, [color]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext("2d");
      const rect = (canvas as HTMLCanvasElement).getBoundingClientRect();
      setIsDrawing(true);
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext("2d");
      const rect = (canvas as HTMLCanvasElement).getBoundingClientRect();
      if (ctx) {
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          0,
          0,
          (canvas as HTMLCanvasElement).width,
          (canvas as HTMLCanvasElement).height
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-12"
        />
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-32"
        />
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={(e: React.MouseEvent<HTMLCanvasElement>) =>
          startDrawing(e)
        }
        onMouseMove={(e: React.MouseEvent<HTMLCanvasElement>) => draw(e)}
        onMouseUp={(e: React.MouseEvent<HTMLCanvasElement>) => stopDrawing(e)}
        onMouseOut={(e: React.MouseEvent<HTMLCanvasElement>) => stopDrawing(e)}
        className="border border-gray-300 rounded cursor-crosshair"
      />
    </div>
  );
};

export default Palette;
