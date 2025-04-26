"use client";

import { BoxesIcon, HouseIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";

import { SettingsDialog } from "@/components/settings-dialog";
import { AssetsDialog } from "@/components/assets-dialog";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

interface NavMainProps {
  onSettingsClick: () => void;
}

export function NavMain({ onSettingsClick }: NavMainProps) {
  const [assetsOpen, setAssetsOpen] = useState(false)

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
              onClick={onSettingsClick}
            >
              <SettingsIcon />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="Assets"
              onClick={()=> setAssetsOpen(true)}
            >
              <BoxesIcon />
              <span>Assets</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <AssetsDialog open={assetsOpen} onOpenChange={setAssetsOpen} />
    </>
  )
}
