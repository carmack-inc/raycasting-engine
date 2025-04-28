import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { CircleIcon, SquareIcon } from "lucide-react";

export function NavEnemies() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Enemies</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <RadioGroupItem value="enemy_square" asChild>
            <SidebarMenuButton tooltip="Square">
              <SquareIcon />
              <span>Square</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="enemy_circle" asChild>
            <SidebarMenuButton tooltip="Circle">
              <CircleIcon />
              <span>Circle</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
