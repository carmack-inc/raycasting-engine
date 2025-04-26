"use client";

import { Map } from "@/components/map/map-builder";
import { MapCell } from "@/components/map/map-cell";
import { MapControls } from "@/components/map/map-controls";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface MapContentProps {
  map: Map;
  columns: number;
  zoomDisabled: boolean;
  onCellClick: (index: number) => void;
}

export function MapContent({ map, columns, zoomDisabled, onCellClick }: MapContentProps) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const d3Zoom = useRef<d3.ZoomBehavior<HTMLDivElement, unknown>>(null);
  const d3Container = useRef<d3.Selection<HTMLDivElement, unknown, null, undefined>>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) {
      return;
    }

    const container = d3.select(containerRef.current);
    const content = d3.select(contentRef.current);

    const zoom = d3.zoom<HTMLDivElement, unknown>()
      .scaleExtent([0.5, 2])
      .on("zoom", ({ transform }) => {
        const style = `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`;
        setZoom(transform.k);

        content
          .style("transform", style)
          .style("transform-origin", "0 0");
      });

    container
      .call(zoom)
      .on("dblclick.zoom", null);

    d3Zoom.current = zoom;
    d3Container.current = container;

    // const initialTransform = computeInitialTransform(containerRef.current, contentRef.current);
    // container.call(zoom.transform, initialTransform);
    // setZoom(initialTransform.k);
  }, []);

  useEffect(() => {
    d3Zoom.current?.filter(() => !zoomDisabled);
  }, [zoomDisabled]);

  function handleZoomIn() {
    if (!d3Zoom.current || !d3Container.current) {
      return;
    }

    d3Container.current.transition()
      .call(d3Zoom.current.scaleBy, 2);
  }

  function handleZoomOut() {
    if (!d3Zoom.current || !d3Container.current) {
      return;
    }

    d3Container.current.transition()
      .call(d3Zoom.current.scaleBy, 0.5);
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100svh-var(--navbar-height)-theme(spacing.4))] overflow-hidden relative flex items-center justify-center"
    >
      <div ref={contentRef} className="p-4 w-fit">
        <div
          className="grid grid-cols-[repeat(var(--columns),theme(spacing.10))] border border-input"
          style={{ "--columns": columns } as React.CSSProperties}
        >
          {map.map((value, idx) => (
            <MapCell
              key={idx}
              className={!zoomDisabled ? "pointer-events-none" : ""}
              id={idx}
              value={value}
              onClick={() => onCellClick(idx)}
            />
          ))}
        </div>
      </div>

      <MapControls
        canZoomIn={zoom < 2}
        canZoomOut={zoom > 0.5}
        onZoomInClick={handleZoomIn}
        onZoomOutClick={handleZoomOut}
      />
    </div>
  )
}

