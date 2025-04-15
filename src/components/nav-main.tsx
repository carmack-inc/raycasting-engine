"use client";

import { BoxesIcon, HouseIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";

import { SettingsDialog } from "@/components/settings-dialog";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

export function NavMain() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Home">
              <HouseIcon />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              onClick={() => setSettingsOpen(true)}
            >
              <SettingsIcon />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Assets">
              <BoxesIcon />
              <span>Assets</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
