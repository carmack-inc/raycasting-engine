import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ArrowUpRightIcon, CoinsIcon, HeartPulseIcon } from "lucide-react";

export function NavObjects() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Essential</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Life">
            <HeartPulseIcon />
            <span>Life</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Arrow">
            <ArrowUpRightIcon />
            <span>Arrow</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Coins">
            <CoinsIcon />
            <span>Coins</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

