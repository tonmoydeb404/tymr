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

type Props = { data: WorkTime[] };

const ChildTable = (props: Props) => {
  const { data } = props;
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((work) => (
          <TableRow key={work._id}>
            <TableCell>{work.title || "Untitled"}</TableCell>
            <TableCell>
              {format(work.startTime, "hh:mm aaa")} -{" "}
              {work.endTime ? format(work.endTime, "hh:mm aaa") : "00"}
            </TableCell>
            <TableCell className="text-right">
              {formatDuration(work.duration)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ChildTable;
