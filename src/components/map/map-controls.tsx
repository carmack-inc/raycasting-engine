"use client";

import { Button } from "@/components/ui/button";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";

interface MapControlsProps {
  zoom: number
  onZoomChange: (zoom: number) => void
}

export function MapControls({ zoom, onZoomChange }: MapControlsProps) {
  function handleZoomOut() {
    onZoomChange(Math.max(zoom - 1, 4))
  }

  function handleZoomIn() {
    onZoomChange(Math.min(zoom + 1, 10))
  }

  return (
    <div className="fixed z-10 right-6 bottom-6 -space-x-px">
      <Button
        className="rounded-r-none"
        size="icon"
        variant="outline"
        aria-label="Zoom out"
        disabled={zoom === 4}
        onClick={handleZoomOut}
      >
        <ZoomOutIcon />
      </Button>
      <Button
        className="rounded-l-none"
        size="icon"
        variant="outline"
        aria-label="Zoom in"
        disabled={zoom === 10}
        onClick={handleZoomIn}
      >
        <ZoomInIcon />
      </Button>
    </div>
  );
}
