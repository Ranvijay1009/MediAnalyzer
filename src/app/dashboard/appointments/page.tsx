'use client';
import { useUser } from '@/firebase';
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
import { appointments } from "@/lib/data";
import type { Appointment } from "@/lib/types";

const statusColors: Record<Appointment['status'], string> = {
  upcoming: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export default function AppointmentsPage() {
  const { user, loading } = useUser();
  
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const { role } = user;
  
  const pageTitle = role === 'patient' ? "My Appointments" : "Manage Appointments";
  const pageDescription = role === 'patient' 
    ? "View your past and upcoming appointments." 
    : "Review and manage appointment requests from patients.";

  const filteredAppointments = role === 'patient' 
    ? appointments.filter(a => a.patient.id === 'user-patient-01') // This should be updated to use the logged in user's ID
    : appointments;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
            <CardTitle>{pageTitle}</CardTitle>
            <CardDescription>{pageDescription}</CardDescription>
        </div>
        {role === 'patient' && (
             <Button>Book New Appointment</Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{role === 'patient' ? 'Doctor' : 'Patient'}</TableHead>
              {role === 'patient' && <TableHead className="hidden md:table-cell">Specialization</TableHead>}
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="font-medium">{role === 'patient' ? appointment.doctor.name : appointment.patient.name}</div>
                </TableCell>
                {role === 'patient' && <TableCell className="hidden md:table-cell">{appointment.doctor.specialization}</TableCell>}
                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`capitalize ${statusColors[appointment.status]}`}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {role === 'doctor' && appointment.status === 'pending' ? (
                      <div className="flex gap-2">
                          <Button variant="outline" size="sm">Approve</Button>
                          <Button variant="ghost" size="sm">Decline</Button>
                      </div>
                  ) : (
                    <Button aria-haspopup="true" size="sm" variant="ghost">
                        ...
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
