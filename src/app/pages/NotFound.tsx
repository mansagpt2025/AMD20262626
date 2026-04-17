import { Link } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:shadow-lg transition-all"
        >
          <Home className="w-5 h-5" />
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
