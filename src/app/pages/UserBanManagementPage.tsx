import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Ban, Search, Filter, Users, Activity, TrendingUp, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface User {
  id: number;
  name: string;
  phone: string;
  grade: '1' | '2' | '3';
  email?: string;
  status: 'active' | 'blocked';
  last_login: string;
  subscription_count: number;
  activity_score: number;
}

interface ActivityLog {
  user_id: number;
  user_name: string;
  grade: string;
  login_count: number;
  content_completed: number;
  last_activity: string;
  success_rate: number;
  activity_score: number;
}

export function UserBanManagementPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ban' | 'recent' | 'activity'>('ban');
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<'all' | '1' | '2' | '3'>('all');

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'أحمد محمد علي',
      phone: '01012345678',
      grade: '1',
      email: 'ahmed@example.com',
      status: 'active',
      last_login: '2026-04-17T14:30:00',
      subscription_count: 3,
      activity_score: 85,
    },
    {
      id: 2,
      name: 'محمود حسن',
      phone: '01098765432',
      grade: '2',
      status: 'blocked',
      last_login: '2026-04-10T10:00:00',
      subscription_count: 1,
      activity_score: 45,
    },
    {
      id: 3,
      name: 'سارة أحمد',
      phone: '01123456789',
      grade: '3',
      status: 'active',
      last_login: '2026-04-17T15:00:00',
      subscription_count: 5,
      activity_score: 95,
    },
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      user_id: 1,
      user_name: 'أحمد محمد علي',
      grade: 'الأول',
      login_count: 45,
      content_completed: 28,
      last_activity: '2026-04-17T14:30:00',
      success_rate: 87,
      activity_score: 85,
    },
    {
      user_id: 3,
      user_name: 'سارة أحمد',
      grade: 'الثالث',
      login_count: 62,
      content_completed: 45,
      last_activity: '2026-04-17T15:00:00',
      success_rate: 95,
      activity_score: 95,
    },
  ]);

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.includes(searchQuery) || user.phone.includes(searchQuery);
    const matchesGrade = gradeFilter === 'all' || user.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.last_login).getTime() - new Date(a.last_login).getTime())
    .slice(0, 10);

  const topActiveUsers = [...activityLogs]
    .sort((a, b) => b.activity_score - a.activity_score || b.login_count - a.login_count)
    .slice(0, 5);

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
                  إدارة حظر المستخدمين
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  إدارة وصول الطلاب ومراقبة نشاطاتهم
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('ban')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'ban'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Ban className="w-5 h-5" />
              حظر المستخدمين
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'recent'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              آخر المستخدمين
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'activity'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Activity className="w-5 h-5" />
              سجل النشاطات
            </button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث بالاسم أو رقم الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value as any)}
                className="w-full pr-12 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right appearance-none"
              >
                <option value="all">جميع الصفوف</option>
                <option value="1">الصف الأول</option>
                <option value="2">الصف الثاني</option>
                <option value="3">الصف الثالث</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Ban Users Tab */}
        {activeTab === 'ban' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                      }`}>
                        {user.status === 'active' ? 'نشط' : 'محظور'}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs font-medium">
                        الصف {user.grade === '1' ? 'الأول' : user.grade === '2' ? 'الثاني' : 'الثالث'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>📱 {user.phone}</span>
                      {user.email && <span>📧 {user.email}</span>}
                      <span>📅 آخر دخول: {new Date(user.last_login).toLocaleDateString('ar-EG')}</span>
                      <span>📦 {user.subscription_count} اشتراك</span>
                      <span>⭐ نشاط: {user.activity_score}%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      user.status === 'active'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {user.status === 'active' ? 'حظر' : 'إلغاء الحظر'}
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">لا توجد نتائج</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Recent Users Tab */}
        {activeTab === 'recent' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الاسم</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الهاتف</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الصف</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">آخر دخول</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.phone}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">
                          {user.grade === '1' ? 'الأول' : user.grade === '2' ? 'الثاني' : 'الثالث'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {new Date(user.last_login).toLocaleString('ar-EG')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                        }`}>
                          {user.status === 'active' ? 'نشط' : 'محظور'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Activity Logs Tab */}
        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Top Active Users */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  الطلاب الأكثر نشاطاً
                </h2>
              </div>
              <div className="space-y-4">
                {topActiveUsers.map((log, index) => (
                  <div
                    key={log.user_id}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {log.user_name}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>🏫 الصف {log.grade}</span>
                        <span>🔄 {log.login_count} دخول</span>
                        <span>✅ {log.content_completed} محتوى مكتمل</span>
                        <span>📊 {log.success_rate}% نجاح</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Activity Logs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    جميع سجلات النشاط
                  </h2>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الطالب</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الصف</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">عدد الدخول</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">المحتوى المكتمل</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">معدل النجاح</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">آخر نشاط</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {activityLogs.map((log) => (
                      <tr key={log.user_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{log.user_name}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">
                            {log.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{log.login_count}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{log.content_completed}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                style={{ width: `${log.success_rate}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {log.success_rate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {new Date(log.last_activity).toLocaleString('ar-EG')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}

