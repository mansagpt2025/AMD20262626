export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              م
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-white">البارع محمود الديب</div>
              <div className="text-sm text-gray-400">سلسلة البارع</div>
            </div>
          </div>

          <p className="text-gray-400 max-w-2xl leading-relaxed">
            منصة تعليمية متخصصة في اللغة العربية للثانوية العامة، نقدم شروحات مفصلة ومتابعة مستمرة لضمان تفوق جميع الطلاب
          </p>

          <div className="w-full border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              تم الإنشاء بكل الحب لطلاب الثانوية العامة © {currentYear} جميع الحقوق محفوظة للأستاذ محمود الديب ®
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
