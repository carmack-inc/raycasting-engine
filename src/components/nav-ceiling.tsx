import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SquareSquareIcon } from "lucide-react";

export function NavCeiling() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Ceilings</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Red">
            <SquareSquareIcon className="text-magenta-600 dark:text-red-400"/>
            <span>Red</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Cyan">
            <SquareSquareIcon className="text-cyan-600 dark:text-cyan-400" />
            <span>Cyan</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

