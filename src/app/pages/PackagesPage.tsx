import { useState, useEffect, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, ShoppingCart, Check, Tag, Calendar, Package } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  grade: string;
  category: 'offer' | 'monthly' | 'weekly' | 'three-months';
  weeks: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export function PackagesPage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [userPackages, setUserPackages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'code'>('wallet');
  const [code, setCode] = useState('');
  const [wallet, setWallet] = useState(0);
  const [userGrade, setUserGrade] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserGrade(user.grade || '');
      setWallet(user.wallet || 0);

      // Load all packages
      const packagesRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/packages`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const packagesData = await packagesRes.json();
      if (packagesData.success) {
setPackages(Array.isArray(packagesData.packages) ? packagesData.packages : []);
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
      console.error('Error loading packages:', error);
      toast.error('حدث خطأ أثناء تحميل الباقات');
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    setProcessing(true);
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
            packageId: selectedPackage.id,
            paymentMethod,
            code: paymentMethod === 'code' ? code : undefined
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setPurchaseDialogOpen(false);
        setCode('');
        loadData();
        // Navigate to package content
        navigate(`/package/${selectedPackage.id}`);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error purchasing package:', error);
      toast.error('حدث خطأ أثناء عملية الشراء');
    } finally {
      setProcessing(false);
    }
  };

  const filterPackagesByCategory = (category: string) => {
    return packages.filter(pkg => pkg.category === category);
  };

  const isSubscribed = (packageId: string) => {
    return userPackages.includes(packageId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري تحميل الباقات...</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">ابدأ الآن طريقك إلى التفوق</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="offer" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-md">
            <TabsTrigger value="offer" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg">
              <Tag className="w-4 h-4 ml-2" />
              العروض
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">
              شهرية
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg">
              أسبوعية
            </TabsTrigger>
            <TabsTrigger value="three-months" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg">
              3 شهور
            </TabsTrigger>
          </TabsList>

          {['offer', 'monthly', 'weekly', 'three-months'].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterPackagesByCategory(category).length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد باقات في هذا القسم</p>
                  </div>
                ) : (
                  filterPackagesByCategory(category).map((pkg, index) => (
                    <PackageCard
                      key={pkg.id}
                      package={pkg}
                      index={index}
                      isSubscribed={isSubscribed(pkg.id)}
                      onPurchase={() => {
                        setSelectedPackage(pkg);
                        setPurchaseDialogOpen(true);
                      }}
                      onView={() => navigate(`/package/${pkg.id}`)}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Purchase Dialog */}
      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              شراء الباقة
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl">
              <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedPackage?.name}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{selectedPackage?.price} جنيه</p>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">اختر وسيلة الدفع</Label>
              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="flex items-center space-x-2 space-x-reverse p-4 border-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span>المحفظة الإلكترونية</span>
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">
                        الرصيد: {wallet} جنيه
                      </Badge>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse p-4 border-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <RadioGroupItem value="code" id="code" />
                  <Label htmlFor="code" className="flex-1 cursor-pointer">
                    كود الشراء المباشر
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'code' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Label htmlFor="purchase-code">أدخل كود الشراء</Label>
                  <Input
                    id="purchase-code"
                    placeholder="XXXX-XXXX-XXXX"
                    value={code}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    className="mt-2"
                  />
                </motion.div>
              )}

              {paymentMethod === 'wallet' && wallet < (selectedPackage?.price || 0) && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    رصيد المحفظة غير كافي. يرجى شحن المحفظة أولاً.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handlePurchase}
                disabled={processing || (paymentMethod === 'wallet' && wallet < (selectedPackage?.price || 0)) || (paymentMethod === 'code' && !code)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {processing ? 'جاري الشراء...' : 'تأكيد الشراء'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setPurchaseDialogOpen(false)}
                disabled={processing}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PackageCard({ 
  package: pkg, 
  index, 
  isSubscribed, 
  onPurchase, 
  onView 
}: { 
  package: Package;
  index: number;
  isSubscribed: boolean;
  onPurchase: () => void;
  onView: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Card className="h-full shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative">
          {pkg.image ? (
            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-white/50" />
            </div>
          )}
          {pkg.category === 'offer' && (
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 text-sm">
              <Tag className="w-3 h-3 ml-1" />
              عرض خاص
            </Badge>
          )}
          {isSubscribed && (
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 text-sm">
              <Check className="w-3 h-3 ml-1" />
              مشترك
            </Badge>
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{pkg.name}</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{pkg.description}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600">{pkg.price} جنيه</span>
            <Badge variant="outline">{pkg.weeks} أسبوع</Badge>
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
          {isSubscribed ? (
            <Button onClick={onView} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Check className="w-4 h-4 ml-2" />
              دخول الباقة
            </Button>
          ) : (
            <Button onClick={onPurchase} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <ShoppingCart className="w-4 h-4 ml-2" />
              شراء الباقة
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

