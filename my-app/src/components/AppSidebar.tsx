import { LayoutDashboard, ClipboardCheck, Target, Users, Grid3x3, MessageSquare, Settings, LogOut, Menu } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Evaluation", url: "/evaluation", icon: ClipboardCheck },
  { title: "PDI", url: "/pdi", icon: Target },
  { title: "Team", url: "/team", icon: Users },
  { title: "Analytics", url: "/analytics", icon: Grid3x3 },
  { title: "Feedback", url: "/feedback", icon: MessageSquare },
];

const bottomItems = [
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary-medium">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel" />
            <AvatarFallback className="bg-primary-medium text-white">GL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-primary-medium">Olá, Gabriel Lopes!</span>
            <span className="text-xs text-muted-foreground">Seja bem-vindo(a)</span>
          </div>
        </div>
      </SidebarHeader>
      
      <div className="px-4 py-2">
        <SidebarTrigger className="text-primary-medium hover:bg-muted rounded-lg p-2">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
      </div>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:text-primary-medium hover:bg-muted rounded-full transition-all duration-200"
                      activeClassName="bg-primary-light/15 text-primary-medium font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4 mt-auto">
        <SidebarMenu className="space-y-1">
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink 
                  to={item.url}
                  className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:text-primary-medium hover:bg-muted rounded-full transition-all duration-200"
                  activeClassName="bg-primary-light/15 text-primary-medium font-medium"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:text-destructive hover:bg-muted rounded-full transition-all duration-200 w-full">
                <LogOut className="h-5 w-5" />
                <span className="text-sm">Sair</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
