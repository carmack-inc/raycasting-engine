"use client";

import { Button } from "@/components/ui/button";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";

interface MapControlsProps {
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomInClick: () => void;
  onZoomOutClick: () => void;
}

export function MapControls({ 
  canZoomIn, 
  canZoomOut, 
  onZoomInClick, 
  onZoomOutClick 
}: MapControlsProps) {
  return (
    <div className="fixed z-10 right-6 bottom-6 -space-x-px">
      <Button
        className="rounded-r-none"
        size="icon"
        variant="outline"
        aria-label="Zoom out"
        disabled={!canZoomOut}
        onClick={onZoomOutClick}
      >
        <ZoomOutIcon />
      </Button>
      <Button
        className="rounded-l-none"
        size="icon"
        variant="outline"
        aria-label="Zoom in"
        disabled={!canZoomIn}
        onClick={onZoomInClick}
      >
        <ZoomInIcon />
      </Button>
    </div>
  );
}
