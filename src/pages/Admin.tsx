import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { AdminSidebarMenu } from "@/components/admin/AdminSidebarMenu";
import { AdminContent } from "@/components/admin/AdminContent";

export default function Admin() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Session data:", session);
      return session;
    }
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      console.log("Fetching user profile...");
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
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
    if (!session) {
      console.log("No session found, redirecting to login");
      toast.error("Please login to access the admin panel");
      navigate('/auth');
    }
  }, [session, navigate]);

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

  if (!profile) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar variant="inset" collapsible="icon">
          <AdminSidebarMenu 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            userRole={profile.role}
          />
        </Sidebar>
        <AdminContent 
          activeSection={activeSection}
          userRole={profile.role}
        />
      </div>
    </SidebarProvider>
  );
}