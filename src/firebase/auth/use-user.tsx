'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        id: `mock-id-${parsedUser.email}`,
        uid: `mock-uid-${parsedUser.email}`,
        name: parsedUser.name,
        email: parsedUser.email,
        role: parsedUser.role,
        avatarUrl: parsedUser.avatarUrl || `https://picsum.photos/seed/${parsedUser.email}/100/100`,
      });
    }
    setLoading(false);
  }, []);

  return { user, loading };
}
