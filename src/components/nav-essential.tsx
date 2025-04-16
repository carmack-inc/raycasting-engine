import { RequiredBadge } from "@/components/required-badge";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DiamondIcon, FlagIcon, SkullIcon } from "lucide-react";

export function NavEssential() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Essential</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Spawn player">
            <DiamondIcon />
            <span>Spawn player</span>
          </SidebarMenuButton>
          <RequiredBadge />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="End">
            <FlagIcon />
            <span>End</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Death">
            <SkullIcon />
            <span>Death</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

