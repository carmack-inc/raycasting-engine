import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  sensitivity: z.number().min(1).max(5).array(),
  // fov: z.number().positive().array(),
  minimapSize: z.number().min(50).max(200).array(),
  minimapZoom: z.number().min(1).max(5).array(),
  keyUp: z.string(),
  keyDown: z.string(),
  keyLeft: z.string(),
  keyRight: z.string(),
});

export type SettingsSchema = z.infer<typeof formSchema>;

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: SettingsSchema;
  onSettingsChange: (settings: SettingsSchema) => void;
}

export function SettingsDialog({ settings, onSettingsChange, ...props }: SettingsDialogProps) {
  const form = useForm<SettingsSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  function onSubmit(values: SettingsSchema) {
    onSettingsChange(values);
    props.onOpenChange(false);
  }

  return (
    <Dialog {...props}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Change the game settings here.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-lg space-y-4 p-4">
                <div className="font-semibold tracking-tight">View</div>

                <FormField
                  control={form.control}
                  name="sensitivity"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Sensitivity</FormLabel>
                      <FormControl>
                        <Slider min={1} max={5} step={0.5} onValueChange={onChange} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="fov"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Field of View (FOV)</FormLabel>
                      <FormControl>
                        <Slider max={110} step={1} onValueChange={onChange} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="minimapSize"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Minimap size</FormLabel>
                      <FormControl>
                        <Slider min={50} max={200} step={5} onValueChange={onChange} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minimapZoom"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Minimap zoom</FormLabel>
                      <FormControl>
                        <Slider min={1} max={5} step={0.5} onValueChange={onChange} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border rounded-lg space-y-4 p-4">
                <div className="font-semibold tracking-tight">Controls</div>

                <div className="flex items-center justify-between">
                  <Label>Forward</Label>
                  <Button variant="secondary" size="icon">W</Button>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Backward</Label>
                  <Button variant="secondary" size="icon">S</Button>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Left</Label>
                  <Button variant="secondary" size="icon">A</Button>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Right</Label>
                  <Button variant="secondary" size="icon">D</Button>
                </div>
              </div>
            </div>


            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
