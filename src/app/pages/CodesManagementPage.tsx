import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Key, Plus, Trash2, Copy, CheckCircle, XCircle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Code {
  id: number;
  code: string;
  grade: '1' | '2' | '3';
  package_id: number;
  package_name: string;
  is_used: boolean;
  used_by?: string;
  used_at?: string;
  created_at: string;
  is_active: boolean;
}

export function CodesManagementPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [gradeFilter, setGradeFilter] = useState<'all' | '1' | '2' | '3'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'used' | 'unused' | 'disabled'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    grade: '1' as '1' | '2' | '3',
    package_id: 0,
    count: 1,
  });

  // Mock packages
  const mockPackages = [
    { id: 5000, name: 'الباقة الشهرية - أكتوبر', grade: '1' },
    { id: 5001, name: 'الباقة الأسبوعية - الأسبوع 1', grade: '1' },
    { id: 5002, name: 'الباقة الشهرية - نوفمبر', grade: '2' },
    { id: 5003, name: 'باقة 3 شهور', grade: '3' },
  ];

  const [codes, setCodes] = useState<Code[]>([
    {
      id: 1000,
      code: 'MD-2026-AB12CD34',
      grade: '1',
      package_id: 5000,
      package_name: 'الباقة الشهرية - أكتوبر',
      is_used: true,
      used_by: 'أحمد محمد',
      used_at: '2026-04-15T10:00:00',
      created_at: '2026-04-10T09:00:00',
      is_active: true,
    },
    {
      id: 1001,
      code: 'MD-2026-XY56ZW78',
      grade: '2',
      package_id: 5002,
      package_name: 'الباقة الشهرية - نوفمبر',
      is_used: false,
      created_at: '2026-04-12T11:00:00',
      is_active: true,
    },
    {
      id: 1002,
      code: 'MD-2026-QW90ER12',
      grade: '3',
      package_id: 5003,
      package_name: 'باقة 3 شهور',
      is_used: false,
      created_at: '2026-04-14T14:00:00',
      is_active: false,
    },
  ]);

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
      if (i === 3) code += '';
    }
    return `MD-2026-${code}`;
  };

  const handleCreateCodes = () => {
    if (formData.package_id === 0) {
      alert('الرجاء اختيار الباقة');
      return;
    }

    const selectedPackage = mockPackages.find(p => p.id === formData.package_id);
    if (!selectedPackage) return;

    const newCodes: Code[] = [];
    for (let i = 0; i < formData.count; i++) {
      newCodes.push({
        id: 1000 + codes.length + i,
        code: generateCode(),
        grade: formData.grade,
        package_id: formData.package_id,
        package_name: selectedPackage.name,
        is_used: false,
        created_at: new Date().toISOString(),
        is_active: true,
      });
    }

    setCodes([...newCodes, ...codes]);
    setFormData({ ...formData, count: 1 });
    alert(`تم إنشاء ${formData.count} كود بنجاح!`);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleCodeStatus = (id: number) => {
    setCodes(codes.map(c =>
      c.id === id ? { ...c, is_active: !c.is_active } : c
    ));
  };

  const deleteCode = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الكود؟')) {
      setCodes(codes.filter(c => c.id !== id));
    }
  };

  const filteredCodes = codes.filter(c => {
    const matchesGrade = gradeFilter === 'all' || c.grade === gradeFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'used' && c.is_used) ||
      (statusFilter === 'unused' && !c.is_used && c.is_active) ||
      (statusFilter === 'disabled' && !c.is_active);
    return matchesGrade && matchesStatus;
  });

  const availablePackages = mockPackages.filter(p => p.grade === formData.grade);

  const stats = {
    total: codes.length,
    used: codes.filter(c => c.is_used).length,
    unused: codes.filter(c => !c.is_used && c.is_active).length,
    disabled: codes.filter(c => !c.is_active).length,
  };

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
                  إدارة الأكواد
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  إنشاء وإدارة أكواد الباقات
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">إجمالي الأكواد</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">مستخدم</p>
              <p className="text-2xl font-bold text-green-600">{stats.used}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">متاح</p>
              <p className="text-2xl font-bold text-blue-600">{stats.unused}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">معطل</p>
              <p className="text-2xl font-bold text-red-600">{stats.disabled}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Plus className="w-5 h-5" />
              إنشاء أكواد
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Key className="w-5 h-5" />
              سجل الأكواد
            </button>
          </div>
        </motion.div>

        {/* Create Codes Tab */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              إنشاء أكواد جديدة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                  الصف الدراسي
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value as any, package_id: 0 })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                >
                  <option value="1">الصف الأول</option>
                  <option value="2">الصف الثاني</option>
                  <option value="3">الصف الثالث</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                  الباقة
                </label>
                <select
                  value={formData.package_id}
                  onChange={(e) => setFormData({ ...formData, package_id: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                >
                  <option value={0}>اختر الباقة</option>
                  {availablePackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                  عدد الأكواد
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.count}
                  onChange={(e) => setFormData({ ...formData, count: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleCreateCodes}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  إنشاء الأكواد
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">ملاحظات:</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside text-right">
                <li>كل كود يستخدم لفتح باقة واحدة فقط</li>
                <li>صيغة الكود: MD-2026-XXXXXXXX</li>
                <li>يتم تسجيل جميع العمليات في قاعدة البيانات</li>
                <li>يمكن تعطيل أو حذف الأكواد من سجل الأكواد</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value as any)}
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                  >
                    <option value="all">جميع الصفوف</option>
                    <option value="1">الصف الأول</option>
                    <option value="2">الصف الثاني</option>
                    <option value="3">الصف الثالث</option>
                  </select>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="used">مستخدم</option>
                  <option value="unused">متاح</option>
                  <option value="disabled">معطل</option>
                </select>
              </div>
            </div>

            {/* Codes List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredCodes.map((code) => (
                <motion.div
                  key={code.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-mono font-bold text-lg">
                          {code.code}
                        </div>
                        <button
                          onClick={() => copyCode(code.code)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                          title="نسخ الكود"
                        >
                          {copiedCode === code.code ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">الباقة</p>
                          <p className="text-gray-900 dark:text-white font-medium">{code.package_name}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">الصف</p>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs inline-block mt-1">
                            {code.grade === '1' ? 'الأول' : code.grade === '2' ? 'الثاني' : 'الثالث'}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">تاريخ الإنشاء</p>
                          <p className="text-gray-900 dark:text-white text-sm">
                            {new Date(code.created_at).toLocaleDateString('ar-EG')}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">الحالة</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block mt-1 ${
                            code.is_used
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                              : !code.is_active
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
                          }`}>
                            {code.is_used ? 'مستخدم' : !code.is_active ? 'معطل' : 'متاح'}
                          </span>
                        </div>
                      </div>

                      {code.is_used && code.used_by && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <p className="text-green-800 dark:text-green-300 text-sm">
                            ✅ تم الاستخدام بواسطة: <span className="font-bold">{code.used_by}</span>
                            {' '}في {new Date(code.used_at!).toLocaleString('ar-EG')}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {!code.is_used && (
                        <button
                          onClick={() => toggleCodeStatus(code.id)}
                          className={`p-2 rounded-lg transition-all ${
                            code.is_active
                              ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
                              : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30'
                          }`}
                          title={code.is_active ? 'تعطيل' : 'تفعيل'}
                        >
                          {code.is_active ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                        </button>
                      )}
                      <button
                        onClick={() => deleteCode(code.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                        title="حذف"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredCodes.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">لا توجد أكواد</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
