import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  
  export default function DataTable(props){
    return (
        <Table>
  {/* <TableCaption>weather</TableCaption> */}
  {/* <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader> */}
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Temperature</TableCell>
      <TableCell>{props.temp}</TableCell>
    </TableRow>
  </TableBody>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Humidity</TableCell>
      <TableCell>{props.hum}</TableCell>
    </TableRow>
  </TableBody>
</Table>
      
    );
  }