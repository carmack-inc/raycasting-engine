import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider"


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

        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-3">
          <span>Sensibilidade</span>
          <Slider defaultValue={[1]} max={5} step={0.01} />
          </div>
          <div className="grid gap-3">
          <span>Campo de visão</span>
          <Slider defaultValue={[80]} max={110} step={1} />
          </div>
          <div className="grid gap-3">
          <span>Tamanho do minimapa</span>
          <Slider defaultValue={[50]} max={200} step={1} />
          </div>
          <div className="grid gap-3">
          <span>Zoom do minimapa</span>
          <Slider defaultValue={[1]} max={3} step={0.5} />
          </div>
        </div>

        <span>Atalhos (clique para editar)</span>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-850 px-4 py-3">
            <div className="flex items-center justify-between">
              <span>Andar para frente</span>
              <Button variant="secondary">A</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Andar para trás</span>
              <Button variant="secondary">S</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Andar para esquerda</span>
              <Button variant="secondary">A</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Andar para direita</span>
              <Button variant="secondary">D</Button>
            </div>
          </div>
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
