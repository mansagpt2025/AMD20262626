import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle, Send } from 'lucide-react';
import { Footer } from '../components/Footer';

export function AcademicSupportPage() {
  const whatsappNumber = '201111111111';
  const telegramUsername = 'academicsupport';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-purple-500 to-pink-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/50 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
                        alt="الدعم العلمي"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">الدعم العلمي</h1>
                    <p className="text-xl text-white/90">أ. فاطمة محمد</p>
                  </motion.div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    طريقة البارع في الدعم
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                    متابعة لحظة بلحظة
                  </p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    ابعتلنا دلوقتي
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <MessageCircle className="w-8 h-8" />
                        <span className="text-2xl font-bold">واتساب</span>
                      </div>
                      <p className="text-center text-green-100">تواصل معنا عبر واتساب</p>
                    </motion.div>
                  </a>

                  <a
                    href={`https://t.me/${telegramUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <Send className="w-8 h-8" />
                        <span className="text-2xl font-bold">تليجرام</span>
                      </div>
                      <p className="text-center text-blue-100">تواصل معنا عبر تليجرام</p>
                    </motion.div>
                  </a>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
                  <p className="text-amber-900 dark:text-amber-300">
                    نعتذر عن أي تأخير في الرد نظراً لضغط الرسائل
                    <br />
                    <span className="font-bold">سيتم الرد عليك في أقرب وقت ممكن</span>
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <Link
                    to="/"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white font-bold rounded-full hover:shadow-lg transition-all"
                  >
                    العودة للصفحة الرئيسية
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

