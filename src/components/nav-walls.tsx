import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { BrickWallIcon } from "lucide-react";

export function NavWalls() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Walls</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <RadioGroupItem value="wall_blue" asChild>
            <SidebarMenuButton tooltip="Blue">
              <BrickWallIcon className="text-blue-600 dark:text-blue-400" />
              <span>Blue</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="wall_red" asChild>
            <SidebarMenuButton tooltip="Red">
              <BrickWallIcon className="text-red-600 dark:text-red-400" />
              <span>Red</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="wall_green" asChild>
            <SidebarMenuButton tooltip="Green">
              <BrickWallIcon className="text-emerald-600 dark:text-emerald-400" />
              <span>Green</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

