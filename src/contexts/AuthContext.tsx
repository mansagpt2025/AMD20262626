import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  phone: string;
  email?: string;
  role: 'student' | 'admin';
  first_name?: string;
  last_name?: string;
  name?: string;
  grade?: string;
  division?: string;
  governorate?: string;
  city?: string;
  student_phone?: string;
  parent_phone?: string;
  birth_date?: string;
  gender?: string;
  student_code?: number;
  wallet?: number;
  status?: 'active' | 'blocked';
  subscriptions?: any[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signOut = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedPhone');
    localStorage.removeItem('sessionExpiry');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}