import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type Props = {};

const TodayStatSection = (_props: Props) => {
  return (
    <Card className="flex-1 w-full">
      <CardHeader className="text-sm font-semibold text-muted-foreground">
        Time Today
      </CardHeader>
      <CardContent className="text-4xl font-bold pb-2">06:37</CardContent>
      <CardFooter className="text-xs">Last updated at 3:17 PM</CardFooter>
    </Card>
  );
};

export default TodayStatSection;
