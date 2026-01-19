'use client';
import { ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

// Initialize on module load to create a singleton.
// `initializeFirebase` is idempotent, so this is safe.
const firebaseInstance = initializeFirebase();

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  return <FirebaseProvider value={firebaseInstance}>{children}</FirebaseProvider>;
}
