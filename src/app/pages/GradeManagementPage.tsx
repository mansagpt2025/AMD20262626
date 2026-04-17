import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Edit, Trash2, Search, Package, Calendar, FileText, Gift, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  type: 'monthly' | 'weekly' | '3-months' | 'special';
  drive_link: string;
  created_at: string;
}

interface Week {
  id: number;
  name: string;
  description: string;
  package_ids: number[];
  created_at: string;
}

interface Content {
  id: number;
  name: string;
  description: string;
  type: 'video_lecture' | 'video_homework' | 'pdf_homework' | 'mcq_homework' | 'mcq_exam';
  week_ids: number[];
  youtube_link?: string;
  drive_link?: string;
  questions?: any[];
  created_at: string;
}

interface GradeManagementPageProps {
  grade: '1' | '2' | '3';
}

export function GradeManagementPage({ grade }: GradeManagementPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'packages' | 'weeks' | 'content' | 'free' | 'comprehensive'>('packages');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with Supabase calls
  const [packages, setPackages] = useState<Package[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [content, setContent] = useState<Content[]>([]);

  const gradeNames = {
    '1': 'الأول',
    '2': 'الثاني',
    '3': 'الثالث',
  };

  const tabs = [
    { id: 'packages', label: 'الباقات', icon: <Package className="w-5 h-5" /> },
    { id: 'weeks', label: 'الأسابيع', icon: <Calendar className="w-5 h-5" /> },
    { id: 'content', label: 'المحتوى', icon: <FileText className="w-5 h-5" /> },
    { id: 'free', label: 'المحاضرات المجانية', icon: <Gift className="w-5 h-5" /> },
    { id: 'comprehensive', label: 'الشوامل', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/anas/eldeeb/200/9')}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  إدارة الصف {gradeNames[grade]} الثانوي
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  إدارة شاملة للباقات والأسابيع والمحتوى التعليمي
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right"
            />
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'packages' && (
            <PackagesTab packages={packages} setPackages={setPackages} grade={grade} />
          )}
          {activeTab === 'weeks' && (
            <WeeksTab weeks={weeks} setWeeks={setWeeks} packages={packages} grade={grade} />
          )}
          {activeTab === 'content' && (
            <ContentTab content={content} setContent={setContent} weeks={weeks} grade={grade} />
          )}
          {activeTab === 'free' && (
            <FreeClassesTab grade={grade} />
          )}
          {activeTab === 'comprehensive' && (
            <ComprehensiveTab grade={grade} />
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

// Packages Tab Component
function PackagesTab({ packages, setPackages, grade }: any) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    discount_price: 0,
    type: 'monthly' as const,
    drive_link: '',
  });

  const handleCreate = () => {
    const newPackage = {
      id: 5000 + packages.length,
      ...formData,
      created_at: new Date().toISOString(),
    };
    setPackages([...packages, newPackage]);
    setIsCreating(false);
    setFormData({
      name: '',
      description: '',
      price: 0,
      discount_price: 0,
      type: 'monthly',
      drive_link: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الباقات</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          إنشاء باقة جديدة
        </button>
      </div>

      {isCreating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">باقة جديدة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم الباقة"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
            >
              <option value="monthly">شهرية</option>
              <option value="weekly">أسبوعية</option>
              <option value="3-months">3 شهور</option>
              <option value="special">عرض خاص</option>
            </select>
            <input
              type="number"
              placeholder="السعر"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
            />
            <input
              type="number"
              placeholder="السعر بعد الخصم (اختياري)"
              value={formData.discount_price}
              onChange={(e) => setFormData({ ...formData, discount_price: Number(e.target.value) })}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
            />
            <input
              type="text"
              placeholder="رابط Google Drive"
              value={formData.drive_link}
              onChange={(e) => setFormData({ ...formData, drive_link: e.target.value })}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right md:col-span-2"
            />
            <textarea
              placeholder="الوصف"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right md:col-span-2"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCreate}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              حفظ
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="flex-1 px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              إلغاء
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg: Package) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium">
                #{pkg.id}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{pkg.description}</p>
            <div className="flex items-center gap-2 mb-2">
              {pkg.discount_price ? (
                <>
                  <span className="text-2xl font-bold text-green-600">{pkg.discount_price} جنيه</span>
                  <span className="text-lg text-gray-400 line-through">{pkg.price} جنيه</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-amber-600">{pkg.price} جنيه</span>
              )}
            </div>
            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
              {pkg.type === 'monthly' ? 'شهرية' : pkg.type === 'weekly' ? 'أسبوعية' : pkg.type === '3-months' ? '3 شهور' : 'عرض خاص'}
            </span>
          </motion.div>
        ))}
      </div>

      {packages.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">لا توجد باقات حالياً</p>
        </div>
      )}
    </div>
  );
}

