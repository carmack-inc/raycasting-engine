import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { TableRowsSplitIcon } from "lucide-react";

export function NavFloor() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Floors</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Blue">
            <TableRowsSplitIcon className="text-blue-600 dark:text-blue-400"/>
            <span>Blue</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Yellow">
            <TableRowsSplitIcon className="text-yellow-600 dark:text-yellow-400" />
            <span>Yellow</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

