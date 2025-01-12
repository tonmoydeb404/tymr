import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDuration } from "@/helpers/common";
import { WorkTime } from "@/types/work-times";
import { useMemo } from "react";

type Props = {
  data: WorkTime[];
};

const TableSection = (props: Props) => {
  const { data } = props;

  const modifiedData = useMemo(() => {
    const obj = data.reduce((acc, { date, duration }) => {
      if (!acc[date]) {
        acc[date] = { date, works: 0, duration: 0 };
      }
      acc[date].works += 1;
      acc[date].duration += duration;
      return acc;
    }, {} as Record<string, { date: string; works: number; duration: number }>);

    return Object.values(obj);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Date</TableHead>
          <TableHead>Tracks</TableHead>
          <TableHead className="text-right">Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modifiedData.map((item) => (
          <TableRow key={item.date}>
            <TableCell className="font-medium">{item.date}</TableCell>
            <TableCell>{item.works}</TableCell>
            <TableCell className="text-right">
              {formatDuration(item.duration)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSection;
