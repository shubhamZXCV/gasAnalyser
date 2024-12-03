import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function GasTable(props) {
  return (
    <Table>
      {/* <TableCaption>sensor readings ...</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Gas</TableHead>
          <TableHead>PPM</TableHead>
          <TableHead>Resistance</TableHead>
          <TableHead className="">Power</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">CO</TableCell>
          <TableCell>{props.co}</TableCell>
          <TableCell>{props.mq7}</TableCell>
          <TableCell className="">0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">LPG</TableCell>
          <TableCell>{props.lpg}</TableCell>
          <TableCell>1{props.mq9}</TableCell>
          <TableCell className="">0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">H2S</TableCell>
          <TableCell>{props.h2s}</TableCell>
          <TableCell>{props.mq136}</TableCell>
          <TableCell className="">0</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
