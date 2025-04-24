import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { SwordIcon } from "lucide-react";

export function NavEnemies() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Enemies</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <RadioGroupItem value="enemy_gladiator" asChild>
            <SidebarMenuButton tooltip="Gladiator">
              <SwordIcon />
              <span>Gladiator</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
