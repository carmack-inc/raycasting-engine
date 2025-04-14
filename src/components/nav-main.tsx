"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ArrowUpRightIcon, AsteriskIcon, BoxesIcon, CogIcon, CoinsIcon, DiamondIcon, FlagIcon, HeartPulseIcon, HouseIcon, LucideIcon, PersonStandingIcon, SkullIcon, SquareIcon, SwordIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface Group {
  label?: string
  items: GroupItem[]
}

interface GroupItem {
  title: string
  value: string
  icon: LucideIcon,
  required?: boolean
}

const groups: Group[] = [
  {
    items: [
      {
        title: "Home",
        value: "home",
        icon: HouseIcon,
      },
      {
        title: "Settings",
        value: "config",
        icon: CogIcon,
      },
      {
        title: "Assets",
        value: "assets",
        icon: BoxesIcon,
      },
    ]
  },
  {
    label: "Essential",
    items: [
      {
        title: "Spawn Player",
        value: "",
        icon: DiamondIcon,
        required: true,
      },
      {
        title: "End",
        value: "end",
        icon: FlagIcon,
      },
      {
        title: "Death",
        value: "death",
        icon: SkullIcon,
      },
    ]
  },
  {
    label: "Entity",
    items: [
      {
        title: "Player",
        value: "player",
        icon: PersonStandingIcon,
        required: true,
      },
      {
        title: "Gladiator",
        value: "gladiator",
        icon: SwordIcon,
      },
      {
        title: "Archer",
        value: "archer",
        icon: ArrowUpRightIcon,
      },
    ]
  },
  {
    label: "Objects",
    items: [
      {
        title: "Life",
        value: "life",
        icon: HeartPulseIcon,
      },
      {
        title: "Arrow",
        value: "arrow",
        icon: ArrowUpRightIcon,
      },
      {
        title: "CoinsIcon",
        value: "coins",
        icon: CoinsIcon,
      },
    ]
  },
  {
    label: "Walls",
    items: [
      {
        title: "Black",
        value: "black",
        icon: SquareIcon,
      },
      {
        title: "Red",
        value: "red",
        icon: SquareIcon,
      },
      {
        title: "Green",
        value: "green",
        icon: SquareIcon,
      },
    ]
  }
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      {groups.map((group, idx) => (
        <SidebarGroup key={idx}>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="transition-[font-weight]"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
                {item.required && (
                  <SidebarMenuBadge>
                    <AsteriskIcon className="size-4 text-amber-500 dark:text-amber-400" />
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
