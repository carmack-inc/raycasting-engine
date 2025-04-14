import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BrickWallIcon } from "lucide-react";

export function NavWalls() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Walls</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Black">
            <BrickWallIcon />
            <span>Black</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Red">
            <BrickWallIcon className="text-red-600 dark:text-red-400" />
            <span>Red</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Green">
            <BrickWallIcon className="text-emerald-600 dark:text-emerald-400" />
            <span>Green</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

