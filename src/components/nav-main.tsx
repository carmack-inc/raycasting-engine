"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { FilesIcon, LandPlotIcon } from "lucide-react"
import { usePathname } from 'next/navigation'

const items = [
  {
    title: "Map",
    value: "map",
    icon: LandPlotIcon,
  },
  {
    title: "Assets",
    value: "assets",
    icon: FilesIcon,
  },
]

export function NavMain() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        <TabsList>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <TabsTrigger value={item.value} asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="transition-[font-weight]"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </TabsTrigger>
            </SidebarMenuItem>
          ))}
        </TabsList>
      </SidebarMenu>
    </SidebarGroup>
  )
}
