"use client";

import { PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Game } from "./game";

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
