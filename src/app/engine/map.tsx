"use client";

import { Button } from "@/components/ui/button";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useState } from "react";

const COLUMNS = 70;
const ROWS = 70;

export function MapContent() {
  const [zoom, setZoom] = useState(7);

  return (
    <div className="w-full h-[calc(100svh-var(--navbar-height)-theme(spacing.4))] overflow-auto relative">
      <div className="p-4 pb-20 w-fit">
        <div
          className="grid grid-cols-[repeat(var(--columns),var(--cell-size))] [--cell-size:calc(var(--zoom)*theme(spacing.1))] border border-input"
          style={{ 
            "--columns": COLUMNS,
            "--zoom": zoom,
          } as React.CSSProperties}
        >
          {Array.from({ length: COLUMNS * ROWS }).map((_, cell) => (
            <MapCell key={cell} />
          ))}
        </div>
      </div>

      <div className="fixed z-10 right-6 bottom-6 -space-x-px">
        <Button
          className="rounded-r-none"
          size="icon"
          variant="outline"
          aria-label="Zoom out"
          disabled={zoom === 4}
          onClick={() => setZoom((zoom) => Math.max(zoom - 1, 4))}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          className="rounded-l-none"
          size="icon"
          variant="outline"
          aria-label="Zoom in"
          disabled={zoom === 10}
          onClick={() => setZoom((zoom) => Math.min(zoom + 1, 10))}
        >
          <ZoomInIcon />
        </Button>
      </div>
    </div>
  )
}

function MapCell() {
  return (
    <Button
      className="size-[--cell-size] rounded-none px-0"
      variant="outline"
      size="icon"
    >

    </Button>
  )
}
