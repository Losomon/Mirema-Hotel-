import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Search } from 'lucide-react';
import AdminShell from './AdminShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockAdminBookings } from './mockData';
import type { AdminBookingStatus } from './mockData';

type AdminBookingRow = {
  id: string;
  guestName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: AdminBookingStatus;
};

const mockBookings: AdminBookingRow[] = mockAdminBookings.map(b => ({
  id: b.id,
  guestName: b.guestName,
  roomName: b.roomName,
  checkIn: b.checkIn,
  checkOut: b.checkOut,
  guests: b.guests,
  status: b.status,
}));

function statusToBadge(status: AdminBookingStatus) {
  switch (status) {
    case 'confirmed':
      return <Badge>Confirmed</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
  }
}


export default function AdminBookingsPage() {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockBookings;
    return mockBookings.filter((b) =>
      [b.id, b.guestName, b.roomName, b.status].some((v) => String(v).toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl">Bookings</h1>
            <p className="font-paragraph text-foreground/60">Manage reservations (MVP uses mock data).</p>
          </div>
        </div>

        <Card className="shadow-none border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-foreground/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by guest, room, id, status..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              All bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead className="text-right">Guests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{b.id}</TableCell>
                      <TableCell>{b.guestName}</TableCell>
                      <TableCell>{b.roomName}</TableCell>
                      <TableCell>
                        {b.checkIn} → {b.checkOut}
                      </TableCell>
                      <TableCell className="text-right">{b.guests}</TableCell>
                      <TableCell>{statusToBadge(b.status)}</TableCell>
                      <TableCell className="text-right">
                        <Link to={`/admin/bookings/${b.id}`}>
                          <Button variant="outline">View</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                  {rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-foreground/60">
                        No bookings found.
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

