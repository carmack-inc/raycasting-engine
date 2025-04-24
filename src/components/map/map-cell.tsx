"use client";

import type { CellValue } from "@/components/map/map-builder";
import { BrickWallIcon, DiamondIcon, FlagIcon, LucideIcon, LucideProps, PersonStandingIcon, SkullIcon, SwordIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MapCellProps {
  id: number;
  value: CellValue | undefined;
  onClick: () => void;
}

function InnerMapCell({ value, onClick }: MapCellProps) {
  return (
    <Button
      className="size-[--cell-size] rounded-none px-0 focus-visible:ring-0 cursor-default"
      variant="outline"
      size="icon"
      onClick={onClick}
    >
      <ItemIcon value={value} />
    </Button>
  );
}

export const MapCell = memo(InnerMapCell)

const icons: Record<CellValue, { icon: LucideIcon, class?: string }> = {
  "end": { icon: FlagIcon },
  "player": { icon: PersonStandingIcon },
  "death": { icon: SkullIcon },
  "enemy_gladiator": { icon: SwordIcon },
  "wall_blue": { icon: BrickWallIcon, class: "text-blue-600 dark:text-blue-400" },
  "wall_red": { icon: BrickWallIcon, class: "text-red-600 dark:text-red-400" },
  "wall_green": { icon: BrickWallIcon, class: "text-emerald-600 dark:text-emerald-400" },
  "wall_cyan": { icon: BrickWallIcon, class: "text-cyan-600 dark:text-cyan-400" },
  "wall_magenta": { icon: BrickWallIcon, class: "text-fuchsia-600 dark:text-fuchsia-400" },
  "wall_yellow": { icon: BrickWallIcon, class: "text-yellow-600 dark:text-yellow-400" },
}

type ItemIconProps = LucideProps & { value: CellValue | undefined }

function ItemIcon({ value, className, ...props }: ItemIconProps) {
  const icon = value ? icons[value] : null

  return icon ? <icon.icon className={cn(className, icon.class)} {...props} /> : null
}