// Weeks Tab Component
function WeeksTab({ weeks, setWeeks, packages, grade }: any) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    package_ids: [] as number[],
  });

  const handleCreate = () => {
    const newWeek = {
      id: weeks.length + 1,
      ...formData,
      created_at: new Date().toISOString(),
    };
    setWeeks([...weeks, newWeek]);
    setIsCreating(false);
    setFormData({ name: '', description: '', package_ids: [] });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الأسابيع</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          إنشاء أسبوع جديد
        </button>
      </div>

      {isCreating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">أسبوع جديد</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="اسم الأسبوع"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
            />
            <textarea
              placeholder="الوصف"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
            />
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 text-right">اختر الباقات</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {packages.map((pkg: Package) => (
                  <label key={pkg.id} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.package_ids.includes(pkg.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, package_ids: [...formData.package_ids, pkg.id] });
                        } else {
                          setFormData({ ...formData, package_ids: formData.package_ids.filter(id => id !== pkg.id) });
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900 dark:text-white">{pkg.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCreate}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              حفظ
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="flex-1 px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              إلغاء
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weeks.map((week: Week) => (
          <motion.div
            key={week.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                #{week.id}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{week.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{week.description}</p>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Package className="w-4 h-4" />
              <span className="text-sm">{week.package_ids.length} باقة</span>
            </div>
          </motion.div>
        ))}
      </div>

      {weeks.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">لا توجد أسابيع حالياً</p>
        </div>
      )}
    </div>
  );
}

// Content Tab Component
function ContentTab({ content, setContent, weeks, grade }: any) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'video_lecture' as const,
    week_ids: [] as number[],
    youtube_link: '',
    drive_link: '',
  });

  const handleCreate = () => {
    const newContent = {
      id: 100 + content.length,
      ...formData,
      created_at: new Date().toISOString(),
    };
    setContent([...content, newContent]);
    setIsCreating(false);
    setFormData({
      name: '',
      description: '',
      type: 'video_lecture',
      week_ids: [],
      youtube_link: '',
      drive_link: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">المحتوى</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          إضافة محتوى جديد
        </button>
      </div>

      {isCreating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">محتوى جديد</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم المحتوى"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
            >
              <option value="video_lecture">فيديو شرح</option>
              <option value="video_homework">فيديو واجب</option>
              <option value="pdf_homework">PDF واجب</option>
              <option value="mcq_homework">واجب MCQ</option>
              <option value="mcq_exam">امتحان MCQ</option>
            </select>
            {(formData.type === 'video_lecture' || formData.type === 'video_homework') && (
              <input
                type="text"
                placeholder="رابط YouTube"
                value={formData.youtube_link}
                onChange={(e) => setFormData({ ...formData, youtube_link: e.target.value })}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right md:col-span-2"
              />
            )}
            {formData.type === 'pdf_homework' && (
              <input
                type="text"
                placeholder="رابط Google Drive للـ PDF"
                value={formData.drive_link}
                onChange={(e) => setFormData({ ...formData, drive_link: e.target.value })}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right md:col-span-2"
              />
            )}
            <textarea
              placeholder="الوصف"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right md:col-span-2"
            />
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 text-right">اختر الأسابيع</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                {weeks.map((week: Week) => (
                  <label key={week.id} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.week_ids.includes(week.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, week_ids: [...formData.week_ids, week.id] });
                        } else {
                          setFormData({ ...formData, week_ids: formData.week_ids.filter(id => id !== week.id) });
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900 dark:text-white text-sm">{week.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCreate}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              حفظ
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="flex-1 px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              إلغاء
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item: Content) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                #{item.id}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs">
                {item.type === 'video_lecture' ? 'فيديو شرح' :
                 item.type === 'video_homework' ? 'فيديو واجب' :
                 item.type === 'pdf_homework' ? 'PDF واجب' :
                 item.type === 'mcq_homework' ? 'واجب MCQ' : 'امتحان MCQ'}
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs">
                {item.week_ids.length} أسبوع
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {content.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">لا يوجد محتوى حالياً</p>
        </div>
      )}
    </div>
  );
}

// Free Classes Tab Component
function FreeClassesTab({ grade }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="text-center">
        <Gift className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">المحاضرات المجانية</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          إنشاء وإدارة المحاضرات المجانية المتاحة للجميع
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
          <Plus className="w-5 h-5 inline-block ml-2" />
          إضافة محاضرة مجانية
        </button>
      </div>
    </div>
  );
}

// Comprehensive Tab Component
function ComprehensiveTab({ grade }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="text-center">
        <Award className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">الامتحانات الشاملة</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          إنشاء وإدارة الامتحانات الشاملة مع فيديوهات الحل
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
          <Plus className="w-5 h-5 inline-block ml-2" />
          إضافة امتحان شامل
        </button>
      </div>
    </div>
  );
}
