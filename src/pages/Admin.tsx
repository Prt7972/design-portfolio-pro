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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Admin() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  
  // Fetch user profile to check role
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log("Fetching user profile...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found");
        throw new Error('Not authenticated');
      }
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Profile fetched:", profile);
      return profile;
    }
  });

  useEffect(() => {
    if (!isLoading && (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin'))) {
      console.log("Unauthorized access attempt, redirecting to home");
      toast.error("You don't have permission to access the admin panel");
      navigate('/');
    }
  }, [profile, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex w-full bg-background p-6">
        <div className="w-64">
          <Skeleton className="h-[600px] w-full" />
        </div>
        <div className="flex-1 ml-6">
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error in admin panel:", error);
    toast.error("Error loading admin panel");
    return null;
  }

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
      <Sidebar variant="inset" collapsible="icon">
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
      </Sidebar>
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}