import { Header } from "@/app/engine/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from 'react';

type EngineLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function EngineLayout({ children }: EngineLayoutProps) {
  return (
    
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 [--navbar-height:theme(spacing.12)]">
        <Header />
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
