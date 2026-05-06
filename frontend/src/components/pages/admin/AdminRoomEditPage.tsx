import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import AdminShell from './AdminShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockAdminRooms } from './mockData';
import type { AdminRoom, RoomStatus } from './mockData';

export default function AdminRoomEditPage() {
  const { roomId } = useParams();
  const { toast } = useToast();

  const room = useMemo<AdminRoom | null>(() => {
    if (!roomId) return null;
    return mockAdminRooms.find((r) => r.id === roomId) ?? null;
  }, [roomId]);

  const [name, setName] = useState(room?.name ?? '');
  const [price, setPrice] = useState(String(room?.price ?? ''));
  const [description, setDescription] = useState(room?.description ?? '');

  if (!room) {
    return (
      <AdminShell>
        <div className="space-y-6">
          <h1 className="font-heading text-3xl">Room not found</h1>
          <p className="font-paragraph text-foreground/60">No room exists for the provided id.</p>
        </div>
      </AdminShell>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Room updated (mock)',
      description: `Saved changes for ${name || 'room'}. Wire PUT /api/rooms/:id when backend is ready.`,
    });
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl">Edit Room</h1>
          <p className="font-paragraph text-foreground/60">Update room details for {room.name}</p>
        </div>

        <Card className="shadow-none border-primary/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Pencil className="w-4 h-4" /> Room form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Room name *</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (per night) *</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="pt-2">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

