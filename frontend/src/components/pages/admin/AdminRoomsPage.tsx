import { useMemo, useState } from 'react';
import { BedDouble, Search, Pencil, Trash2 } from 'lucide-react';
import AdminShell from './AdminShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockAdminRooms } from './mockData';
import type { RoomStatus } from './mockData';

type RoomRow = {
  id: string;
  name: string;
  price: number;
  status: RoomStatus;
};

const mockRooms: RoomRow[] = mockAdminRooms.map(r => ({
  id: r.id,
  name: r.name,
  price: r.price,
  status: r.status,
}));

function roomStatusBadge(status: RoomStatus) {
  if (status === 'active') return <Badge>Active</Badge>;
  return <Badge variant="secondary">Inactive</Badge>;
}

export default function AdminRoomsPage() {
  const [query, setQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const rooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockRooms;
    return mockRooms.filter((r) => [r.id, r.name, String(r.price), r.status].some((v) => String(v).toLowerCase().includes(q)));
  }, [query]);

  const handleDelete = () => {
    if (deleteId) {
      toast({
        title: 'Room deleted (mock)',
        description: `Room ${deleteId} has been deleted. Wire DELETE /api/rooms/:id when backend is ready.`,
      });
      setDeleteId(null);
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl">Rooms</h1>
            <p className="font-paragraph text-foreground/60">Manage room types (MVP uses mock data).</p>
          </div>
          <Link to="/admin/rooms/add">
            <Button>Add room</Button>
          </Link>
        </div>

        <Card className="shadow-none border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BedDouble className="w-4 h-4" />
              Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="w-4 h-4 text-foreground/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search rooms..."
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">All rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>{r.price}</TableCell>
                      <TableCell>{roomStatusBadge(r.status)}</TableCell>
                       <TableCell className="text-right">
                         <div className="flex items-center justify-end gap-2">
                           <Link to={`/admin/rooms/edit/${r.id}`}>
                             <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                               <Pencil className="w-4 h-4" /> Edit
                             </Button>
                           </Link>
                           <Dialog open={deleteId === r.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                             <DialogTrigger asChild>
                               <Button
                                 variant="destructive"
                                 size="sm"
                                 className="inline-flex items-center gap-2"
                                 onClick={() => setDeleteId(r.id)}
                               >
                                 <Trash2 className="w-4 h-4" /> Delete
                               </Button>
                             </DialogTrigger>
                             <DialogContent>
                               <DialogHeader>
                                 <DialogTitle>Delete this room?</DialogTitle>
                                 <DialogDescription>
                                   This will permanently delete <b>{r.name}</b>. This action cannot be undone.
                                 </DialogDescription>
                               </DialogHeader>
                               <DialogFooter>
                                 <Button variant="outline" onClick={() => setDeleteId(null)}>
                                   Cancel
                                 </Button>
                                 <Button variant="destructive" onClick={handleDelete}>
                                   Delete room
                                 </Button>
                               </DialogFooter>
                             </DialogContent>
                           </Dialog>
                         </div>
                       </TableCell>
                    </TableRow>
                  ))}
                  {rooms.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-foreground/60">
                        No rooms found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

