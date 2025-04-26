import { GameProps } from "@/components/game";
import { GameDialog } from "@/components/game-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

type HeaderProps = GameProps & {
  gameDisabled?: boolean
}

export function Header({ gameDisabled, ...gameProps }: HeaderProps) {
  return (
    <header className="flex h-[--navbar-height] shrink-0 items-center gap-2 transition-[width] ease-linear border-b">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-x-2">
          <ModeToggle />
          <GameDialog disabled={gameDisabled} {...gameProps} />
        </div>
      </div>
    </header>
  );
}
