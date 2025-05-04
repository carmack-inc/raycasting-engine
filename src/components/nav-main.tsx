"use client";

import { HouseIcon, SettingsIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";

interface NavMainProps {
  onSettingsClick: () => void;
}

export function NavMain({ onSettingsClick }: NavMainProps) {
  // const [assetsOpen, setAssetsOpen] = useState(false)

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Home" asChild>
              <Link href="/">
                <HouseIcon />
                <span>Home</span>
              </Link>
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

          {/* <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="Assets"
              onClick={()=> setAssetsOpen(true)}
            >
              <BoxesIcon />
              <span>Assets</span>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarGroup>

      {/* <AssetsDialog open={assetsOpen} onOpenChange={setAssetsOpen} /> */}
    </>
  )
}
