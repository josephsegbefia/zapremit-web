import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        {/* <h1 className="text-2xl font-extrabold">Home</h1> */}
        {/* <p className="text-muted-foreground">
          Send money to friends, & family in Africa!
        </p> */}
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
