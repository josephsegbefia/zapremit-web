import { Button } from "@/components/ui/button";
import { TextComp } from "@/features/test";
export default function Home() {
  return (
    <div>
      <Button>Click Me</Button>
      <p className="text-red-500 fint-semibold">Nayram</p>
      <TextComp />
    </div>
  );
}
