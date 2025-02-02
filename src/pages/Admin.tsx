import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Settings, Users, Database, FileText, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminBrochures } from "@/components/admin/AdminBrochures";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { useState } from "react";

export default function Admin() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  
  // Fetch user profile to check role
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return profile;
    }
  });

  useEffect(() => {
    if (!isLoading && (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin'))) {
      navigate('/');
    }
  }, [profile, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (!profile) return null;

  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: Home },
    { id: "products", title: "Products", icon: Database },
    { id: "categories", title: "Categories", icon: FileText },
    { id: "brochures", title: "Brochures", icon: FileText },
    ...(profile.role === 'super_admin' ? [{ id: "users", title: "Users", icon: Users }] : []),
    { id: "settings", title: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "categories":
        return <AdminCategories />;
      case "brochures":
        return <AdminBrochures />;
      case "users":
        return profile.role === 'super_admin' ? <AdminUsers /> : null;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full ${activeSection === item.id ? 'bg-accent' : ''}`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
}