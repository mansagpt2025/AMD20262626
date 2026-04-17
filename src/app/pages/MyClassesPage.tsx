import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Calendar, Layers, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

interface Package {
  id: string;
  name: string;
  description: string;
  weeks: number;
  image?: string;
  updatedAt: string;
  purchasedAt: string;
}

export function MyClassesPage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyPackages();
  }, []);

  const loadMyPackages = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-85537280/my-packages/${user.phone}`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );

      const data = await response.json();
      if (data.success) {
        setPackages(data.packages);
      } else {
        toast.error('حدث خطأ أثناء تحميل الدورات');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading my packages:', error);
      toast.error('حدث خطأ أثناء تحميل الدورات');
      setLoading(false);
    }
  };

  const tips = [
    'ابدأ دائماً بمشاهدة الفيديو قبل حل الواجب',
    'راجع ملفات PDF بعناية لفهم النقاط المهمة',
    'حل الامتحانات في وقتها المحدد للحصول على أفضل النتائج'
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري تحميل دوراتك...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" dir="rtl">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <BookOpen className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  البارع محمود الديب
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">كمل اللي ناقصك</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <span className="font-semibold">العودة</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-2xl border-2 border-yellow-200 dark:border-yellow-800 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">نصائح للطالب</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3 bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Packages Grid */}
        {packages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              لم تشترك في أي دورات بعد
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              ابدأ رحلتك التعليمية الآن واشترك في الدورات المتاحة
            </p>
            <Button
              onClick={() => navigate('/classes')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
            >
              استعرض الدورات المتاحة
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden hover:shadow-2xl transition-all">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative">
                    {pkg.image ? (
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-20 h-20 text-white/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <Badge className="bg-white/90 text-gray-900 px-3 py-1">
                        <Layers className="w-3 h-3 ml-1" />
                        {pkg.weeks} أسبوع
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-1">{pkg.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>آخر تحديث: {new Date(pkg.updatedAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      onClick={() => navigate(`/package/${pkg.id}`)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg rounded-xl shadow-lg"
                    >
                      <BookOpen className="w-5 h-5 ml-2" />
                      ابدأ التعلم الآن
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

