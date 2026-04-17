# دليل النشر الكامل - منصة البارع محمود الديب

هذا الدليل يشرح خطوة بخطوة كيفية نشر المنصة على Vercel مع Supabase وربط الدومين من Hostinger.

## 📋 المتطلبات الأساسية

قبل البدء، تأكد من وجود:

- [ ] حساب GitHub
- [ ] حساب Supabase (مجاني)
- [ ] حساب Vercel (مجاني)
- [ ] دومين من Hostinger (اختياري)
- [ ] Git مثبت على جهازك
- [ ] Node.js 18+ مثبت على جهازك

## 🗄️ الخطوة 1: إعداد قاعدة البيانات Supabase

### 1.1 إنشاء مشروع Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. سجل الدخول أو أنشئ حساب جديد
3. اضغط "New Project"
4. املأ البيانات:
   - **Name**: `elbaree-mahmoud-eldeeb`
   - **Database Password**: اختر كلمة مرور قوية واحفظها
   - **Region**: اختر `Europe West (Ireland)` للأداء الأفضل في مصر
   - **Pricing Plan**: اختر `Free`
5. اضغط "Create new project"
6. انتظر حتى يتم إنشاء المشروع (قد يستغرق دقيقة أو دقيقتين)

### 1.2 الحصول على مفاتيح API

1. في لوحة تحكم Supabase، اذهب إلى:
   - **Settings** > **API**
2. انسخ القيمتين التاليتين:
   - **Project URL** (مثل: `https://xxxxx.supabase.co`)
   - **anon/public key** (مفتاح طويل يبدأ بـ `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
3. احفظهما في مكان آمن - ستحتاجهما لاحقاً

### 1.3 إنشاء الجداول

1. في لوحة تحكم Supabase، اذهب إلى **SQL Editor**
2. اضغط "New query"
3. افتح ملف `SUPABASE_DATABASE_SCHEMA.md` من المشروع
4. نفذ السكريبتات بالترتيب التالي:

#### أ. تفعيل UUID Extension

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

اضغط "Run" (أو Ctrl+Enter)

#### ب. إنشاء جدول المستخدمين

انسخ السكريبت الكامل لجدول `users` من الملف والصقه، ثم اضغط "Run"

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'admin')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  grade TEXT CHECK (grade IN ('1', '2', '3')),
  division TEXT,
  governorate TEXT,
  city TEXT,
  student_phone TEXT,
  parent_phone TEXT,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('male', 'female')),
  student_code INTEGER UNIQUE,
  wallet DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'blocked')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_grade ON users(grade);
CREATE INDEX idx_users_status ON users(status);
```

#### ج. كرر العملية لكل جدول

نفذ باقي الجداول بنفس الطريقة من الملف `SUPABASE_DATABASE_SCHEMA.md`

#### د. تفعيل Row Level Security (RLS)

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
-- ... (نفذ لجميع الجداول)
```

#### هـ. إنشاء Policies

نفذ السياسات من الملف:

```sql
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);
-- ... (نفذ باقي السياسات)
```

#### و. إنشاء Functions and Triggers

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ... (نفذ باقي الـ Triggers)
```

#### ز. إدخال بيانات تجريبية (اختياري)

```sql
-- Insert test admin user (غيّر password_hash بقيمة مشفرة حقيقية لاحقاً)
INSERT INTO users (phone, email, password_hash, role, first_name, last_name, status)
VALUES ('01234567890', 'anasmd2026@outnouty.com', '$2a$10$example_hashed_password', 'admin', 'Anas', 'MD', 'active');
```

**ملاحظة:** ستحتاج لتشفير كلمة المرور باستخدام bcrypt في الكود البرمجي

### 1.4 التحقق من إنشاء الجداول

1. في لوحة تحكم Supabase، اذهب إلى **Table Editor**
2. تأكد من ظهور جميع الجداول:
   - users
   - packages
   - weeks
   - package_weeks
   - content
   - week_content
   - subscriptions
   - user_content_progress
   - notifications
   - user_notifications
   - wallet_transactions
   - codes
   - activity_logs
   - exam_results
   - comprehensive_exams

## 📦 الخطوة 2: تحضير المشروع للنشر

