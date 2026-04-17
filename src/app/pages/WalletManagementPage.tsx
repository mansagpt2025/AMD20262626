import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Wallet, Plus, Minus, Search, Filter, Download, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Transaction {
  id: number;
  user_id: number;
  user_name: string;
  user_phone: string;
  grade: '1' | '2' | '3';
  type: 'add' | 'subtract';
  amount: number;
  balance_before: number;
  balance_after: number;
  admin_name: string;
  notes: string;
  created_at: string;
}

export function WalletManagementPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'manage' | 'history'>('manage');
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<'all' | '1' | '2' | '3'>('all');
  const [transactionType, setTransactionType] = useState<'add' | 'subtract'>('add');

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState('');

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      user_id: 1,
      user_name: 'أحمد محمد علي',
      user_phone: '01012345678',
      grade: '1',
      type: 'add',
      amount: 200,
      balance_before: 100,
      balance_after: 300,
      admin_name: 'Admin',
      notes: 'شحن محفظة',
      created_at: '2026-04-17T10:30:00',
    },
    {
      id: 2,
      user_id: 2,
      user_name: 'محمود حسن',
      user_phone: '01098765432',
      grade: '2',
      type: 'subtract',
      amount: 50,
      balance_before: 150,
      balance_after: 100,
      admin_name: 'Admin',
      notes: 'تعديل رصيد',
      created_at: '2026-04-16T14:00:00',
    },
  ]);

  // Mock users for search
  const mockUsers = [
    { id: 1, name: 'أحمد محمد علي', phone: '01012345678', grade: '1' as const, wallet: 300 },
    { id: 2, name: 'محمود حسن', phone: '01098765432', grade: '2' as const, wallet: 100 },
    { id: 3, name: 'سارة أحمد', phone: '01123456789', grade: '3' as const, wallet: 450 },
  ];

  const handleSearch = () => {
    const user = mockUsers.find(u => u.name.includes(searchQuery) || u.phone.includes(searchQuery));
    if (user) {
      setSelectedUser(user);
    } else {
      alert('لم يتم العثور على المستخدم');
    }
  };

  const handleTransaction = () => {
    if (!selectedUser || amount <= 0) {
      alert('الرجاء إدخال البيانات كاملة');
      return;
    }

    const newBalance = transactionType === 'add'
      ? selectedUser.wallet + amount
      : selectedUser.wallet - amount;

    if (newBalance < 0) {
      alert('الرصيد غير كافٍ');
      return;
    }

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      user_id: selectedUser.id,
      user_name: selectedUser.name,
      user_phone: selectedUser.phone,
      grade: selectedUser.grade,
      type: transactionType,
      amount,
      balance_before: selectedUser.wallet,
      balance_after: newBalance,
      admin_name: 'Admin',
      notes,
      created_at: new Date().toISOString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setSelectedUser({ ...selectedUser, wallet: newBalance });
    setAmount(0);
    setNotes('');
    alert('تمت العملية بنجاح!');
  };

  const exportReport = () => {
    alert('جاري تنزيل التقرير...');
  };

  const filteredTransactions = transactions.filter(t =>
    gradeFilter === 'all' || t.grade === gradeFilter
  );

  const totalAdded = filteredTransactions
    .filter(t => t.type === 'add')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSubtracted = filteredTransactions
    .filter(t => t.type === 'subtract')
    .reduce((sum, t) => sum + t.amount, 0);

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
                  إدارة المحفظة
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  إدارة أرصدة الطلاب وسجلات المعاملات
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'manage'
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Wallet className="w-5 h-5" />
              إضافة/سحب رصيد
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              سجل المعاملات
            </button>
          </div>
        </motion.div>

        {/* Manage Wallet Tab */}
        {activeTab === 'manage' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Search and Transaction Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search User */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  البحث عن طالب
                </h2>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="اسم الطالب أو رقم الهاتف"
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    بحث
                  </button>
                </div>
              </div>

              {/* Transaction Form */}
              {selectedUser && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    إدارة الرصيد
                  </h2>

                  {/* Transaction Type */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setTransactionType('add')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        transactionType === 'add'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-700 hover:border-green-300'
                      }`}
                    >
                      <Plus className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <p className="font-medium text-gray-900 dark:text-white">إضافة رصيد</p>
                    </button>
                    <button
                      onClick={() => setTransactionType('subtract')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        transactionType === 'subtract'
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-700 hover:border-red-300'
                      }`}
                    >
                      <Minus className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <p className="font-medium text-gray-900 dark:text-white">سحب رصيد</p>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                        المبلغ (جنيه)
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="0"
                        placeholder="0"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-right">
                        ملاحظات
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="ملاحظات إضافية (اختياري)"
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-right"
                      />
                    </div>

                    <button
                      onClick={handleTransaction}
                      className={`w-full px-6 py-3 rounded-xl font-medium text-white hover:shadow-lg transition-all ${
                        transactionType === 'add'
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : 'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                    >
                      {transactionType === 'add' ? 'إضافة الرصيد' : 'سحب الرصيد'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Selected User Info */}
            <div className="lg:col-span-1">
              {selectedUser ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white sticky top-8"
                >
                  <h3 className="text-xl font-bold mb-4">بيانات الطالب</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-teal-100 text-sm">الاسم</p>
                      <p className="font-medium text-lg">{selectedUser.name}</p>
                    </div>
                    <div>
                      <p className="text-teal-100 text-sm">رقم الهاتف</p>
                      <p className="font-medium">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <p className="text-teal-100 text-sm">الصف الدراسي</p>
                      <p className="font-medium">
                        {selectedUser.grade === '1' ? 'الأول' :
                         selectedUser.grade === '2' ? 'الثاني' : 'الثالث'}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-teal-400">
                      <p className="text-teal-100 text-sm">الرصيد الحالي</p>
                      <p className="font-bold text-3xl">{selectedUser.wallet} جنيه</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                  <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    ابحث عن طالب لعرض بياناته
                  </p>
                </div>
              )}
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
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">إجمالي الإضافات</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAdded} جنيه</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Minus className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">إجمالي السحوبات</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSubtracted} جنيه</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">إجمالي المعاملات</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredTransactions.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter and Export */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
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
              <button
                onClick={exportReport}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                تنزيل التقرير
              </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">#</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الطالب</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الصف</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">النوع</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">المبلغ</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الرصيد قبل</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">الرصيد بعد</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">#{transaction.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-gray-900 dark:text-white font-medium">{transaction.user_name}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{transaction.user_phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">
                            {transaction.grade === '1' ? 'الأول' : transaction.grade === '2' ? 'الثاني' : 'الثالث'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'add'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                          }`}>
                            {transaction.type === 'add' ? 'إضافة' : 'سحب'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">
                          {transaction.amount} جنيه
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {transaction.balance_before} جنيه
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {transaction.balance_after} جنيه
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                          {new Date(transaction.created_at).toLocaleString('ar-EG')}
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
