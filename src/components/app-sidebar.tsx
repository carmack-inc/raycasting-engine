"use client"

import {
  CrownIcon,
  FilesIcon,
  GhostIcon,
  HomeIcon,
  JoystickIcon,
  LandPlotIcon,
  SwordsIcon
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "John Carmack",
    email: "j.carmack@carmack.labs",
    avatar: "/avatars/carmack.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Map",
      url: "/map",
      icon: LandPlotIcon,
    },
    {
      title: "Assets",
      url: "/assets",
      icon: FilesIcon,
    },
  ],
  projects: [
    {
      name: "Crown game",
      url: "#",
      icon: CrownIcon,
    },
    {
      name: "Ghost game",
      url: "#",
      icon: GhostIcon,
    },
    {
      name: "Sword game",
      url: "#",
      icon: SwordsIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-fit px-1.5 group-data-[state=collapsed]:!px-1.5">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <JoystickIcon className="size-3" />
              </div>
              <span className="truncate font-semibold">
                Carmack Inc.
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