### 2.1 تحديث ملف البيئة

1. في المشروع، أنشئ ملف `.env` (إن لم يكن موجوداً)
2. أضف القيم من Supabase:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2.2 اختبار المشروع محلياً

```bash
# تثبيت الحزم
pnpm install

# تشغيل المشروع
pnpm run dev
```

افتح المتصفح على `http://localhost:5173` وتأكد من عمل كل شيء بشكل صحيح.

### 2.3 بناء المشروع

```bash
pnpm run build
```

تأكد من عدم وجود أخطاء في البناء.

## 🚀 الخطوة 3: رفع المشروع على GitHub

### 3.1 إنشاء مستودع GitHub

1. اذهب إلى [github.com](https://github.com)
2. سجل الدخول
3. اضغط "New repository"
4. املأ البيانات:
   - **Repository name**: `elbaree-mahmoud-eldeeb-platform`
   - **Description**: `منصة البارع محمود الديب التعليمية`
   - **Visibility**: Private (مستحسن) أو Public
5. **لا تضف** README, .gitignore, أو license (لأنها موجودة بالفعل)
6. اضغط "Create repository"

### 3.2 ربط المشروع المحلي بـ GitHub

في terminal داخل مجلد المشروع:

```bash
# تهيئة Git (إن لم يكن مهيئاً)
git init

# إضافة جميع الملفات
git add .

# إنشاء أول commit
git commit -m "Initial commit - منصة البارع محمود الديب"

# إضافة remote
git remote add origin https://github.com/your-username/elbaree-mahmoud-eldeeb-platform.git

# رفع الكود
git branch -M main
git push -u origin main
```

**ملاحظة:** استبدل `your-username` باسم المستخدم الخاص بك على GitHub

### 3.3 التحقق من الرفع

1. افتح صفحة المستودع على GitHub
2. تأكد من ظهور جميع الملفات

## ☁️ الخطوة 4: النشر على Vercel

### 4.1 إنشاء حساب Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "Sign Up"
3. اختر "Continue with GitHub"
4. سجل الدخول بحساب GitHub الخاص بك
5. امنح Vercel الأذونات المطلوبة

### 4.2 استيراد المشروع

1. في لوحة تحكم Vercel، اضغط "Add New..."
2. اختر "Project"
3. ستظهر قائمة بمستودعات GitHub الخاصة بك
4. ابحث عن `elbaree-mahmoud-eldeeb-platform`
5. اضغط "Import"

### 4.3 إعداد المشروع

في صفحة الإعداد:

**Project Name**: `elbaree-mahmoud-eldeeb` (أو أي اسم تفضله)

**Framework Preset**: سيتم اكتشاف Vite تلقائياً

**Root Directory**: اتركها كما هي (`.`)

**Build and Output Settings**:
- Build Command: `pnpm run build`
- Output Directory: `dist`
- Install Command: `pnpm install`

### 4.4 إضافة متغيرات البيئة

1. في قسم "Environment Variables"
2. أضف المتغيرات التالية:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key-here` |

3. تأكد من اختيار **Production**, **Preview**, و **Development** لكل متغير

### 4.5 النشر

1. اضغط "Deploy"
2. انتظر حتى يكتمل النشر (عادةً 2-3 دقائق)
3. عند انتهاء النشر، ستحصل على رابط مثل:
   - `https://elbaree-mahmoud-eldeeb.vercel.app`

### 4.6 اختبار المنصة

1. افتح الرابط الذي حصلت عليه
2. تأكد من عمل المنصة بشكل صحيح
3. جرب تسجيل الدخول بحساب الأدمن

## 🌐 الخطوة 5: ربط الدومين من Hostinger (اختياري)

### 5.1 في لوحة تحكم Hostinger

1. سجل الدخول إلى [hostinger.com](https://www.hostinger.com)
2. اذهب إلى **Domains**
3. اختر الدومين الذي تريد ربطه
4. اذهب إلى **DNS / Name Servers**

### 5.2 إضافة سجلات DNS

اضغط **Manage** ثم أضف السجلات التالية:

#### سجل A (للدومين الرئيسي)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 14400 |

#### سجل CNAME (للـ www)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | cname.vercel-dns.com | 14400 |

**ملاحظة:** قد تحتاج لحذف أي سجلات A أو CNAME موجودة مسبقاً للدومين

### 5.3 في لوحة تحكم Vercel

1. اذهب إلى مشروعك في Vercel
2. اضغط **Settings**
3. اذهب إلى **Domains**
4. اضغط **Add**
5. أدخل الدومين الخاص بك (مثل: `example.com`)
6. اضغط **Add**

### 5.4 التحقق من الدومين

1. Vercel سيبدأ بالتحقق تلقائياً
2. قد يستغرق الأمر من دقائق إلى 48 ساعة
3. عند اكتمال التحقق، سيظهر ✅ بجانب الدومين
4. سيتم إصدار شهادة SSL تلقائياً

### 5.5 إضافة www (اختياري)

1. في نفس صفحة Domains في Vercel
2. اضغ **Add** مرة أخرى
3. أدخل `www.example.com`
4. اضغط **Add**
5. اختر **Redirect to example.com**

### 5.6 اختبار الدومين

بعد اكتمال التحقق:
- افتح `https://example.com` في المتصفح
- تأكد من عمل المنصة
- تأكد من ظهور قفل SSL (🔒) في شريط العنوان

## 🔄 الخطوة 6: التحديثات المستقبلية

### 6.1 تحديث الكود

عندما تريد تحديث المنصة:

```bash
# عمل التغييرات في الكود
# ...

# إضافة التغييرات
git add .

# إنشاء commit
git commit -m "وصف التحديث"

# رفع التحديث
git push origin main
```

Vercel سيقوم تلقائياً ببناء ونشر التحديث!

### 6.2 تحديث قاعدة البيانات

لإضافة جداول أو تعديل الهيكل:

1. اذهب إلى SQL Editor في Supabase
2. نفذ السكريبتات المطلوبة
3. لا حاجة لإعادة نشر المشروع على Vercel

## ✅ قائمة التحقق النهائية

- [ ] تم إنشاء مشروع Supabase
- [ ] تم إنشاء جميع الجداول
- [ ] تم تفعيل RLS Policies
- [ ] تم الحصول على مفاتيح API
- [ ] تم رفع الكود على GitHub
- [ ] تم النشر على Vercel بنجاح
- [ ] تم إضافة متغيرات البيئة
- [ ] المنصة تعمل على رابط Vercel
- [ ] (اختياري) تم ربط الدومين من Hostinger
- [ ] (اختياري) SSL يعمل على الدومين
- [ ] تم اختبار تسجيل الدخول
- [ ] تم اختبار إنشاء حساب طالب جديد

## 🆘 حل المشاكل الشائعة

### المشكلة: Build فشل على Vercel

**الحل:**
1. تحقق من Logs في Vercel
2. تأكد من أن `pnpm run build` يعمل محلياً
3. تأكد من إضافة جميع متغيرات البيئة

### المشكلة: خطأ في الاتصال بـ Supabase

**الحل:**
1. تأكد من صحة `VITE_SUPABASE_URL`
2. تأكد من صحة `VITE_SUPABASE_ANON_KEY`
3. تحقق من تفعيل RLS Policies
4. تحقق من إنشاء جميع الجداول

### المشكلة: الدومين لا يعمل

**الحل:**
1. انتظر 24-48 ساعة لانتشار DNS
2. تأكد من إضافة السجلات بشكل صحيح
3. استخدم [DNS Checker](https://dnschecker.org) للتحقق
4. تأكد من حذف أي سجلات قديمة متعارضة

### المشكلة: الصفحة تظهر 404 بعد التنقل

**الحل:**
- هذا طبيعي مع React Router
- تأكد من وجود ملف `vercel.json` مع rewrites
- الملف موجود بالفعل في المشروع

## 📞 الدعم

إذا واجهت أي مشاكل:
1. راجع هذا الدليل مرة أخرى
2. راجع ملف `README.md`
3. تحقق من الوثائق الرسمية:
   - [Supabase Docs](https://supabase.com/docs)
   - [Vercel Docs](https://vercel.com/docs)
4. اطلب المساعدة من الدعم الفني

---

تمت كتابة هذا الدليل بـ ❤️ لتسهيل النشر
