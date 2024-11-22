import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const KnowYourCustomer = () => {
  return (
    <div>
      KnowYourCustomer
      <Button asChild>
        <Link href="/playground">Save & continue</Link>
      </Button>
    </div>
  );
};

export default KnowYourCustomer;
