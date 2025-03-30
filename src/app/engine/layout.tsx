import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { GameDialog } from "@/components/game-dialog"
import { ModeToggle } from "@/components/mode-toggle"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs } from "@radix-ui/react-tabs"

type EngineLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function EngineLayout({ children }: EngineLayoutProps) {
  return (
    <Tabs defaultValue="map">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <div className="ml-auto flex items-center gap-x-2">
                <ModeToggle />
                <GameDialog />
              </div>
            </div>
          </header>
          <div className="px-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </Tabs>
  )
}
