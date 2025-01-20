import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MessageCircleCode, Plus, Sparkles } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';

function AppSideBar() {
  return (
    <Sidebar className="border-r bg-background/80 backdrop-blur-xl mt-5 pt-10">
      <SidebarHeader className="flex flex-col gap-4 p-4 border-b border-transparent">
        <div className="flex items-center gap-2">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition duration-200" />
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={32} 
              height={32}
              className="relative rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">
            AXION
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Button 
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary justify-start gap-2 group transition-all duration-200"
          >
            <MessageCircleCode className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Start New Chat</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 group border-dashed hover:border-primary/50 transition-all duration-200"
          >
            <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            <span>New Workspace</span>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="py-2">
          <div className="flex items-center gap-2 px-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-sidebar-foreground/70">
              Recent Workspaces
            </span>
          </div>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-transparent">
        <SideBarFooter />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default AppSideBar;
