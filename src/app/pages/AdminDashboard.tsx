import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, BookOpen, Award, Ban, Wallet, Key, Bell, Code } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function AdminDashboard() {
  const adminSections = [
    {
      title: 'طلاب الصف الأول الثانوي',
      icon: <Users className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/1',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    },
    {
      title: 'طلاب الصف الثاني الثانوي',
      icon: <Users className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/2',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
    },
    {
      title: 'طلاب الصف الثالث الثانوي',
      icon: <Users className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/3',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    },
    {
      title: 'الامتحانات الشاملة',
      icon: <Award className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/c',
      color: 'from-amber-500 to-orange-600',
      hoverColor: 'hover:from-amber-600 hover:to-orange-700',
    },
    {
      title: 'حظر المستخدمين',
      icon: <Ban className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/b',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
    },
    {
      title: 'المحفظة',
      icon: <Wallet className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/w',
      color: 'from-teal-500 to-teal-600',
      hoverColor: 'hover:from-teal-600 hover:to-teal-700',
    },
    {
      title: 'كلمات المرور',
      icon: <Key className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/p',
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700',
    },
    {
      title: 'الإشعارات',
      icon: <Bell className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/n',
      color: 'from-pink-500 to-pink-600',
      hoverColor: 'hover:from-pink-600 hover:to-pink-700',
    },
    {
      title: 'الأكواد',
      icon: <Code className="w-12 h-12" />,
      path: '/anas/eldeeb/200/9/cl',
      color: 'from-cyan-500 to-cyan-600',
      hoverColor: 'hover:from-cyan-600 hover:to-cyan-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
              م
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              لوحة تحكم الأدمن
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">إدارة كاملة للمنصة والطلاب</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={section.path}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className={`bg-gradient-to-br ${section.color} ${section.hoverColor} text-white p-8 rounded-2xl shadow-xl transition-all cursor-pointer`}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold">{section.title}</h3>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            إحصائيات سريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</p>
              <p className="text-gray-700 dark:text-gray-300">إجمالي الطلاب</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">0</p>
              <p className="text-gray-700 dark:text-gray-300">الحصص المنشورة</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl">
              <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">0</p>
              <p className="text-gray-700 dark:text-gray-300">الامتحانات النشطة</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">0</p>
              <p className="text-gray-700 dark:text-gray-300">الإشعارات المرسلة</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

