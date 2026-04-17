import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Gift, Check, Calendar, Layers } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

interface FreePackage {
  id: string;
  name: string;
  description: string;
  grade: string;
  weeks: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export function FreeClassesPage() {
  const navigate = useNavigate();
  const [freePackages, setFreePackages] = useState<FreePackage[]>([]);
  const [userPackages, setUserPackages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      // Load all packages and filter free ones
      const packagesRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/packages`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const packagesData = await packagesRes.json();
      if (packagesData.success) {
        // Filter packages that are free (price = 0) and match user's grade
        const freePkgs = packagesData.packages.filter(
          (pkg: any) => pkg.price === 0 && pkg.grade === user.grade
        );
        setFreePackages(freePkgs);
      }

      // Load user's subscribed packages
      const myPackagesRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/my-packages/${user.phone}`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const myPackagesData = await myPackagesRes.json();
      if (myPackagesData.success) {
        setUserPackages(myPackagesData.packages.map((p: any) => p.id));
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading free packages:', error);
      toast.error('حدث خطأ أثناء تحميل الحصص المجانية');
      setLoading(false);
    }
  };

  const handleActivate = async (packageId: string) => {
    setActivating(packageId);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/purchase`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            phone: user.phone,
            packageId,
            paymentMethod: 'free'
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('تم تفعيل الباقة المجانية بنجاح');
        // Navigate to package content
        navigate(`/package/${packageId}`);
      } else {
        toast.error(data.error || 'حدث خطأ أثناء تفعيل الباقة');
      }
    } catch (error) {
      console.error('Error activating free package:', error);
      toast.error('حدث خطأ أثناء تفعيل الباقة');
    } finally {
      setActivating(null);
    }
  };

  const isSubscribed = (packageId: string) => {
    return userPackages.includes(packageId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري تحميل الحصص المجانية...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" dir="rtl">
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
                className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Gift className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  البارع محمود الديب
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">الحصص المجانية</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <span className="font-semibold">العودة</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow-xl mb-8"
        >
          <div className="flex items-center gap-4">
            <Gift className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold mb-1">حصص مجانية لجميع الطلاب</h2>
              <p className="text-green-100">استفد من الحصص المجانية لتجربة المنصة وتطوير مهاراتك</p>
            </div>
          </div>
        </motion.div>

        {/* Packages Grid */}
        {freePackages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              لا توجد حصص مجانية متاحة حالياً
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              تابعنا للحصول على آخر التحديثات حول الحصص المجانية
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freePackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-600 relative">
                    {pkg.image ? (
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-20 h-20 text-white/50" />
                      </div>
                    )}
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-sm shadow-lg">
                      <Gift className="w-3 h-3 ml-1" />
                      مجاني
                    </Badge>
                    {isSubscribed(pkg.id) && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 text-sm shadow-lg">
                        <Check className="w-3 h-3 ml-1" />
                        مفعّل
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{pkg.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 text-lg">
                        مجاني
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {pkg.weeks} أسبوع
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>تم الإنشاء: {new Date(pkg.createdAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>آخر تحديث: {new Date(pkg.updatedAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isSubscribed(pkg.id) ? (
                      <Button
                        onClick={() => navigate(`/package/${pkg.id}`)}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg rounded-xl shadow-lg"
                      >
                        <Check className="w-5 h-5 ml-2" />
                        دخول الحصة
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleActivate(pkg.id)}
                        disabled={activating === pkg.id}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg rounded-xl shadow-lg disabled:opacity-50"
                      >
                        {activating === pkg.id ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                            جاري التفعيل...
                          </>
                        ) : (
                          <>
                            <Gift className="w-5 h-5 ml-2" />
                            تفعيل مجاناً
                          </>
                        )}
                      </Button>
                    )}
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

