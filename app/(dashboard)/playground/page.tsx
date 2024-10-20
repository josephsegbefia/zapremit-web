import { getCurrent } from "@/features/auth/actions";
// Import create recipient form

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  console.log({ user });

  if (!user) redirect("/sign-in");
  return (
    <div className="">
      <p className="text-2xl">Your Space</p>
    </div>
  );
}
