import { RequiredBadge } from "@/components/required-badge";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { FlagIcon, PersonStandingIcon, SkullIcon } from "lucide-react";

export function NavEssential() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Essential</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <RadioGroupItem value="player" asChild>
            <SidebarMenuButton tooltip="Player">
              <PersonStandingIcon />
              <span>Player</span>
            </SidebarMenuButton>
          </RadioGroupItem>
          <RequiredBadge />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="end" asChild>
            <SidebarMenuButton tooltip="End">
              <FlagIcon />
              <span>End</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <RadioGroupItem value="death" asChild>
            <SidebarMenuButton tooltip="Death">
              <SkullIcon />
              <span>Death</span>
            </SidebarMenuButton>
          </RadioGroupItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

