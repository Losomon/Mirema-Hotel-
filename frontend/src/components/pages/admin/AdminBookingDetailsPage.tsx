import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CalendarDays, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import AdminShell from './AdminShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockAdminBookings } from './mockData';
import type { AdminBooking, AdminBookingStatus } from './mockData';

function statusBadge(status: AdminBookingStatus) {
  if (status === 'confirmed') return <Badge>Confirmed</Badge>;
  if (status === 'pending') return <Badge variant="secondary">Pending</Badge>;
  return <Badge variant="destructive">Cancelled</Badge>;
}

export default function AdminBookingDetailsPage() {
  const { bookingId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const booking = useMemo<AdminBooking | null>(() => {
    if (!bookingId) return null;
    return mockAdminBookings.find(b => b.id === bookingId) ?? null;
  }, [bookingId]);

  const [status, setStatus] = useState<AdminBookingStatus>(booking?.status ?? 'pending');

  if (!booking) {
    return (
      <AdminShell>
        <div className="space-y-6">
          <h1 className="font-heading text-3xl">Booking not found</h1>
          <p className="font-paragraph text-foreground/60">No booking exists for the provided id.</p>
        </div>
      </AdminShell>
    );
  }

  const canConfirm = status !== 'confirmed' && status !== 'cancelled';
  const canCancel = status !== 'cancelled';

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl">Booking Details</h1>
            <p className="font-paragraph text-foreground/60">{booking.id}</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/bookings')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to bookings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="shadow-none border-primary/10 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Guest & reservation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="font-paragraph text-sm text-foreground/60">Guest</div>
                  <div className="font-heading text-xl">{booking.guestName}</div>
                  <div className="font-paragraph text-sm text-foreground/70">{booking.guestEmail}</div>
                  <div className="font-paragraph text-sm text-foreground/70">{booking.guestPhone}</div>
                </div>

                <div>
                  <div className="font-paragraph text-sm text-foreground/60">Room</div>
                  <div className="font-heading text-xl">{booking.roomName}</div>
                </div>

                <div>
                  <div className="font-paragraph text-sm text-foreground/60">Dates</div>
                  <div className="flex items-center gap-2 font-paragraph">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    {booking.checkIn} → {booking.checkOut}
                  </div>
                </div>

                <div>
                  <div className="font-paragraph text-sm text-foreground/60">Guests</div>
                  <div className="font-heading text-lg">{booking.guests}</div>
                </div>

                {booking.notes && (
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                    <div className="font-paragraph text-sm text-foreground/60">Notes</div>
                    <div className="font-paragraph text-sm text-foreground/80">{booking.notes}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-paragraph text-sm text-foreground/60">Current</div>
                  <div>{statusBadge(status)}</div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button disabled={!canConfirm} className="w-full">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Confirm
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm this booking?</DialogTitle>
                      <DialogDescription>
                        This will update the booking status to <b>Confirmed</b>.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => toast({ title: 'Cancelled', description: 'No changes made.' })}
                      >
                        Not now
                      </Button>
                      <Button
                        onClick={() => {
                          setStatus('confirmed');
                          toast({ title: 'Booking confirmed', description: `Booking ${booking.id} is now confirmed.` });
                        }}
                      >
                        Confirm booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button disabled={!canCancel} variant="destructive" className="w-full">
                      <XCircle className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel this booking?</DialogTitle>
                      <DialogDescription>
                        This will set the booking status to <b>Cancelled</b>.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => toast({ title: 'Cancelled', description: 'No changes made.' })}>
                        Keep active
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setStatus('cancelled');
                          toast({ title: 'Booking cancelled', description: `Booking ${booking.id} has been cancelled.` });
                        }}
                      >
                        Cancel booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}

