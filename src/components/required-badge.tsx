import { SidebarMenuBadge } from "@/components/ui/sidebar";
import { AsteriskIcon } from "lucide-react";

export function RequiredBadge() {
  return (
    <SidebarMenuBadge>
      <AsteriskIcon className="size-4 text-amber-500 dark:text-amber-400" />
    </SidebarMenuBadge>
  )
}
