import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import Image from "next/image";
import Link from "next/link";
import { AdminPageNavigation } from "./admin-page-navigation";

export const AdminSidebar = () => {
  return (
    <div className="min-h-screen bg-black p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>
      <DottedSeparator className="my-4" color="white" />
      <AdminPageNavigation />
    </div>
  );
};
