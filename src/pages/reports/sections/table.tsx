import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDuration } from "@/helpers/common";
import { WorkTime } from "@/types/work-times";
import { LucideChevronDown, LucideChevronRight } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import ChildTable from "./child-table";

type Props = {
  data: WorkTime[];
};

const TableSection = (props: Props) => {
  const { data } = props;
  const [openRow, setOpenRow] = useState<string | null>(null);

  const modifiedData = useMemo(() => {
    const obj = data.reduce((acc, work) => {
      const { date, duration } = work;
      if (!acc[date]) {
        acc[date] = { date, works: [], duration: 0 };
      }
      acc[date].works.push(work);
      acc[date].duration += duration;
      return acc;
    }, {} as Record<string, { date: string; works: WorkTime[]; duration: number }>);

    return Object.values(obj);
  }, []);

  const toggleOpenRow = (value: string) => {
    setOpenRow((prev) => (value === prev ? null : value));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70px]" />
          <TableHead className="w-[300px]">Date</TableHead>
          <TableHead>Tracks</TableHead>
          <TableHead className="text-right">Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modifiedData.map((item) => (
          <Fragment key={item.date}>
            <TableRow>
              <TableCell>
                <Button
                  onClick={() => toggleOpenRow(item.date)}
                  size={"icon"}
                  className="size-6"
                  variant={"outline"}
                >
                  {openRow === item.date ? (
                    <LucideChevronDown />
                  ) : (
                    <LucideChevronRight />
                  )}
                </Button>
              </TableCell>
              <TableCell className="font-medium whitespace-nowrap">
                {item.date}
              </TableCell>
              <TableCell>{item.works.length}</TableCell>
              <TableCell className="text-right">
                {formatDuration(item.duration)}
              </TableCell>
            </TableRow>
            {item.works.length > 0 && openRow === item.date && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4}>
                  <ChildTable data={item.works} />
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-medium">
            Total Hours:
          </TableCell>
          <TableCell className="text-right">
            {formatDuration(
              modifiedData.reduce((acc, item) => acc + item.duration, 0)
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableSection;
