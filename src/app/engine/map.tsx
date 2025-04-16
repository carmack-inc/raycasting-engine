"use client";

import { CellValue, MapCell } from "@/components/map/map-cell";
import { MapControls } from "@/components/map/map-controls";
import { useCallback, useState } from "react";

const COLUMNS = 25;
const ROWS = 25;

function createInitialMap() {
  return Array.from<CellValue | undefined>({ length: ROWS * COLUMNS })
}

export function MapContent() {
  const [zoom, setZoom] = useState(7);
  const [map, setMap] = useState(createInitialMap)

  const handleCellChange = useCallback((value: CellValue | undefined, index: number) => {
    setMap((map) => map.with(index, value))
  }, [])

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
          {map.map((value, idx) => (
            <MapCell
              key={idx}
              id={idx}
              value={value}
              onValueChange={handleCellChange}
            />
          ))}
        </div>
      </div>

      <MapControls zoom={zoom} onZoomChange={setZoom} />
    </div>
  )
}

