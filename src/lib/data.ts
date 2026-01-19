import type { User, Appointment, Doctor, UserRole } from './types';

export const users: Record<UserRole, User> = {
  patient: {
    id: 'user-patient-01',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'patient',
    avatarUrl: 'https://picsum.photos/seed/patient1/100/100',
  },
  doctor: {
    id: 'user-doctor-01',
    name: 'Dr. Anya Sharma',
    email: 'anya.sharma@clinic.com',
    role: 'doctor',
    avatarUrl: 'https://picsum.photos/seed/doctor1/100/100',
  },
  admin: {
    id: 'user-admin-01',
    name: 'Admin User',
    email: 'admin@medisummarizer.com',
    role: 'admin',
    avatarUrl: 'https://picsum.photos/seed/admin1/100/100',
  },
};

export const appointments: Appointment[] = [
  {
    id: 'appt-001',
    patient: { name: 'Jane Doe', id: 'user-patient-01' },
    doctor: { name: 'Dr. Anya Sharma', id: 'user-doctor-01', specialization: 'Cardiologist' },
    date: '2024-08-15',
    time: '10:00 AM',
    status: 'upcoming',
  },
  {
    id: 'appt-002',
    patient: { name: 'John Smith', id: 'user-patient-02' },
    doctor: { name: 'Dr. Anya Sharma', id: 'user-doctor-01', specialization: 'Cardiologist' },
    date: '2024-08-16',
    time: '11:30 AM',
    status: 'pending',
  },
  {
    id: 'appt-003',
    patient: { name: 'Jane Doe', id: 'user-patient-01' },
    doctor: { name: 'Dr. Ben Carter', id: 'user-doctor-02', specialization: 'Dermatologist' },
    date: '2024-07-20',
    time: '02:00 PM',
    status: 'completed',
  },
  {
    id: 'appt-004',
    patient: { name: 'Emily White', id: 'user-patient-03' },
    doctor: { name: 'Dr. Anya Sharma', id: 'user-doctor-01', specialization: 'Cardiologist' },
    date: '2024-08-20',
    time: '09:00 AM',
    status: 'upcoming',
  },
    {
    id: 'appt-005',
    patient: { name: 'Jane Doe', id: 'user-patient-01' },
    doctor: { name: 'Dr. Leo Martinez', id: 'user-doctor-03', specialization: 'Neurologist' },
    date: '2024-06-10',
    time: '03:30 PM',
    status: 'cancelled',
  },
];

export const doctorsForVerification: Doctor[] = [
  {
    id: 'doc-verify-01',
    name: 'Dr. Kenji Tanaka',
    email: 'kenji.tanaka@newdocs.com',
    role: 'doctor',
    avatarUrl: 'https://picsum.photos/seed/doc1/100/100',
    specialization: 'Pediatrician',
    verificationStatus: 'pending',
  },
  {
    id: 'doc-verify-02',
    name: 'Dr. Sofia Rossi',
    email: 'sofia.rossi@newdocs.com',
    role: 'doctor',
    avatarUrl: 'https://picsum.photos/seed/doc2/100/100',
    specialization: 'Oncologist',
    verificationStatus: 'pending',
  },
];
