import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [products, categories, brochures] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact' }),
        supabase.from('categories').select('*', { count: 'exact' }),
        supabase.from('brochures').select('*', { count: 'exact' })
      ]);
      
      return {
        products: products.count || 0,
        categories: categories.count || 0,
        brochures: brochures.count || 0
      };
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{stats?.products || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Categories</h3>
          <p className="text-3xl font-bold">{stats?.categories || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Brochures</h3>
          <p className="text-3xl font-bold">{stats?.brochures || 0}</p>
        </Card>
      </div>
    </div>
  );
}