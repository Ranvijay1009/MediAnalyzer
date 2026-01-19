'use client';
import { ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

let firebaseInstance: ReturnType<typeof initializeFirebase>;

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  if (typeof window !== 'undefined' && !firebaseInstance) {
    firebaseInstance = initializeFirebase();
  }

  return <FirebaseProvider value={firebaseInstance}>{children}</FirebaseProvider>;
}
