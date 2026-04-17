import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Wallet, MessageCircle, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

export function WalletChargePage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const num = parseFloat(value) || 0;
    // الرصيد المطلوب تحويله = الرصيد المطلوب + 5% مصاريف إدارية
    const total = num + (num * 0.05);
    setCalculatedAmount(total);
  };

  const openWhatsApp = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const message = `السلام عليكم،\nأريد شحن محفظتي بمبلغ ${amount} جنيه\nالاسم: ${user.first_name} ${user.last_name}\nرقم الهاتف المسجل: ${user.phone}`;
    const whatsappUrl = `https://wa.me/201022368940?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" dir="rtl">
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
                className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <BookOpen className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  البارع محمود الديب
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">شحن المحفظة الإلكترونية</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <span className="font-semibold">العودة</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Wallet className="w-6 h-6" />
                شحن رصيد المحفظة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Instructions */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">خطوات شحن المحفظة:</h3>
                <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <span>احسب المبلغ المطلوب تحويله باستخدام الحاسبة أدناه</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <span>حول الرصيد إلى أحد الأرقام التالية: <strong>01022368940</strong> أو <strong>+201023958772</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <span>أرسل على واتساب: صورة التحويل + الرقم المحول منه + الاسم الأكاديمي + رقم هاتفك المسجل</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                    <span>سيتم شحن محفظتك خلال 24 ساعة من التحويل</span>
                  </li>
                </ol>
              </div>

              {/* Payment Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 text-center"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">رقم المحفظة الأول</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400 font-mono" dir="ltr">01022368940</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 text-center"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">رقم المحفظة الثاني</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400 font-mono" dir="ltr">+201023958772</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Calculator className="w-6 h-6" />
                حاسبة الرصيد
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input: Desired Amount */}
                <div className="space-y-2">
                  <Label htmlFor="desired-amount" className="text-lg font-semibold">
                    الرصيد المطلوب في المحفظة
                  </Label>
                  <Input
                    id="desired-amount"
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="text-xl h-14 text-center font-bold border-2 focus:border-purple-500"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">جنيه مصري</p>
                </div>

                {/* Output: Amount to Transfer */}
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">
                    المبلغ المطلوب تحويله
                  </Label>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-4 h-14 flex items-center justify-center">
                    <p className="text-xl font-bold text-purple-700 dark:text-purple-400">
                      {calculatedAmount.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">جنيه مصري (شامل 5% مصاريف إدارية)</p>
                </div>
              </div>

              {/* Formula Explanation */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
                  <strong>ملاحظة:</strong> جملة الرصيد المحول = الرصيد المطلوب + 5% مصاريف إدارية
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={openWhatsApp}
            disabled={!amount || parseFloat(amount) <= 0}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-6 text-xl rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all"
          >
            <MessageCircle className="w-6 h-6 ml-3" />
            تواصل عبر واتساب
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            سيتم فتح محادثة واتساب مع بيانات التحويل تلقائياً
          </p>
        </motion.div>
      </div>
    </div>
  );
}

