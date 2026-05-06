import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminSidebar from './AdminSidebar';


export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <AdminSidebar />
          <main>{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}


