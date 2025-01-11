import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type Props = {};

const TodayStatSection = (_props: Props) => {
  return (
    <Card>
      <CardHeader className="text-base font-semibold text-muted-foreground">
        Time Today
      </CardHeader>
      <CardContent className="text-5xl font-bold">06:37</CardContent>
      <CardFooter>
        <span>Last updated at 3:17 PM</span>
      </CardFooter>
    </Card>
  );
};

export default TodayStatSection;
