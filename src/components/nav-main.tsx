"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { House, Cog, Boxes, Diamond, Flag, Skull, PersonStanding, Sword, ArrowUpRight, HeartPulse, Coins, Square, LandPlot} from "lucide-react"
import { usePathname } from 'next/navigation'

const items = [
  {
    title: "Home",
    value: "Home",
    icon: House,
  },
  {
    title: "Configurações",
    value: "config",
    icon: Cog,
  },
  {
    title: "Assets",
    value: "assets",
    icon: Boxes,
  },
  {
    title: "Essencial",
    value: "Essencial",
  },
  {
    title: "Spawn Player*",
    value: "",
    icon: Diamond,
  },
  {
    title: "Map",
    value: "map",
    icon: LandPlot,
  },
  {
    title: "Fim",
    value: "fim",
    icon: Flag,
  },
  {
    title: "Morte",
    value: "morte",
    icon: Skull,
  },
  {
    title: "Entidades",
    value: "entidades",
  },
  {
    title: "Player*",
    value: "player",
    icon: PersonStanding,
  },
  {
    title: "Gladiador",
    value: "gladiador",
    icon: Sword,
  },
  {
    title: "Arqueiro",
    value: "arqueiro",
    icon: ArrowUpRight,
  },
  {
    title: "Objetos",
    value: "objetos",
  },
  {
    title: "Vida",
    value: "vida",
    icon: HeartPulse,
  },
  {
    title: "Flecha",
    value: "flecha",
    icon: ArrowUpRight,
  },
  {
    title: "Moedas",
    value: "moedas",
    icon: Coins,
  },
  {
    title: "Paredes",
    value: "paredes",
  },
  {
    title: "Preto",
    value: "preto",
    icon: Square,
  },
  {
    title: "Vermelho",
    value: "vermelho",
    icon: Square,
  },
  {
    title: "Verde",
    value: "verde",
    icon: Square,
  }
  
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
