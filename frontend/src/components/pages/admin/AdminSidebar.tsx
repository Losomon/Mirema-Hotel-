import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { mockAdminBookings } from "./mockData";

export type AdminSection = "dashboard" | "bookings" | "rooms";

interface NavItem {
  id: AdminSection;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_ITEMS_BASE: Omit<NavItem, 'badge'>[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="1" y="1" width="6" height="6" rx="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="1" y="3" width="14" height="12" rx="1.5" />
        <path d="M5 1v4M11 1v4M1 7h14" />
      </svg>
    ),
  },
  {
    id: "rooms",
    label: "Rooms",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M1 13V6l7-4 7 4v7" />
        <path d="M5 13V9h6v4" />
      </svg>
    ),
  },
];

function getActiveSectionFromPath(pathname: string): AdminSection {
  if (pathname.startsWith("/admin/bookings")) return "bookings";
  if (pathname.startsWith("/admin/rooms")) return "rooms";
  return "dashboard";
}

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const active = getActiveSectionFromPath(location.pathname);

  // Compute dynamic badge count (pending bookings)
  const pendingCount = mockAdminBookings.filter(b => b.status === 'pending').length;

  const navItems: NavItem[] = NAV_ITEMS_BASE.map(item => {
    if (item.id === 'bookings' && pendingCount > 0) {
      return { ...item, badge: pendingCount };
    }
    return item;
  });

  return (
    <aside className="lg:sticky lg:top-24 self-start">
      <div className="rounded-xl border border-primary/10 bg-white/70 backdrop-blur p-4">
        <div className="mb-6">
          <h2 className="font-heading text-lg">Admin</h2>
          <p className="font-paragraph text-xs text-foreground/60">Mirema Hotel Console</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={active}
              onNavigate={(s) => navigate(getPathForSection(s))}
            />
          ))}
        </nav>

         <div className="mt-6 text-xs text-foreground/60">
           <Link
             to="/"
             className="underline underline-offset-4 hover:text-primary"
           >
             Back to website
           </Link>
         </div>
      </div>
    </aside>
  );
}

function getPathForSection(section: AdminSection): string {
  switch (section) {
    case "dashboard":
      return "/admin/dashboard";
    case "bookings":
      return "/admin/bookings";
    case "rooms":
      return "/admin/rooms";
  }
}

function NavButton({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: AdminSection;
  onNavigate: (s: AdminSection) => void;
}) {
  const isActive = item.id === active;

  return (
    <button
      type="button"
      onClick={() => onNavigate(item.id)}
      className={[
        'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-paragraph transition-colors text-left',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-foreground/70 hover:text-primary hover:bg-primary/5',
      ].join(' ')}
    >
      <span className="text-primary">{item.icon}</span>
      <span>{item.label}</span>
      {item.badge != null && (
        <span
          className={[
            "ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium",
            isActive ? "bg-primary/10 text-primary" : "bg-primary/5 text-primary",
          ].join(" ")}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

