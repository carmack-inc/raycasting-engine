import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function SettingsDialog({ ...props }: React.ComponentProps<typeof Dialog>) {
  return (
    <Dialog {...props}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Change the game settings here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 min-h-96">
          <div>First column</div>
          <div>Second column</div>
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
