"use client";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiExchange2Fill, RiExchange2Line } from "react-icons/ri";
import { TbSettingsFilled, TbSettings } from "react-icons/tb";
import { FaCreditCard, FaRegCreditCard } from "react-icons/fa";
import { UsersIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const routes = [
  { label: "Home", href: "/playground", icon: GoHome, activeIcon: GoHomeFill },
  {
    label: "Transfers",
    href: "/playground/transfers",
    icon: RiExchange2Line,
    activeIcon: RiExchange2Fill,
  },
  {
    label: "Recipients",
    href: "/playground/recipients",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
  {
    label: "Payment Methods",
    href: "/playground/payment-methods",
    icon: FaCreditCard,
    activeIcon: FaRegCreditCard,
  },

  {
    label: "Settings",
    href: "/playground/settings",
    icon: TbSettings,
    activeIcon: TbSettingsFilled,
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-between">
      <ul className="flex flex-col">
        {routes.map((item) => {
          const fullHref = `${item.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-teal-900 cursor-pointer transition text-white",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-teal-600 hover:text-teal-600"
                )}
              >
                {isActive ? (
                  <Icon className="size-5 text-teal-600" />
                ) : (
                  <Icon className="size-5 text-white" />
                )}
                {item.label}
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
