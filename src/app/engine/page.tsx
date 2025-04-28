import { MapBuilder } from "@/components/map/map-builder";
import { Suspense } from "react";

export default function Engine() {
  return (
    <Suspense>
      <MapBuilder />
    </Suspense>
  );
}
