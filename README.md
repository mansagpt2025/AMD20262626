# منصة البارع محمود الديب التعليمية

منصة تعليمية احترافية للثانوية العامة باستخدام React.js مع Supabase كقاعدة بيانات.

## 📋 المحتويات

- [نظرة عامة](#نظرة-عامة)
- [المميزات](#المميزات)
- [المتطلبات](#المتطلبات)
- [التثبيت](#التثبيت)
- [إعداد قاعدة البيانات](#إعداد-قاعدة-البيانات)
- [تشغيل المشروع](#تشغيل-المشروع)
- [النشر على Vercel](#النشر-على-vercel)
- [البنية التقنية](#البنية-التقنية)

## 🎯 نظرة عامة

منصة البارع محمود الديب هي منصة تعليمية شاملة مصممة لطلاب الثانوية العامة (الصف الأول والثاني والثالث). تقدم المنصة:
- محتوى تعليمي متنوع (فيديوهات، PDFs، امتحانات MCQ)
- نظام إدارة متقدم للأدمن
- نظام محفظة إلكترونية
- نظام أكواد للباقات
- عارض محمي للفيديوهات والملفات
- امتحانات تفاعلية مع نتائج فورية

## ✨ المميزات

### للطلاب
- ✅ تسجيل دخول آمن برقم الهاتف
- 📚 الوصول للباقات والحصص حسب الاشتراك
- 🎥 عارض فيديو محمي من التحميل
- 📄 عارض PDF محمي من الطباعة
- 📝 امتحانات MCQ تفاعلية
- 💰 نظام محفظة إلكترونية
- 🔔 استقبال الإشعارات
- 📊 متابعة التقدم الدراسي
- 🌙 دعم الوضع الداكن/الفاتح

### للأدمن
- 👥 إدارة المستخدمين والحظر
- 📦 إدارة الباقات والأسابيع والمحتوى
- 💳 إدارة المحفظة (إضافة/سحب رصيد)
- 🔑 إنشاء وإدارة أكواد الباقات
- 📢 إرسال إشعارات للطلاب
- 📊 إحصائيات ومتابعة النشاطات
- 🔐 لوحة تحكم محمية

## 🛠️ المتطلبات

- Node.js 18+ أو أعلى
- pnpm (مدير الحزم)
- حساب Supabase (مجاني)
- حساب Vercel (للنشر - اختياري)
- حساب GitHub (للنشر - اختياري)

## 📥 التثبيت

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd code
```

### 2. تثبيت الحزم

```bash
pnpm install
```

### 3. إعداد ملف البيئة

أنشئ ملف `.env` في المجلد الرئيسي:

```env
VITE_SUPABASE_URL=https://tybebkidedofqavukggj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5YmVia2lkZWRvZnFhdnVrZ2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTI5NjEsImV4cCI6MjA4OTY2ODk2MX0.L-ZuwKzEcyZgYMjh6ePrp7pB1jjTkzDhEIo1UyYBSlo
```

**ملاحظة:** إذا كنت تريد استخدام قاعدة البيانات الخاصة بك، قم بإنشاء مشروع جديد في Supabase واستبدل القيم أعلاه بقيمك.

## 🗄️ إعداد قاعدة البيانات

### 1. إنشاء حساب Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. قم بإنشاء حساب جديد
3. أنشئ مشروع جديد

### 2. إنشاء الجداول

1. افتح SQL Editor في Supabase Dashboard
2. افتح ملف `SUPABASE_DATABASE_SCHEMA.md`
3. نفذ السكريبتات بالترتيب التالي:

```sql
-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create all tables (نفذ كل جدول من الملف)
-- 3. Enable RLS
-- 4. Create Policies
-- 5. Create Functions and Triggers
-- 6. Insert test data (اختياري)
```

### 3. تحديث مفاتيح API

1. في Supabase Dashboard، اذهب إلى Settings > API
2. انسخ:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon/public key` → `VITE_SUPABASE_ANON_KEY`
3. ضعها في ملف `.env`

## 🚀 تشغيل المشروع

### تشغيل محلي (Development)

```bash
pnpm run dev
```

المنصة ستعمل على: `http://localhost:5173`

### بناء المشروع (Production Build)

```bash
pnpm run build
```

### معاينة البناء

```bash
pnpm run preview
```

## 🌐 النشر على Vercel

### الطريقة 1: من خلال GitHub (موصى بها)

1. **رفع المشروع على GitHub**

```bash
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **الربط مع Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل الدخول بحساب GitHub
   - اضغط "New Project"
   - اختر المستودع الخاص بك
   - اضغط "Import"

3. **إعداد متغيرات البيئة في Vercel**
   - في صفحة إعدادات المشروع، اذهب إلى "Environment Variables"
   - أضف:
     - `VITE_SUPABASE_URL` = قيمة URL من Supabase
     - `VITE_SUPABASE_ANON_KEY` = قيمة المفتاح من Supabase

4. **النشر**
   - اضغط "Deploy"
   - انتظر حتى يكتمل النشر
   - ستحصل على رابط المنصة (مثل: `https://your-app.vercel.app`)

### الطريقة 2: من خلال Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel

# للنشر على الإنتاج
vercel --prod
```

## 🔗 ربط الدومين من Hostinger

### 1. في لوحة تحكم Hostinger

1. اذهب إلى DNS/Name Servers
2. أضف السجلات التالية:

```
Type: A
Host: @
Value: 76.76.21.21

Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

### 2. في لوحة تحكم Vercel

1. اذهب إلى Settings > Domains
2. اضغط "Add Domain"
3. أدخل الدومين الخاص بك (مثل: `example.com`)
4. اتبع التعليمات للتحقق

## 📁 البنية التقنية

```
code/
├── src/
│   ├── app/
│   │   ├── components/      # المكونات المشتركة
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── pages/           # صفحات التطبيق
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── GradeManagementPage.tsx
│   │   │   ├── VideoViewerPage.tsx
│   │   │   ├── PDFViewerPage.tsx
│   │   │   ├── MCQExamPage.tsx
│   │   │   └── ...
│   │   ├── routes.tsx       # مسارات التطبيق
│   │   └── App.tsx
│   ├── contexts/            # سياقات React
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/
│   │   └── supabase.ts      # إعداد Supabase
│   └── styles/
│       ├── theme.css
│       └── fonts.css
├── public/                  # الملفات العامة
├── supabase/               # Supabase Functions (اختياري)
├── .env                    # متغيرات البيئة
├── package.json
├── vite.config.ts
├── README.md
└── SUPABASE_DATABASE_SCHEMA.md
```

## 🔐 بيانات تسجيل الدخول

### حساب الأدمن الافتراضي

```
البريد الإلكتروني: anasmd2026@outnouty.com
كلمة المرور: 614235anas
```

**ملاحظة مهمة:** قم بتغيير كلمة المرور فوراً بعد أول تسجيل دخول!

### إنشاء حساب طالب

1. اذهب إلى صفحة التسجيل
2. املأ جميع البيانات المطلوبة
3. سيتم إنشاء الحساب تلقائياً

## 🛡️ الأمان

- ✅ تشفير كلمات المرور باستخدام bcrypt
- ✅ Row Level Security (RLS) في Supabase
- ✅ حماية المسارات حسب نوع المستخدم
- ✅ حماية الفيديوهات والملفات من التحميل
- ✅ تسجيل جميع النشاطات

## 📱 الدعم والمتطلبات

### المتصفحات المدعومة

- Chrome (موصى به)
- Firefox
- Safari
- Edge

### الأجهزة المدعومة

- 💻 Desktop (Windows, Mac, Linux)
- 📱 Mobile (iOS, Android)
- 📱 Tablet (iPad, Android tablets)

## 🎨 التخصيص

### تغيير الألوان

عدّل ملف `src/styles/theme.css`:

```css
:root {
  --color-primary: #f59e0b; /* Amber */
  --color-secondary: #ea580c; /* Orange */
  /* ... */
}
```

### تغيير الخطوط

عدّل ملف `src/styles/fonts.css`

## 🐛 استكشاف الأخطاء

### خطأ في الاتصال بـ Supabase

- تأكد من صحة `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`
- تأكد من تفعيل RLS Policies
- تحقق من اتصال الإنترنت

### الصفحة لا تعمل بعد النشر على Vercel

- تأكد من إضافة متغيرات البيئة في Vercel
- تحقق من Build Logs في Vercel
- تأكد من تنفيذ `pnpm run build` محلياً قبل النشر

### الفيديوهات لا تعمل

- تأكد من صحة روابط YouTube
- تأكد من أن الفيديو غير محذوف أو خاص

## 📞 الدعم الفني

للمساعدة والدعم:
- 📧 Email: support@example.com
- 📱 WhatsApp: +20XXXXXXXXXX

## 📄 الترخيص

هذا المشروع محمي بحقوق الملكية الفكرية.
جميع الحقوق محفوظة © 2026 البارع محمود الديب

## 🙏 شكر وتقدير

- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)
- [Motion](https://motion.dev)
- [Lucide Icons](https://lucide.dev)

---

**ملاحظة:** هذا المشروع تم بناؤه بواسطة Claude Code (Anthropic)

تم التطوير بـ ❤️ للتعليم
