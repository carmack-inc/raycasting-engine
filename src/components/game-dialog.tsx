"use client";

import { PlayIcon } from "lucide-react"
import { Game } from "./game"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"

interface GameDialogProps {
  disabled?: boolean
}

export function GameDialog({ disabled }: GameDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8" disabled={disabled}>
          <PlayIcon className="size-4" />
          <span>Play</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>Raycasting Game</DialogTitle>
        </DialogHeader>
        <Game />
      </DialogContent>
    </Dialog>
  );
}
