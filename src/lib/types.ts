export type UserRole = 'patient' | 'doctor' | 'admin';

export type User = {
  id: string; // Firestore document ID
  uid: string; // Firebase Auth UID
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
};

export type Appointment = {
  id: string;
  patient: Pick<User, 'name' | 'id'>;
  doctor: Pick<User, 'name' | 'id'> & { specialization: string };
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
};

export type Doctor = User & {
  role: 'doctor';
  specialization: string;
  verificationStatus: 'verified' | 'pending';
};
