import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SwordIcon } from "lucide-react";

export function NavEnemies() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Enemies</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Gladiator">
            <SwordIcon />
            <span>Gladiator</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
