import { GoHome, GoHomeFill } from "react-icons/go";
import { RiExchangeLine, RiExchangeFill } from "react-icons/ri";
import { TbSettingsFilled, TbSettings } from "react-icons/tb";
import { FaCreditCard, FaRegCreditCard } from "react-icons/fa";
import { UsersIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Home", href: "", icon: GoHome, activeIcon: GoHomeFill },
  {
    label: "Transfers",
    href: "/transfers",
    icon: RiExchangeLine,
    activeIcon: RiExchangeFill,
  },
  {
    label: "Recipients",
    href: "/recipients",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
  {
    label: "Payment Methods",
    href: "/payment-methods",
    icon: FaCreditCard,
    activeIcon: FaRegCreditCard,
  },

  {
    label: "Settings",
    href: "/settings",
    icon: TbSettings,
    activeIcon: TbSettingsFilled,
  },
];

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.activeIcon : item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
