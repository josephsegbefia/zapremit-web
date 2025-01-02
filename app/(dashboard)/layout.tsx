import { Navbar } from "@/components/shared-components/navbar";
import { Sidebar } from "@/components/shared-components/sidebar";
import { CreateRecipientModal } from "@/features/recipients/components/create-recipient-modal";
import { UpdateRecipientForm } from "@/features/recipients/components/update-recipient-form";
import { UpdateRecipientModal } from "@/features/recipients/components/update-recipient-modal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <CreateRecipientModal />
      <UpdateRecipientModal />
      <div className="flex w-full h-full">
        <div className="fixed top-0 left-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">
              <div>{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
