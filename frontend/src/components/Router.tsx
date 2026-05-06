import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { AdminProtectedRoute } from '@/components/ui/admin-protected-route';
import HomePage from '@/components/pages/HomePage';
import RoomsPage from '@/components/pages/RoomsPage';
import AboutPage from '@/components/pages/AboutPage';
import ServicesPage from '@/components/pages/ServicesPage';
import GalleryPage from '@/components/pages/GalleryPage';
import ContactPage from '@/components/pages/ContactPage';
import BookingPage from '@/components/pages/BookingPage';
import ProfilePage from '@/components/pages/ProfilePage';
import AdminDashboardPage from '@/components/pages/admin/AdminDashboardPage';
import AdminBookingsPage from '@/components/pages/admin/AdminBookingsPage';
import AdminBookingDetailsPage from '@/components/pages/admin/AdminBookingDetailsPage';
import AdminRoomsPage from '@/components/pages/admin/AdminRoomsPage';
import AdminRoomAddPage from '@/components/pages/admin/AdminRoomAddPage';
import AdminRoomEditPage from '@/components/pages/admin/AdminRoomEditPage';


// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "rooms",
        element: <RoomsPage />,
        routeMetadata: {
          pageIdentifier: 'rooms',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "services",
        element: <ServicesPage />,
        routeMetadata: {
          pageIdentifier: 'services',
        },
      },
      {
        path: "gallery",
        element: <GalleryPage />,
        routeMetadata: {
          pageIdentifier: 'gallery',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "booking",
        element: (
          <MemberProtectedRoute messageToSignIn="Please sign in to make a booking">
            <BookingPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'booking',
        },
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute>
            <ProfilePage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'profile',
        },
      },
       {
         path: "admin/dashboard",
         element: (
           <AdminProtectedRoute>
             <AdminDashboardPage />
           </AdminProtectedRoute>
         ),
         routeMetadata: {
           pageIdentifier: 'admin-dashboard',
         },
       },
       {
         path: "admin/bookings",
         element: (
           <AdminProtectedRoute>
             <AdminBookingsPage />
           </AdminProtectedRoute>
         ),
         routeMetadata: {
           pageIdentifier: 'admin-bookings',
         },
       },
       {
         path: "admin/bookings/:bookingId",
         element: (
           <AdminProtectedRoute>
             <AdminBookingDetailsPage />
           </AdminProtectedRoute>
         ),
         routeMetadata: {
           pageIdentifier: 'admin-booking-details',
         },
       },
       {
         path: "admin/rooms",
         element: (
           <AdminProtectedRoute>
             <AdminRoomsPage />
           </AdminProtectedRoute>
         ),
         routeMetadata: {
           pageIdentifier: 'admin-rooms',
         },
       },
       {
         path: "admin/rooms/add",
         element: (
           <AdminProtectedRoute>
             <AdminRoomAddPage />
           </AdminProtectedRoute>
         ),
         routeMetadata: {
           pageIdentifier: 'admin-room-add',
         },
       },
       {
         path: "admin/rooms/edit/:roomId",
         element: (
           <AdminProtectedRoute>
             <AdminRoomEditPage />
           </AdminProtectedRoute>
         ),
         routeMetadata: {
           pageIdentifier: 'admin-room-edit',
         },
       },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
