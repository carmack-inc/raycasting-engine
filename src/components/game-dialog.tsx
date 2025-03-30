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

export function GameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8">
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
