import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { EraserIcon, HandIcon, RotateCwIcon } from "lucide-react";

export function NavTools() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tools</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <RadioGroupItem value="hand" asChild>
            <SidebarMenuButton tooltip="Hand">
              <HandIcon />
              <span>Hand</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="pivot" asChild>
            <SidebarMenuButton tooltip="Pivot">
              <RotateCwIcon />
              <span>Pivot</span>
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

