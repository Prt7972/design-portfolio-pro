import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Download } from "lucide-react";

export function AdminBrochures() {
  const { data: brochures, isLoading } = useQuery({
    queryKey: ['admin-brochures'],
    queryFn: async () => {
      const { data } = await supabase
        .from('brochures')
        .select('*');
      return data || [];
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Brochures</h1>
        <Button>Add Brochure</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>File Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brochures?.map((brochure: any) => (
            <TableRow key={brochure.id}>
              <TableCell>{brochure.title}</TableCell>
              <TableCell>{brochure.description}</TableCell>
              <TableCell>{brochure.file_type}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href={brochure.file_url} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
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