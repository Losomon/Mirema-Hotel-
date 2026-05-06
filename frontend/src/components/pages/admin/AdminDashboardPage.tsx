import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminShell from './AdminShell';
import { CalendarDays, BedDouble, Users } from 'lucide-react';

export default function AdminDashboardPage() {
  // Mock metrics until admin API + real booking/room models exist
  const metrics = [
    { title: 'Today bookings', value: '12', icon: <CalendarDays className="w-5 h-5 text-primary" /> },
    { title: 'Total rooms', value: '3', icon: <BedDouble className="w-5 h-5 text-primary" /> },
    { title: 'Active guests', value: '24', icon: <Users className="w-5 h-5 text-primary" /> },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl">Admin Dashboard</h1>
            <p className="font-paragraph text-foreground/60">Modern & minimal overview of your hotel operations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <Card key={m.title} className="shadow-none border-primary/10">
               <CardHeader className="pb-3">
                 <CardTitle className="flex items-center gap-3 text-base">
                   {m.icon}
                   <span>{m.title}</span>
                 </CardTitle>
               </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl">{m.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-none border-primary/10">
          <CardHeader>
            <CardTitle className="text-base">Quick actions (MVP)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-paragraph text-foreground/70 text-sm">
              Extend backend with admin auth + bookings CRUD, then wire this dashboard to real data.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

