"use client";

import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { ArrowUpRightIcon, BrickWallIcon, CoinsIcon, DiamondIcon, FlagIcon, HeartPulseIcon, LucideIcon, LucideProps, PersonStandingIcon, SkullIcon, SwordIcon } from "lucide-react";
import { memo } from "react";

export type CellValue = CellEssential | CellEntity | CellObject | CellWall
export type CellEssential = "spawn-player" | "end" | "death"
export type CellEntity = "entity-player" | "entity-gladiator" | "entity-archer"
export type CellObject = "object-life" | "object-arrow" | "object-coins"
export type CellWall = "wall-black" | "wall-red" | "wall-green"

interface CellGroup {
  label: string
  items: CellItem[]
}

interface CellItem {
  label: string
  value: CellValue,
  class?: string
}

const groups: CellGroup[] = [
  {
    label: "Essential",
    items: [
      { label: "Spawn Player", value: "spawn-player" },
      { label: "End", value: "end" },
      { label: "Death", value: "death" },
    ],
  },
  {
    label: "Entity",
    items: [
      { label: "Player", value: "entity-player" },
      { label: "Gladiator", value: "entity-gladiator" },
      { label: "Archer", value: "entity-archer" },
    ],
  },
  {
    label: "Objects",
    items: [
      { label: "Life", value: "object-life" },
      { label: "Arrow", value: "object-arrow" },
      { label: "Coins", value: "object-coins" },
    ]
  },
  {
    label: "Walls",
    items: [
      { label: "Black", value: "wall-black" },
      { label: "Red", value: "wall-red", class: "text-red-600 dark:text-red-400" },
      { label: "Green", value: "wall-green", class: "text-emerald-600 dark:text-emerald-400" },
    ]
  }
];

interface MapCellProps {
  id: number
  value: CellValue | undefined
  onValueChange: (value: CellValue | undefined, id: number) => void
}

function InnerMapCell({ value, id, onValueChange }: MapCellProps) {
  function handleValueChange(value: string) {
    onValueChange(value as CellValue, id)
  }

  return (
    <Select
      defaultValue={value}
      onValueChange={handleValueChange}
    >
      <SelectTrigger asChild>
        <Button
          className="size-[--cell-size] rounded-none px-0 focus-visible:ring-0 aria-expanded:ring aria-expanded:ring-ring aria-expanded:ring-offset-2 aria-expanded:ring-offset-background aria-expanded:z-10"
          variant="outline"
          size="icon"
        >
          <SelectValue aria-label={value}>
            <ItemIcon value={value} />
          </SelectValue>
        </Button>
      </SelectTrigger>
      <SelectContent className="w-56">
        {groups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel className="pl-2">{group.label}</SelectLabel>

            {group.items.map((item) => (
              <SelectItem
                className="pl-2 pr-8 [&_[data-slot=select-indicator]]:left-[unset] [&_[data-slot=select-indicator]]:right-2"
                value={item.value}
                key={item.value}
              >
                <div className="flex items-center gap-x-2">
                  <ItemIcon value={item.value} className={`size-4 ${item.class ?? ""}`} />
                  <span>{item.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

export const MapCell = memo(InnerMapCell)

const icons: Record<CellValue, LucideIcon> = {
  "end": FlagIcon,
  "spawn-player": DiamondIcon,
  "death": SkullIcon,
  "entity-player": PersonStandingIcon,
  "entity-gladiator": SwordIcon,
  "entity-archer": ArrowUpRightIcon,
  "object-life": HeartPulseIcon,
  "object-arrow": ArrowUpRightIcon,
  "object-coins": CoinsIcon,
  "wall-black": BrickWallIcon,
  "wall-red": BrickWallIcon,
  "wall-green": BrickWallIcon
}

type ItemIconProps = LucideProps & { value: CellValue | undefined }

function ItemIcon({ value, ...props }: ItemIconProps) {
  const Icon = value ? icons[value] : null

  return Icon ? <Icon {...props} /> : null
}
