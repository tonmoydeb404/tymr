import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type Props = {};

const WeekStatSection = (_props: Props) => {
  return (
    <Card>
      <CardHeader className="text-base font-semibold text-muted-foreground">
        This Week
      </CardHeader>
      <CardContent className="text-5xl font-bold">43:21</CardContent>
      <CardFooter>
        <span>Last updated at 3:17 PM</span>
      </CardFooter>
    </Card>
  );
};

export default WeekStatSection;
