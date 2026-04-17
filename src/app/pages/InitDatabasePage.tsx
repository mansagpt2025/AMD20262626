import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function InitDatabasePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/init-db`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'فشلت عملية التهيئة');
      }
    } catch (err) {
      console.error('Init error:', err);
      setError('حدث خطأ أثناء تهيئة قاعدة البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Database className="w-6 h-6" />
              تهيئة قاعدة البيانات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  تمت التهيئة بنجاح!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  تم إنشاء حساب الأدمن بنجاح
                </p>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-right">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>رقم الهاتف:</strong> 614235anas
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>كلمة المرور:</strong> 614235anas
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    سيتم إنشاء حساب الأدمن مع البيانات التالية:
                  </p>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-right">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>الاسم:</strong> محمود الديب
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>البريد:</strong> anasmd2026@outnouty.com
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>رقم الهاتف:</strong> 614235anas
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>كلمة المرور:</strong> 614235anas
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <Button
                  onClick={handleInit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
                >
                  {loading ? 'جاري التهيئة...' : 'تهيئة قاعدة البيانات'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
