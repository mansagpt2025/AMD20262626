import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bell, Wallet, Menu, BookOpen, GraduationCap, Gift, Award, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from '../components/Footer';

export function StudentDashboard() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [notifications, setNotifications] = useState<number>(3);
  const [stats, setStats] = useState({
    homeworkAverage: 0,
    lessonAverage: 0,
    completedLessons: 0,
    totalLessons: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWalletBalance((prev) => prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { label: 'الكورسات', path: '/dashboard/courses', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'كورساتي', path: '/dashboard/my-courses', icon: <GraduationCap className="w-5 h-5" /> },
    { label: 'الحصص المجانية', path: '/dashboard/free', icon: <Gift className="w-5 h-5" /> },
    { label: 'الشوامل', path: '/dashboard/shamel', icon: <Award className="w-5 h-5" /> },
    { label: 'الامتحانات السابقة', path: '/dashboard/previous-exams', icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                م
              </div>
              <div className="text-right hidden sm:block">
                <div className="font-bold text-lg text-gray-900 dark:text-white">البارع محمود الديب</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/dashboard/notifications"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:shadow-lg transition-all"
                >
                  <span className="hidden sm:inline">أهلاً يا {user?.name?.split(' ')[0] || 'الطالب'}</span>
                  <Menu className="w-5 h-5" />
                </button>

                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      حسابي
                    </Link>
                    <Link
                      to="/technical-support"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الدعم الفني
                    </Link>
                    <Link
                      to="/academic-support"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الدعم العلمي
                    </Link>
                    <Link
                      to="/contact"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      تواصل معنا
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-right px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      تسجيل الخروج
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-1 bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 mb-8 text-white shadow-2xl"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-right">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  أهلاً يا {user?.name?.split(' ')[0] || 'الطالب'}
                </h1>
                <p className="text-white/90">
                  {notifications > 0 ? `لديك ${notifications} إشعار جديد` : 'لا توجد إشعارات جديدة'}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-6 h-6" />
                    <span className="text-lg">الرصيد</span>
                  </div>
                  <p className="text-3xl font-bold">{walletBalance} جنيه</p>
                </div>

                <Link
                  to="/dashboard/recharge"
                  className="px-6 py-3 bg-white text-amber-600 font-bold rounded-full hover:shadow-lg transition-all"
                >
                  شحن الرصيد
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - stats.homeworkAverage / 100)}`}
                      className="text-blue-500 transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.homeworkAverage}%
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  متوسط درجات الواجب
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - stats.lessonAverage / 100)}`}
                      className="text-green-500 transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.lessonAverage}%
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  متوسط درجات الحصة
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - (stats.totalLessons > 0 ? stats.completedLessons / stats.totalLessons : 0))}`}
                      className="text-amber-500 transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.completedLessons}/{stats.totalLessons}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  عدد الحصص المكتملة
                </h3>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              القائمة الرئيسية
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {menuItems.map((item, index) => (
                <Link key={index} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl hover:shadow-xl transition-all text-center"
                  >
                    <div className="flex justify-center mb-3 text-amber-600 dark:text-amber-400">
                      {item.icon}
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">{item.label}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">آخر الحصص</h2>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                لا توجد حصص متاحة حالياً
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                قم بشراء الكورسات لمشاهدة الحصص
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

