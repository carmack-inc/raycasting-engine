import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { BrickWallIcon } from "lucide-react";

export function NavWalls() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Walls</SidebarGroupLabel>

      <SidebarMenu>
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

        <SidebarMenuItem>
          <RadioGroupItem value="wall_blue" asChild>
            <SidebarMenuButton tooltip="Blue">
              <BrickWallIcon className="text-blue-600 dark:text-blue-400" />
              <span>Blue</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="wall_cyan" asChild>
            <SidebarMenuButton tooltip="Cyan">
              <BrickWallIcon className="text-cyan-600 dark:text-cyan-400" />
              <span>Cyan</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="wall_magenta" asChild>
            <SidebarMenuButton tooltip="Magenta">
              <BrickWallIcon className="text-fuchsia-600 dark:text-fuchsia-400" />
              <span>Magenta</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="wall_yellow" asChild>
            <SidebarMenuButton tooltip="Yellow">
              <BrickWallIcon className="text-yellow-600 dark:text-yellow-400" />
              <span>Yellow</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

