import { useMemo, useState } from 'react';
import { User } from '../types/api';
import { clearSession, getStoredUser, getToken, saveToken, saveUser } from '../utils/storage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => getStoredUser<User>());
  const isAuthenticated = Boolean(getToken());

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      signIn(token: string, nextUser: User) {
        saveToken(token);
        saveUser(nextUser);
        setUser(nextUser);
      },
      signOut() {
        clearSession();
        setUser(null);
      },
    }),
    [isAuthenticated, user],
  );
}
