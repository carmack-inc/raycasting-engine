"use client";

import { CellValue, Map } from "@/components/map/map-builder";
import { MapCell } from "@/components/map/map-cell";
import { MapControls } from "@/components/map/map-controls";
import { useState } from "react";

interface MapContentProps {
  map: Map;
  columns: number;
  onCellClick: (index: number) => void;
}

export function MapContent({ map, columns, onCellClick }: MapContentProps) {
  const [zoom, setZoom] = useState(7);

  return (
    <div className="w-full h-[calc(100svh-var(--navbar-height)-theme(spacing.4))] overflow-auto relative">
      <div className="p-4 pb-20 w-fit">
        <div
          className="grid grid-cols-[repeat(var(--columns),var(--cell-size))] [--cell-size:calc(var(--zoom)*theme(spacing.1))] border border-input"
          style={{ 
            "--columns": columns,
            "--zoom": zoom,
          } as React.CSSProperties}
        >
          {map.map((value, idx) => (
            <MapCell
              key={idx}
              id={idx}
              value={value}
              onClick={() => onCellClick(idx)}
            />
          ))}
        </div>
      </div>

      <MapControls zoom={zoom} onZoomChange={setZoom} />
    </div>
  )
}

