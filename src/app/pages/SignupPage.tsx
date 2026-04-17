import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, MapPin, Mail, Lock, GraduationCap, AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { egyptGovernorates } from '../../data/cities';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

export function SignupPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    governorate: '',
    city: '',
    studentPhone: '',
    parentPhone: '',
    email: '',
    emailProvider: '@gmail.com',
    password: '',
    confirmPassword: '',
    grade: '',
    division: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('يرجى إدخال الاسم بالكامل');
      return false;
    }
    if (!formData.governorate || !formData.city) {
      setError('يرجى اختيار المحافظة والمدينة');
      return false;
    }
    if (!formData.studentPhone || formData.studentPhone.length !== 11) {
      setError('يرجى إدخال رقم هاتف صحيح (11 رقم)');
      return false;
    }
    if (!formData.parentPhone || formData.parentPhone.length !== 11) {
      setError('يرجى إدخال رقم هاتف ولي الأمر (11 رقم)');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.email) {
      setError('يرجى إدخال البريد الإلكتروني');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return false;
    }
    if (!formData.grade || !formData.division) {
      setError('يرجى اختيار الصف والشعبة');
      return false;
    }
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      setError('يرجى إدخال تاريخ الميلاد كاملاً');
      return false;
    }
    if (!formData.gender) {
      setError('يرجى اختيار النوع');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setLoading(true);

    try {
      const fullEmail = formData.email + formData.emailProvider;
      const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-85537280/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            phone: formData.studentPhone,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
            governorate: formData.governorate,
            city: formData.city,
            parent_phone: formData.parentPhone,
            email: fullEmail,
            grade: formData.grade,
            division: formData.division,
            birth_date: birthDate,
            gender: formData.gender,
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        toast.success(data.message);
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('حدث خطأ أثناء إنشاء الحساب');
      toast.error('حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  const grades = [
    'الصف الأول الثانوي',
    'الصف الثاني الثانوي',
    'الصف الثالث الثانوي'
  ];

  const divisions = ['علمي علوم', 'علمي رياضة', 'أدبي'];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            تم إنشاء حسابك بنجاح!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            يتم تحويلك إلى صفحة تسجيل الدخول...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800" dir="rtl">
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-2">انضم إلينا الآن</h1>
                  <p className="text-white/90">البارع محمود الديب - منصة التفوق الأكاديمي</p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-gray-50 dark:bg-gray-900 px-8 py-4">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className={`text-sm font-medium ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600'}`}>
                    المعلومات الشخصية
                  </span>
                </div>
                <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700">
                  <div className={`h-full transition-all ${step >= 2 ? 'w-full bg-blue-600' : 'w-0'}`}></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className={`text-sm font-medium ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600'}`}>
                    المعلومات الأكاديمية
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الاسم الأول
                        </label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => updateField('firstName', e.target.value)}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="محمد"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الاسم الأخير
                        </label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => updateField('lastName', e.target.value)}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="أحمد"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          المحافظة
                        </label>
                        <div className="relative">
                          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            value={formData.governorate}
                            onChange={(e) => {
                              updateField('governorate', e.target.value);
                              updateField('city', '');
                            }}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                          >
                            <option value="">اختر المحافظة</option>
                            {Object.keys(egyptGovernorates).map((gov) => (
                              <option key={gov} value={gov}>{gov}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          المدينة
                        </label>
                        <div className="relative">
                          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                            disabled={!formData.governorate}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none disabled:opacity-50"
                          >
                            <option value="">اختر المدينة</option>
                            {formData.governorate && egyptGovernorates[formData.governorate]?.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Phone Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          رقم هاتف الطالب
                        </label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.studentPhone}
                            onChange={(e) => updateField('studentPhone', e.target.value.replace(/\D/g, '').slice(0, 11))}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="01234567890"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          رقم هاتف ولي الأمر
                        </label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.parentPhone}
                            onChange={(e) => updateField('parentPhone', e.target.value.replace(/\D/g, '').slice(0, 11))}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="01234567890"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>التالي</span>
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        البريد الإلكتروني
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="example"
                          />
                        </div>
                        <select
                          value={formData.emailProvider}
                          onChange={(e) => updateField('emailProvider', e.target.value)}
                          className="w-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="@gmail.com">@gmail.com</option>
                          <option value="@yahoo.com">@yahoo.com</option>
                          <option value="@outlook.com">@outlook.com</option>
                        </select>
                      </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          كلمة المرور
                        </label>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => updateField('password', e.target.value)}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          تأكيد كلمة المرور
                        </label>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => updateField('confirmPassword', e.target.value)}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Academic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الصف الدراسي
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            value={formData.grade}
                            onChange={(e) => updateField('grade', e.target.value)}
                            className="w-full pr-11 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                          >
                            <option value="">اختر الصف</option>
                            {grades.map((grade) => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الشعبة
                        </label>
                        <select
                          value={formData.division}
                          onChange={(e) => updateField('division', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">اختر الشعبة</option>
                          {divisions.map((div) => (
                            <option key={div} value={div}>{div}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Birth Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        تاريخ الميلاد
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <select
                          value={formData.birthDay}
                          onChange={(e) => updateField('birthDay', e.target.value)}
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">اليوم</option>
                          {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <select
                          value={formData.birthMonth}
                          onChange={(e) => updateField('birthMonth', e.target.value)}
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">الشهر</option>
                          {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                        <select
                          value={formData.birthYear}
                          onChange={(e) => updateField('birthYear', e.target.value)}
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">السنة</option>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        النوع
                      </label>
                      <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={(e) => updateField('gender', e.target.value)}
                            className="sr-only peer"
                          />
                          <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20">
                            ذكر
                          </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={(e) => updateField('gender', e.target.value)}
                            className="sr-only peer"
                          />
                          <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20">
                            أنثى
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                      >
                        <ChevronRight className="w-5 h-5" />
                        <span>السابق</span>
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  لديك حساب بالفعل؟{' '}
                  <Link to="/login" className="text-blue-600 dark:text-blue-500 font-bold hover:underline">
                    سجل دخول
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
