import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Facebook, Youtube, Instagram, Send, MessageCircle, ArrowRight } from 'lucide-react';

export function ContactPage() {
  const socialLinks = [
    {
      name: 'فيسبوك',
      icon: <Facebook className="w-8 h-8" />,
      url: 'https://facebook.com/mahmoudeldeeb',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800',
    },
    {
      name: 'يوتيوب',
      icon: <Youtube className="w-8 h-8" />,
      url: 'https://youtube.com/@mahmoudeldeeb',
      color: 'from-red-600 to-red-700',
      hoverColor: 'hover:from-red-700 hover:to-red-800',
    },
    {
      name: 'إنستجرام',
      icon: <Instagram className="w-8 h-8" />,
      url: 'https://instagram.com/mahmoudeldeeb',
      color: 'from-pink-600 to-purple-600',
      hoverColor: 'hover:from-pink-700 hover:to-purple-700',
    },
    {
      name: 'قناة تليجرام',
      icon: <Send className="w-8 h-8" />,
      url: 'https://t.me/mahmoudeldeeb',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    },
    {
      name: 'قناة واتساب',
      icon: <MessageCircle className="w-8 h-8" />,
      url: 'https://whatsapp.com/channel/mahmoudeldeeb',
      color: 'from-green-600 to-green-700',
      hoverColor: 'hover:from-green-700 hover:to-green-800',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="min-h-screen flex flex-col">
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  م
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-gray-900 dark:text-white">البارع محمود الديب</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">سلسلة البارع</div>
                </div>
              </Link>

              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:shadow-lg transition-all"
              >
                <span>العودة</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-5xl shadow-2xl">
                  م
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  البارع محمود الديب
                </h1>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                تواصل معنا
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                عبر منصات التواصل الاجتماعي الرئيسية
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-500">
                اختر المنصة المفضلة لديك للتواصل معنا
              </p>
            </div>

            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-64 opacity-20">
                  <img
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop"
                    alt="التواصل الاجتماعي"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-r ${link.color} ${link.hoverColor} text-white p-8 rounded-2xl shadow-xl transition-all`}
                    >
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 bg-white/20 rounded-full">
                          {link.icon}
                        </div>
                        <span className="text-2xl font-bold">{link.name}</span>
                        <span className="text-sm opacity-90">اضغط للتواصل</span>
                      </div>
                    </motion.div>
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  نحن هنا لخدمتك دائماً
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  تابعنا على جميع المنصات لتبقى على اطلاع بكل جديد
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
