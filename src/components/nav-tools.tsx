import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { EraserIcon, MousePointerIcon } from "lucide-react";

export function NavTools() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tools</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <RadioGroupItem value="pointer" asChild>
            <SidebarMenuButton tooltip="Pointer">
              <MousePointerIcon />
              <span>Pointer</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="eraser" asChild>
            <SidebarMenuButton tooltip="Eraser">
              <EraserIcon />
              <span>Eraser</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

