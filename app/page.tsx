"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="p-7">
        <nav className="flex justify-between items-center fixed">
          <Image src="/logo.svg" width={152} height={56} alt="Logo" />
        </nav>
      </div>

      <div className="flex justify-center items-center min-h-screen w-ful">
        <p className="text-bold text-lg text-teal-500">Landing Page</p>

        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
}
