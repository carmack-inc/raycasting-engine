"use client";

import { start } from "@/lib/engine/main";
import { useEffect, useRef } from "react";

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    // const ctx = canvas.getContext("2d");
    // if (ctx == null) return;

    // ctx.fillStyle = "rgb(255 255 255)";
    // ctx.fillRect(0, 0, 800, 600);

    start(canvas);
  }, []);
  return <canvas className="bg-black rounded-md" width={640} height={480} ref={canvasRef} />;
}
