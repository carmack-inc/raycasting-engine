import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowUpRightIcon, BrickWallIcon, CoinsIcon, DiamondIcon, FlagIcon, HeartPulseIcon, PersonStandingIcon, SkullIcon, SwordIcon } from "lucide-react";

interface CellGroup {
  label: string
  items: CellItem[]
}

interface CellItem {
  label: string
  icon: any,
  class?: string
}

const essencial: CellItem[] = [
  { label: "Spawn Player", icon: DiamondIcon },
  { label: "Start", icon: FlagIcon },
  { label: "End", icon: SkullIcon },
];

const assets: CellGroup[] = [
  {
    label: "Entity",
    items: [
      { label: "Player", icon: PersonStandingIcon },
      { label: "Gladiator", icon: SwordIcon },
      { label: "Archer", icon: ArrowUpRightIcon },
    ],
  },
  {
    label: "Objects",
    items: [
      { label: "Life", icon: HeartPulseIcon },
      { label: "Arrow", icon: ArrowUpRightIcon },
      { label: "Coins", icon: CoinsIcon },
    ],
  },
  {
    label: "Walls",
    items: [
      { label: "Black", icon: BrickWallIcon },
      { label: "Red", icon: BrickWallIcon, class: "text-red-600 dark:text-red-400" },
      { label: "Green", icon: BrickWallIcon, class: "text-emerald-600 dark:text-emerald-400" },
    ],
  },
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
          <div className="grid grid-cols-3 gap-4 pt-3">
          {essencial.map((item, index) => {
            const Icon = item.icon;
            return (
            <Button key={item.label + index} variant="secondary">
              <Icon className="mr-2" />
              {item.label}
            </Button>
            );
          })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
        {assets.map((group, index) => (
          <div key={group.label + index}>
            {group.label}
            <div className="flex flex-col gap-2 pt-3">
              {group.items.map((item, index) => {
                const Icon = item.icon;
                return (
                <Button key={item.label + index} variant="secondary" className="">
                  <Icon className={item.class + " mr-2"} />
                  {item.label}
                </Button>
                ); 
              })}
            </div>
          </div>
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
