
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function AdminProducts() {
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)');

      if (error) {
        toast.error('Failed to load products');
        throw error;
      }
      
      return data || [];
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'active' | 'inactive' }) => {
      const { error } = await supabase
        .from('products')
        .update({ status: status === 'active' ? 'inactive' : 'active' })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update product status');
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete product');
    }
  });

  const handleToggleStatus = (id: string, currentStatus: string) => {
    toggleStatusMutation.mutate({ 
      id, 
      status: currentStatus as 'active' | 'inactive' 
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button>Add Product</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.categories?.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-sm ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </TableCell>
              <TableCell className="space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleToggleStatus(product.id, product.status)}
                  title={product.status === 'active' ? 'Hide product' : 'Show product'}
                >
                  {product.status === 'active' ? 
                    <Eye className="h-4 w-4" /> : 
                    <EyeOff className="h-4 w-4" />
                  }
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
