import { Header } from "@/app/engine/header";
import { MapContent } from "@/components/map/map-content";
import { MapSidebar } from "@/components/map/map-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function MapBuilder() {
  return (
    <SidebarProvider>
      <MapSidebar />
      <SidebarInset className="min-w-0 [--navbar-height:theme(spacing.12)]">
        <Header />
        <MapContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
