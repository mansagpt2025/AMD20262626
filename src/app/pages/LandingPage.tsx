import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Users, Trophy, Calendar, GraduationCap, Target } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/anas/eldeeb/200/9');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'شرح مفصل',
      description: 'شرح مفصل لكل جزء من أجزاء المنهج',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'متابعة مستمرة',
      description: 'متابعة مستمرة مع ولي الأمر',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'امتحانات دورية',
      description: 'امتحانات على كل حصة',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'امتحانات شاملة',
      description: 'امتحان شامل كل شهر مع هدايا قيمة',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'خبرة طويلة',
      description: 'خبرة أكثر من 15 سنة في التدريس',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'نتائج مضمونة',
      description: 'نسبة نجاح 98% في الثانوية العامة',
    },
  ];

  const grades = [
    {
      name: 'الصف الأول الثانوي',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
    },
    {
      name: 'الصف الثاني الثانوي',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
    },
    {
      name: 'الصف الثالث الثانوي',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    },
  ];

  const encouragements = [
    'النجاح ليس نهاية المطاف، الفشل ليس قاتلاً، الشجاعة للاستمرار هي ما يهم',
    'التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم',
    'المستقبل ينتمي لأولئك الذين يؤمنون بجمال أحلامهم',
    'النجاح لا يأتي من ما تفعله أحياناً، بل من ما تفعله دائماً',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNTk1MjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAxNmMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6bTE2LThjMCAyLjIxLTEuNzkgNC00IDRzLTQtMS43OS00LTQgMS43OS00IDQtNCA0IDEuNzkgNCA0em0tMzIgMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-right"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                البارع
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  محمود الديب
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4">
                أستاذ اللغة العربية للثانوية العامة
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                مؤلف سلسلة البارع
              </p>
              <Link
                to="/login"
                className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xl font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all"
              >
                ابدأ الآن
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop"
                    alt="الأستاذ محمود الديب"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 py-4 transform -rotate-2 scale-110 shadow-lg">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap gap-8"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white text-xl font-bold">
              وما توفيقي إلا بالله •
            </span>
          ))}
        </motion.div>
      </div>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl z-10">
              <span className="text-white text-6xl font-bold">©</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 text-center"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16"
          >
            المراحل الدراسية
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {grades.map((grade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/login"
                  className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={grade.image}
                      alt={grade.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                      {grade.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold">البارع محمود الديب</h2>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold shadow-lg">
                ©
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {encouragements.map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              >
                <p className="text-lg">{text}</p>
              </motion.div>
            ))}
          </div>

          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-white text-amber-600 text-xl font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all"
          >
            ابدأ الآن رحلتك نحو التفوق
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full blur-2xl opacity-20"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop"
                    alt="الأستاذ محمود الديب"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-right"
            >
              <div className="flex justify-center lg:justify-end items-center gap-4 mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  البارع محمود الديب
                </h2>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  ©
                </div>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg"
                >
                  <p className="text-3xl font-bold mb-2">+ 1200 حصة</p>
                  <p className="text-lg">في التعليم المصري والتعليم الموازي</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg"
                >
                  <p className="text-3xl font-bold mb-2">+ 5000 طالب</p>
                  <p className="text-lg">حققوا التفوق والنجاح</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg"
                >
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    دي مش مجرد أرقام، دي أدلة أنك في المكان الصح
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

