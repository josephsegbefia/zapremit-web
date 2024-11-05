"use client";
import { cn } from "@/lib/utils";
import {
  adminDashboard,
  adminSettings,
  adminSupport,
  adminTransactions,
  adminUserManagement,
} from "./admin-routes";
import Link from "next/link";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { usePathname } from "next/navigation";

export const AdminPageNavigation = () => {
  const pathname = usePathname();
  return (
    <>
      <p className="font-work-sans font-semibold text-white">DASHBOARD</p>
      <ul className="flex flex-col">
        {adminDashboard.map((item) => {
          const fullHref = `${item.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-teal-900 cursor-pointer transition text-muted-foreground",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-teal-600 hover:text-teal-900"
                )}
              >
                {isActive ? (
                  <Icon className="size-5 text-teal-600" />
                ) : (
                  <Icon className="size-5 text-white" />
                )}
                {/* <Icon className="size-5 text-neutral-500" /> */}
                {item.label}
              </div>
            </Link>
          );
        })}
      </ul>
      <DottedSeparator className="mt-5 mb-3" />
      <p className="font-work-sans font-semibold text-white">USER MANAGEMENT</p>
      <ul className="flex flex-col">
        {adminUserManagement.map((item) => {
          const fullHref = `${item.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-teal-900 cursor-pointer transition text-muted-foreground",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-teal-600 hover:text-teal-900"
                )}
              >
                {isActive ? (
                  <Icon className="size-5 text-teal-600" />
                ) : (
                  <Icon className="size-5 text-white" />
                )}
                {/* <Icon className="size-5 text-neutral-500" /> */}
                {item.label}
              </div>
            </Link>
          );
        })}
      </ul>

      <DottedSeparator className="mt-5 mb-3" />
      <p className="font-work-sans font-semibold text-white">TRANSACTIONS</p>
      <ul className="flex flex-col">
        {adminTransactions.map((item) => {
          const fullHref = `${item.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-teal-900 cursor-pointer transition text-muted-foreground",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-teal-600 hover:text-teal-900"
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

      <DottedSeparator className="mt-5 mb-3" />
      <p className="font-work-sans font-semibold text-white">SUPPORT</p>
      <ul className="flex flex-col">
        {adminSupport.map((item) => {
          const fullHref = `${item.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-teal-900 cursor-pointer transition text-muted-foreground",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-teal-600 hover:text-teal-900"
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

      <DottedSeparator className="mt-5 mb-3" />
      <p className="font-work-sans font-semibold text-white">SETTINGS</p>
      <ul className="flex flex-col">
        {adminSettings.map((item) => {
          const fullHref = `${item.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-teal-900 cursor-pointer transition text-muted-foreground",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-teal-600 hover:text-teal-900"
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
    </>
  );
};
