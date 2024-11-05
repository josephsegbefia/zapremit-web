import {
  Home,
  CreditCard,
  Users,
  DollarSign,
  Bell,
  Settings,
  Key,
  Clipboard,
  Terminal,
  FolderPlus,
  Folder,
} from "lucide-react";

export const adminDashboard = [
  {
    label: "Overview",
    href: "/backroom/staff/admin/dashboard/overview",
    icon: Home,
    activeIcon: Home,
  },
  {
    label: "Analytics",
    href: "/backroom/staff/admin/dashboard/analytics",
    icon: Clipboard,
    activeIcon: Clipboard,
  },
];

export const adminTransactions = [
  {
    label: "All Transactions",
    href: "/backroom/staff/admin/transactions/all",
    icon: CreditCard,
    activeIcon: CreditCard,
  },
  {
    label: "Pending Transactions",
    href: "/backroom/staff/admin/transactions/pending",
    icon: CreditCard,
    activeIcon: CreditCard,
  },
  {
    label: "Failed Transactions",
    href: "/backroom/staff/admin/transactions/failed",
    icon: CreditCard,
    activeIcon: CreditCard,
  },
  {
    label: "Refunds",
    href: "/backroom/staff/admin/transactions/refund",
    icon: DollarSign,
    activeIcon: DollarSign,
  },
];

export const adminUserManagement = [
  {
    label: "All Users",
    href: "/backroom/staff/admin/users/all",
    icon: Users,
    activeIcon: Users,
  },
  {
    label: "User Verification",
    href: "/backroom/staff/admin/users/verification",
    icon: Key,
    activeIcon: Key,
  },
  {
    label: "Blocked Users",
    href: "/backroom/staff/admin/users/blocked",
    icon: Key,
    activeIcon: Key,
  },
];

export const adminSettings = [
  {
    label: "Notifications",
    href: "/backroom/staff/admin/settings/notifications",
    icon: Bell,
    activeIcon: Bell,
  },
  {
    label: "Settings",
    href: "/backroom/staff/admin/settings/settings",
    icon: Settings,
    activeIcon: Settings,
  },
  {
    label: "Reports and Logs",
    href: "/backroom/staff/admin/settings/reports",
    icon: Clipboard,
    activeIcon: Clipboard,
  },
  {
    label: "API and Integrations",
    href: "/backroom/staff/admin/settings/api-integrations",
    icon: Terminal,
    activeIcon: Terminal,
  },
];

export const adminSupport = [
  {
    label: "Support Tickets",
    href: "/backroom/staff/admin/support/support-tickets",
    icon: Folder,
    activeIcon: Folder,
  },
  {
    label: "Resolved Issues",
    href: "/backroom/staff/admin/support/resolved-issues",
    icon: FolderPlus,
    activeIcon: FolderPlus,
  },
];
