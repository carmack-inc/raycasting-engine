import { Header } from "@/app/engine/header";
import { AppSidebar } from "@/components/app-sidebar";
import { MapContent } from "@/components/map/map-content";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function MapBuilder() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 [--navbar-height:theme(spacing.12)]">
        <Header />
        <MapContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
