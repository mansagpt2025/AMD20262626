import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Bell, Archive, Trash2, Upload, X, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Notification {
  id: number;
  title: string;
  message: string;
  image_url?: string;
  target: 'all' | 'grade_1' | 'grade_2' | 'grade_3';
  type: 'text' | 'popup' | 'banner';
  created_at: string;
  sent_by: string;
  read_count: number;
}

export function NotificationsManagementPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'send' | 'history'>('send');
  const [notificationType, setNotificationType] = useState<'text' | 'popup' | 'banner'>('text');
  const [targetAudience, setTargetAudience] = useState<'all' | 'grade_1' | 'grade_2' | 'grade_3'>('all');
  const [gradeFilter, setGradeFilter] = useState<'all' | 'grade_1' | 'grade_2' | 'grade_3'>('all');

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    image_url: '',
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'ترحيب بالطلاب الجدد',
      message: 'مرحباً بكم في منصة البارع محمود الديب التعليمية',
      target: 'all',
      type: 'popup',
      created_at: '2026-04-15T10:00:00',
      sent_by: 'Admin',
      read_count: 150,
    },
  ]);

  const [showPopupPreview, setShowPopupPreview] = useState(false);

  const handleSendNotification = () => {
    const newNotification: Notification = {
      id: notifications.length + 1,
      ...formData,
      target: targetAudience,
      type: notificationType,
      created_at: new Date().toISOString(),
      sent_by: 'Admin',
      read_count: 0,
    };

    setNotifications([newNotification, ...notifications]);
    setFormData({ title: '', message: '', image_url: '' });
    alert('تم إرسال الإشعار بنجاح!');
  };

  const handleDeleteNotification = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الإشعار؟')) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const filteredNotifications = notifications.filter(n =>
    gradeFilter === 'all' || n.target === gradeFilter || n.target === 'all'
  );

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
                  إدارة الإشعارات
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  إرسال الرسائل والإشعارات للطلاب
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('send')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'send'
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Send className="w-5 h-5" />
              إرسال إشعار
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Archive className="w-5 h-5" />
              سجل الإشعارات
            </button>
          </div>
        </motion.div>

        {/* Send Notification Tab */}
        {activeTab === 'send' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                  نوع الإشعار
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setNotificationType('text')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      notificationType === 'text'
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-pink-300'
                    }`}
                  >
                    <Bell className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                    <p className="font-medium text-gray-900 dark:text-white">رسالة نصية</p>
                  </button>
                  <button
                    onClick={() => setNotificationType('popup')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      notificationType === 'popup'
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-pink-300'
                    }`}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                    <p className="font-medium text-gray-900 dark:text-white">نافذة منبثقة</p>
                  </button>
                  <button
                    onClick={() => setNotificationType('banner')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      notificationType === 'banner'
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-pink-300'
                    }`}
                  >
                    <Archive className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                    <p className="font-medium text-gray-900 dark:text-white">بانر ترحيبي</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                  الجمهور المستهدف
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                >
                  <option value="all">الكل</option>
                  <option value="grade_1">الصف الأول فقط</option>
                  <option value="grade_2">الصف الثاني فقط</option>
                  <option value="grade_3">الصف الثالث فقط</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                  عنوان الإشعار
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: إعلان مهم للطلاب"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                  نص الإشعار
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب نص الرسالة هنا..."
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                />
              </div>

              {(notificationType === 'popup' || notificationType === 'banner') && (
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                    رابط الصورة (اختياري)
                  </label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setShowPopupPreview(true)}
                  className="flex-1 px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  معاينة
                </button>
                <button
                  onClick={handleSendNotification}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  إرسال الإشعار
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value as any)}
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                >
                  <option value="all">جميع الصفوف</option>
                  <option value="grade_1">الصف الأول</option>
                  <option value="grade_2">الصف الثاني</option>
                  <option value="grade_3">الصف الثالث</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          notification.type === 'popup' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' :
                          notification.type === 'banner' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                          'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                        }`}>
                          {notification.type === 'popup' ? 'نافذة منبثقة' :
                           notification.type === 'banner' ? 'بانر' : 'رسالة'}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>📅 {new Date(notification.created_at).toLocaleDateString('ar-EG')}</span>
                        <span>👥 {notification.target === 'all' ? 'الكل' :
                               notification.target === 'grade_1' ? 'الصف الأول' :
                               notification.target === 'grade_2' ? 'الصف الثاني' : 'الصف الثالث'}</span>
                        <span>👁️ {notification.read_count} مشاهدة</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {notification.image_url && (
                    <img
                      src={notification.image_url}
                      alt={notification.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">لا توجد إشعارات</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Popup Preview Modal */}
        {showPopupPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="relative">
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                )}
                <button
                  onClick={() => setShowPopupPreview(false)}
                  className="absolute top-4 left-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all"
                >
                  <X className="w-6 h-6 text-gray-900 dark:text-white" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-right">
                  {formData.title || 'عنوان الإشعار'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-right leading-relaxed">
                  {formData.message || 'نص الرسالة سيظهر هنا...'}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

