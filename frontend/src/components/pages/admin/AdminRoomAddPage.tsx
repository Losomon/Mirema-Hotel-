import { useState } from 'react';
import { Plus } from 'lucide-react';
import AdminShell from './AdminShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type RoomForm = {
  name: string;
  price: string;
  description: string;
};

export default function AdminRoomAddPage() {
  const { toast } = useToast();
  const [form, setForm] = useState<RoomForm>({
    name: '',
    price: '',
    description: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Room created (mock)',
      description: `Added ${form.name || 'room'} to your inventory. Wire POST /api/rooms when backend is ready.`,
    });
    setForm({ name: '', price: '', description: '' });
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl">Add Room</h1>
          <p className="font-paragraph text-foreground/60">Create a new room type (UI ready; backend TBD).</p>
        </div>

        <Card className="shadow-none border-primary/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="w-4 h-4" /> Room details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Room name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (per night) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="pt-2">
                <Button type="submit">Create room</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

