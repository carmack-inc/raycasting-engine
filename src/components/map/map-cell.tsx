"use client";

import { isPlayerCell, type CellValue, type SpawnPlayer } from "@/components/map/map-builder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrickWallIcon, CircleIcon, FlagIcon, LucideIcon, LucideProps, PersonStandingIcon, SkullIcon, SquareIcon } from "lucide-react";
import { memo } from "react";

type MapCellProps = {
  id: number;
  value: CellValue | undefined;
  className?: string
  onClick: () => void;
}

const playerPosMapping: Record<SpawnPlayer, string> = {
  player_l: "top-1/2 -translate-y-1/2 left-0.5",
  player_tl: "top-0.5 left-0.5",
  player_t: "top-0.5 left-1/2 -translate-x-1/2",
  player_tr: "top-0.5 right-0.5",
  player_r: "right-0.5 top-1/2 -translate-y-1/2",
  player_br: "right-0.5 bottom-0.5",
  player_b: "bottom-0.5 left-1/2 -translate-x-1/2",
  player_bl: "bottom-0.5 left-0.5"
}

function InnerMapCell({ value, className, onClick }: MapCellProps) {
  return (
    <Button
      className={cn("rounded-none px-0 focus-visible:ring-0 cursor-default relative", className)}
      variant="outline"
      size="icon"
      onClick={onClick}
    >
      <ItemIcon value={value} />

      {isPlayerCell(value) && (
        <CircleIcon className={cn("absolute !size-1 fill-current", playerPosMapping[value])} />
      )}
    </Button>
  );
}

export const MapCell = memo(InnerMapCell)

const icons: Record<CellValue, { icon: LucideIcon, class?: string }> = {
  "end": { icon: FlagIcon },
  "player_t": { icon: PersonStandingIcon },
  "player_tr": { icon: PersonStandingIcon },
  "player_tl": { icon: PersonStandingIcon },
  "player_l": { icon: PersonStandingIcon },
  "player_r": { icon: PersonStandingIcon },
  "player_b": { icon: PersonStandingIcon },
  "player_br": { icon: PersonStandingIcon },
  "player_bl": { icon: PersonStandingIcon },
  "death": { icon: SkullIcon },
  "enemy_square": { icon: SquareIcon },
  "enemy_circle": { icon: CircleIcon },
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
