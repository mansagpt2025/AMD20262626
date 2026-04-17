import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, PlayCircle, FileText, CheckSquare, Award, Lock, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

interface ContentItem {
  id: number;
  title: string;
  type: 'video_lecture' | 'video_homework' | 'pdf_homework' | 'mcq_homework' | 'mcq_exam';
  is_completed: boolean;
  is_locked: boolean;
  duration?: string;
}

interface Week {
  id: number;
  title: string;
  description: string;
  content: ContentItem[];
}

export function PackageContentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('id');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  // Mock package data - replace with Supabase call
  const packageData = {
    id: packageId,
    name: 'الباقة الشهرية - أكتوبر 2026',
    description: 'باقة شاملة لشهر أكتوبر تحتوي على جميع الدروس والواجبات',
    grade: 'الصف الأول الثانوي',
    total_weeks: 4,
    completed_content: 12,
    total_content: 20,
    weeks: [
      {
        id: 1,
        title: 'الأسبوع الأول - المقدمة',
        description: 'مقدمة عن المنهج والأساسيات',
        content: [
          {
            id: 101,
            title: 'فيديو شرح - الدرس الأول',
            type: 'video_lecture' as const,
            is_completed: true,
            is_locked: false,
            duration: '45 دقيقة',
          },
          {
            id: 102,
            title: 'PDF واجب - تمارين الدرس الأول',
            type: 'pdf_homework' as const,
            is_completed: true,
            is_locked: false,
          },
          {
            id: 103,
            title: 'اختبار MCQ - الدرس الأول',
            type: 'mcq_homework' as const,
            is_completed: false,
            is_locked: false,
          },
        ],
      },
      {
        id: 2,
        title: 'الأسبوع الثاني - التطبيقات',
        description: 'تطبيقات عملية على الدروس',
        content: [
          {
            id: 201,
            title: 'فيديو شرح - الدرس الثاني',
            type: 'video_lecture' as const,
            is_completed: false,
            is_locked: false,
            duration: '50 دقيقة',
          },
          {
            id: 202,
            title: 'فيديو حل واجب - الدرس الثاني',
            type: 'video_homework' as const,
            is_completed: false,
            is_locked: false,
            duration: '30 دقيقة',
          },
          {
            id: 203,
            title: 'اختبار شامل - الأسبوع الثاني',
            type: 'mcq_exam' as const,
            is_completed: false,
            is_locked: false,
          },
        ],
      },
      {
        id: 3,
        title: 'الأسبوع الثالث - المراجعة',
        description: 'مراجعة شاملة على ما سبق',
        content: [
          {
            id: 301,
            title: 'فيديو شرح - المراجعة العامة',
            type: 'video_lecture' as const,
            is_completed: false,
            is_locked: true,
            duration: '60 دقيقة',
          },
          {
            id: 302,
            title: 'امتحان شامل - المراجعة',
            type: 'mcq_exam' as const,
            is_completed: false,
            is_locked: true,
          },
        ],
      },
    ] as Week[],
  };

  const progress = Math.round((packageData.completed_content / packageData.total_content) * 100);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video_lecture':
      case 'video_homework':
        return <PlayCircle className="w-6 h-6" />;
      case 'pdf_homework':
        return <FileText className="w-6 h-6" />;
      case 'mcq_homework':
        return <CheckSquare className="w-6 h-6" />;
      case 'mcq_exam':
        return <Award className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case 'video_lecture':
        return 'from-blue-500 to-blue-600';
      case 'video_homework':
        return 'from-purple-500 to-purple-600';
      case 'pdf_homework':
        return 'from-green-500 to-green-600';
      case 'mcq_homework':
        return 'from-amber-500 to-orange-600';
      case 'mcq_exam':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getContentLink = (content: ContentItem) => {
    if (content.is_locked) return '#';

    switch (content.type) {
      case 'video_lecture':
      case 'video_homework':
        return `/viewer/video?id=${content.id}`;
      case 'pdf_homework':
        return `/viewer/pdf?id=${content.id}`;
      case 'mcq_homework':
        return `/viewer/mcq?id=${content.id}&type=homework`;
      case 'mcq_exam':
        return `/viewer/mcq?id=${content.id}&type=exam`;
      default:
        return '#';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                  م
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    البارع محمود الديب
                  </h1>
                  <p className="text-amber-100">{packageData.grade}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-3xl">{progress}%</div>
              <div className="text-amber-100 text-sm">مكتمل</div>
            </div>
          </div>

          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Package Info */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {packageData.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {packageData.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
              <p className="text-blue-600 dark:text-blue-400 font-bold text-2xl mb-1">
                {packageData.total_weeks}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">أسبوع</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4">
              <p className="text-green-600 dark:text-green-400 font-bold text-2xl mb-1">
                {packageData.total_content}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">محتوى</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-4">
              <p className="text-amber-600 dark:text-amber-400 font-bold text-2xl mb-1">
                {packageData.completed_content}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">مكتمل</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4">
              <p className="text-purple-600 dark:text-purple-400 font-bold text-2xl mb-1">
                {progress}%
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">النسبة</p>
            </div>
          </div>
        </motion.div>

        {/* Weeks List */}
        <div className="space-y-4">
          {packageData.weeks.map((week, index) => (
            <motion.div
              key={week.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Week Header */}
              <button
                onClick={() => setExpandedWeek(expandedWeek === week.id ? null : week.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <div className="flex items-center gap-4 flex-1 text-right">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {week.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {week.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium">
                    {week.content.length} محتوى
                  </span>
                  <motion.div
                    animate={{ rotate: expandedWeek === week.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Week Content */}
              {expandedWeek === week.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                >
                  <div className="p-6 space-y-3">
                    {week.content.map((content) => (
                      <Link
                        key={content.id}
                        to={getContentLink(content)}
                        onClick={(e) => content.is_locked && e.preventDefault()}
                        className={`block p-4 rounded-xl transition-all ${
                          content.is_locked
                            ? 'bg-gray-200 dark:bg-gray-800 cursor-not-allowed opacity-60'
                            : 'bg-white dark:bg-gray-800 hover:shadow-lg hover:scale-102 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${getContentColor(content.type)} ${
                            content.is_locked ? 'opacity-50' : ''
                          }`}>
                            <div className="text-white">
                              {content.is_locked ? <Lock className="w-6 h-6" /> : getContentIcon(content.type)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                              {content.title}
                            </h4>
                            {content.duration && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                ⏱️ {content.duration}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {content.is_completed && (
                              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                            )}
                            {content.is_locked && (
                              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                                مقفل
                              </span>
                            )}
                            {!content.is_locked && !content.is_completed && (
                              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-medium">
                                متاح
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

