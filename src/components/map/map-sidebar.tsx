"use client"

import { JoystickIcon } from "lucide-react";
import Link from 'next/link';
import type React from "react";

import { NavEnemies } from "@/components/nav-enemies";
import { NavEssential } from "@/components/nav-essential";
import { NavMain } from "@/components/nav-main";
import { NavTools } from "@/components/nav-tools";
import { NavWalls } from "@/components/nav-walls";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

export function MapSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="!p-1.5 group-data-[collapsible=icon]:!p-1.5" asChild>
              <Link href="/">
                <JoystickIcon className="!w-5 !h-5 text-primary dark:text-current" />
                <span className="font-semibold text-base">Carmack Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavTools />
        <NavEssential />
        <NavEnemies />
        <NavWalls />
      </SidebarContent>
    </Sidebar>
  )
}
