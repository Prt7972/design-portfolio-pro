import { Home, Database, FileText, Users, Settings } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AdminSidebarMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userRole: string;
}

export function AdminSidebarMenu({ activeSection, setActiveSection, userRole }: AdminSidebarMenuProps) {
  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: Home },
    { id: "products", title: "Products", icon: Database },
    { id: "categories", title: "Categories", icon: FileText },
    { id: "brochures", title: "Brochures", icon: FileText },
    ...(userRole === 'super_admin' ? [{ id: "users", title: "Users", icon: Users }] : []),
    { id: "settings", title: "Settings", icon: Settings },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveSection(item.id)}
                  isActive={activeSection === item.id}
                  tooltip={item.title}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}