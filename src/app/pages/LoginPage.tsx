import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

export function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedPhone = localStorage.getItem('rememberedPhone');
    const sessionExpiry = localStorage.getItem('sessionExpiry');

    if (savedPhone && sessionExpiry) {
      const expiryDate = new Date(sessionExpiry);
      const now = new Date();

      if (now < expiryDate) {
        setPhone(savedPhone);
        setRememberMe(true);
      } else {
        localStorage.removeItem('rememberedPhone');
        localStorage.removeItem('sessionExpiry');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ phone, password })
        }
      );

      const data = await response.json();

      if (data.success) {
        const user = data.user;
        
        // Save user to localStorage and context
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        // Handle remember me
        if (rememberMe) {
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          localStorage.setItem('rememberedPhone', phone);
          localStorage.setItem('sessionExpiry', expiryDate.toISOString());
        } else {
          localStorage.removeItem('rememberedPhone');
          localStorage.removeItem('sessionExpiry');
        }

        toast.success('تم تسجيل الدخول بنجاح');

        // Navigate based on role
        const isAdmin = user.role === 'admin';
        navigate(isAdmin ? '/anas/eldeeb/200/9' : '/dashboard');
      } else {
        setError(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('حدث خطأ أثناء تسجيل الدخول');
      toast.error('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-56 bg-gradient-to-r from-amber-500 to-orange-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/50 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop"
                      alt="البارع محمود الديب"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-white">أهلاً بك مرة ثانية</h1>
                  <p className="text-white/90 text-lg mt-1">في منصة البارع محمود الديب</p>
                </motion.div>
              </div>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                    رقم هاتف الطالب
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                      required
                      className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                      placeholder="01234567890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">تذكرني للمرات القادمة</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </button>
              </form>

              <div className="mt-6 space-y-3 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  ليس لديك حساب؟{' '}
                  <Link to="/signup" className="text-amber-600 dark:text-amber-500 font-bold hover:underline">
                    انشئ الآن
                  </Link>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  هل تواجهك مشكلة؟{' '}
                  <Link to="/technical-support" className="text-blue-600 dark:text-blue-500 font-bold hover:underline">
                    تواصل مع الدعم
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
