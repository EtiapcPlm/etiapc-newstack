import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string | null;
    role: 'TEACHER' | 'COORDINATOR' | 'ADMIN';
    authProvider?: 'credentials' | 'google';
    isEmailVerified?: boolean;
  }

  interface Session {
    user: {
      id?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      image?: string | null;
      role: 'TEACHER' | 'COORDINATOR' | 'ADMIN';
      authProvider?: 'credentials' | 'google';
      isEmailVerified?: boolean;
    }
  }
}