import { Button } from "@/components/ui/button";
import { RequiredBadge } from "@/components/required-badge";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowUpRightIcon, BrickWallIcon, CoinsIcon, DiamondIcon, FlagIcon, HeartPulseIcon, PersonStandingIcon, SkullIcon, SwordIcon } from "lucide-react";
import { Item } from "@radix-ui/react-context-menu";

interface CellGroup {
  label: string
  items: CellItem[]
}

interface CellItem {
  label: string
  icon: string,
  class?: string
}

const groups: CellGroup[] = [
  {
    label: "Entity",
    items: [
      { label: "Player", icon: "PersonStandingIcon" },
      { label: "Gladiator", icon: "SwordIcon" },
      { label: "Archer", icon: "ArrowUpRightIcon" },
    ],
  },
  {
    label: "Objects",
    items: [
      { label: "Life", icon: "HeartPulseIcon" },
      { label: "Arrow", icon: "ArrowUpRightIcon" },
      { label: "Coins", icon: "CoinsIcon" },
    ]
  },
  {
    label: "Walls",
    items: [
      { label: "Black", icon: "BrickWallIcon" },
      { label: "Red", icon: "BrickWallIcon", class: "text-red-600 dark:text-red-400" },
      { label: "Green", icon: "BrickWallIcon", class: "text-emerald-600 dark:text-emerald-400" },
    ]
  }
];

export function AssetsDialog({ ...props }: React.ComponentProps<typeof Dialog>) {
  return (
    <Dialog {...props}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage Assets here.
          </DialogDescription>
        </DialogHeader>
        

        <div> Essencials
          <div className="grid grid-cols-3 gap-4">
            
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
        {groups.map((group) => (
              <SidebarGroup>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  {group.items.map((item) => (
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          {item.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>

                  ))}
              </SidebarGroup>
            ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
