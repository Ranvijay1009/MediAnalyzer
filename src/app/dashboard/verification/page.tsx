import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { doctorsForVerification } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function VerificationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Verification</CardTitle>
        <CardDescription>
          Approve or reject new doctors waiting for verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorsForVerification.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                       <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                       <AvatarFallback>{doctor.name.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{doctor.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {doctor.specialization}
                </TableCell>
                 <TableCell className="hidden md:table-cell">
                  {doctor.email}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm">Approve</Button>
                    <Button variant="destructive" size="sm">Reject</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
