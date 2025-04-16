import { RequiredBadge } from "@/components/required-badge";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ArrowUpRightIcon, PersonStandingIcon, SwordIcon } from "lucide-react";

export function NavEntity() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Entity</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Player">
            <PersonStandingIcon />
            <span>Player</span>
          </SidebarMenuButton>
          <RequiredBadge />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Gladiator">
            <SwordIcon />
            <span>Gladiator</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Archer">
            <ArrowUpRightIcon />
            <span>Archer</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
