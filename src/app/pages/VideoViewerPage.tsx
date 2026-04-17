import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Eye } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';

export function VideoViewerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('id');
  const [isWatched, setIsWatched] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);

  // Mock video data - replace with Supabase call
  const video = {
    id: videoId,
    title: 'الدرس الأول - المقدمة',
    description: 'شرح تفصيلي للدرس الأول',
    youtube_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 3600, // seconds
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

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Mark as viewed after 80% watch time
    const timer = setTimeout(() => {
      setIsWatched(true);
      setWatchProgress(100);
      // TODO: Update database with view status
    }, video.duration * 0.8 * 1000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [video.duration]);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setWatchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, (video.duration * 10) / 100);

    return () => clearInterval(progressInterval);
  }, [video.duration]);

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
              <p className="text-amber-100 text-sm">{video.package_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg">
            <Eye className="w-5 h-5 text-white" />
            <span className="text-white font-medium">{watchProgress}%</span>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="max-w-7xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-black rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Watermark */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <div className="bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-white font-bold text-lg">محمود الديب</p>
              <p className="text-amber-400 text-xs">منصة البارع التعليمية</p>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`${video.youtube_url}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&disablekb=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              style={{ pointerEvents: 'auto' }}
            />
          </div>

          {/* Protection Overlay (invisible but prevents download) */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
        </motion.div>

        {/* Video Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-gray-900 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-2">{video.title}</h2>
          <p className="text-gray-400 mb-4">{video.description}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-lg">
              <Lock className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">محمي من التحميل</span>
            </div>
            {isWatched && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">تمت المشاهدة</span>
              </div>
            )}
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
            ⚠️ تحذير: محتوى هذا الفيديو محمي بحقوق الملكية. أي محاولة للتسجيل أو التحميل غير مصرح بها.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
