import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LucideHash, LucidePlay } from "lucide-react";

type Props = {};

const TrackerSection = (_props: Props) => {
  return (
    <Card
      className="mx-auto mt-10 flex items-center justify-center px-4 py-4 gap-4 focus-within:border-primary duration-200"
      as="label"
    >
      <LucideHash />

      <Input
        id="title"
        type="text"
        placeholder="What are you working on?"
        className="border-0 text-base focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <span>00:00</span>

      <Button className="!size-12 rounded-full">
        <LucidePlay />
      </Button>
    </Card>
  );
};

export default TrackerSection;
