import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Eye, Download, XCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';

export function PDFViewerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pdfId = searchParams.get('id');
  const [isViewed, setIsViewed] = useState(false);

  // Mock PDF data - replace with Supabase call
  const pdf = {
    id: pdfId,
    title: 'واجب الدرس الأول',
    description: 'حل واجب الدرس الأول',
    drive_url: 'https://drive.google.com/file/d/1SAMPLE_ID/preview',
    package_name: 'الباقة الشهرية - أكتوبر',
  };

  useEffect(() => {
    // Prevent right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevent keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'p')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault();
      }
    };

    // Prevent printing
    const handleBeforePrint = (e: Event) => {
      e.preventDefault();
      alert('الطباعة غير مسموحة!');
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeprint', handleBeforePrint);

    // Mark as viewed after 30 seconds
    const timer = setTimeout(() => {
      setIsViewed(true);
      // TODO: Update database with view status
    }, 30000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeprint', handleBeforePrint);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                البارع محمود الديب
              </h1>
              <p className="text-amber-100 text-sm">{pdf.package_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isViewed && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg">
                <Eye className="w-5 h-5 text-white" />
                <span className="text-white font-medium">تمت المشاهدة</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDF Container */}
      <div className="max-w-7xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-black rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Watermark Overlay */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <div className="bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-white font-bold text-lg">محمود الديب</p>
              <p className="text-amber-400 text-xs">منصة البارع التعليمية</p>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="relative bg-white" style={{ height: 'calc(100vh - 200px)' }}>
            <iframe
              src={`${pdf.drive_url}#toolbar=0&navpanes=0&scrollbar=1`}
              title={pdf.title}
              className="w-full h-full"
              style={{ border: 'none' }}
              sandbox="allow-same-origin allow-scripts"
            />

            {/* Protection Overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              {/* Repeating watermark */}
              <div className="absolute inset-0 flex flex-wrap opacity-10 select-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="text-6xl font-bold text-amber-500 p-8 transform rotate-[-30deg]"
                    style={{ width: '33.33%' }}
                  >
                    محمود الديب
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PDF Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-gray-900 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-2">{pdf.title}</h2>
          <p className="text-gray-400 mb-4">{pdf.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-lg">
              <Lock className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">محمي من التحميل</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">الطباعة غير مسموحة</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-lg">
              <Eye className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">عرض فقط</span>
            </div>
          </div>
        </motion.div>

        {/* Warning Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-red-900/20 border border-red-700 rounded-xl p-4"
        >
          <p className="text-red-400 text-center font-medium">
            ⚠️ تحذير: محتوى هذا الملف محمي بحقوق الملكية. التحميل والطباعة غير مسموح بهما.
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 bg-blue-900/20 border border-blue-700 rounded-xl p-4"
        >
          <h3 className="text-blue-400 font-bold mb-2 text-right">كيفية الاستخدام:</h3>
          <ul className="text-blue-300 space-y-1 text-right list-disc list-inside">
            <li>استخدم الماوس للتمرير عبر الصفحات</li>
            <li>يمكنك التكبير والتصغير باستخدام أدوات العرض</li>
            <li>الملف متاح للعرض فقط داخل المنصة</li>
            <li>سيتم تسجيل مشاهدتك تلقائياً بعد 30 ثانية</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
