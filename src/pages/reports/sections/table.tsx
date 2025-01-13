import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import { LucideChevronDown, LucideChevronRight } from "lucide-react";
import { Fragment, useMemo, useState } from "react";

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
              <TableRow>
                <TableCell colSpan={4}>
                  <Table className="border">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Hours</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.works.map((work) => (
                        <TableRow key={work._id}>
                          <TableCell>{work.title || "Untitled"}</TableCell>
                          <TableCell>
                            {format(work.startTime, "hh:mm aaa")} -{" "}
                            {work.endTime
                              ? format(work.endTime, "hh:mm aaa")
                              : "00"}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatDuration(work.duration)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSection;
