"use client"

import { JoystickIcon } from "lucide-react";
import Link from 'next/link';
import type React from "react";

import { NavEntity } from "@/components/nav-entity";
import { NavEssential } from "@/components/nav-essential";
import { NavMain } from "@/components/nav-main";
import { NavObjects } from "@/components/nav-objects";
import { NavWalls } from "@/components/nav-walls";
import { NavFloor } from "@/components/nav-floor";
import { NavCeiling } from "@/components/nav-ceiling";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavEssential />
        <NavEntity />
        <NavObjects />
        <NavWalls />
        <NavFloor />
        <NavCeiling />
      </SidebarContent>
    </Sidebar>
  )
}
