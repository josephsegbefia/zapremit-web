import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "./dotted-separator";
// import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { History, RepeatIcon } from "lucide-react";
// import ExchangeRateCard from "./exchange-rate-card";

interface InfoCardProps {
  title: string;
  recipientName?: string;
  transferAmount?: string;
  transferDate?: Date;
}
const InfoCard = ({
  title,
  recipientName,

  transferAmount,
}: InfoCardProps) => {
  return (
    <Card className="w-full lg:w-2/3 sm:h-[300px] md:h-[300px] lg:h-[300px] border-none shadow-none">
      <CardHeader className="flex px-7 py-3">
        <CardTitle className="text-xl flex justify-between font-work-sans font-bold text-teal-600">
          {title}
          <div className="flex">
            <Button
              asChild
              size="sm"
              className="bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
            >
              {/* TODO => CHANGE THE HREF TO POINT TO THE APPROPRIATE PAGE */}
              <Link href="/">
                <RepeatIcon />
                Repeat Transfer
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
            >
              {/* TODO => CHANGE THE HREF TO POINT TO THE APPROPRIATE PAGE */}
              <Link href="/">
                <History />
                View All Transfers
              </Link>
            </Button>
          </div>
        </CardTitle>

        <DottedSeparator className="mt-4" />
      </CardHeader>
      <CardContent className="px-7 py-3">
        <>
          <p className="font-bold font-work-sans text-muted-foreground">
            Recipient -{" "}
            <span className="font-semibold font-work-sans">
              {recipientName}
            </span>
          </p>
          <p className="font-bold font-work-sans text-muted-foreground">
            Amount Sent -{" "}
            <span className="font-semibold font-work-sans">
              {transferAmount}
            </span>
          </p>
          <p className="font-bold font-work-sans text-muted-foreground">
            Date -{" "}
            <span className="font-semibold font-work-sans">
              {/* {transferDate && formatDate(transferDate)} */}
            </span>
          </p>
        </>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
