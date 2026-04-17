# جداول قاعدة البيانات Supabase - منصة البارع محمود الديب

## 1. جدول المستخدمين (users)

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

## 2. جدول الباقات (packages)

```sql
CREATE TABLE packages (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  type TEXT NOT NULL CHECK (type IN ('monthly', 'weekly', '3-months', 'special')),
  grade TEXT NOT NULL CHECK (grade IN ('1', '2', '3')),
  drive_link TEXT,
  is_free BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_packages_grade ON packages(grade);
CREATE INDEX idx_packages_type ON packages(type);
CREATE INDEX idx_packages_is_free ON packages(is_free);
```

## 3. جدول الأسابيع (weeks)

```sql
CREATE TABLE weeks (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  grade TEXT NOT NULL CHECK (grade IN ('1', '2', '3')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_weeks_grade ON weeks(grade);
```

## 4. جدول ربط الأسابيع بالباقات (package_weeks)

```sql
CREATE TABLE package_weeks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
  week_id INTEGER REFERENCES weeks(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(package_id, week_id)
);

CREATE INDEX idx_package_weeks_package ON package_weeks(package_id);
CREATE INDEX idx_package_weeks_week ON package_weeks(week_id);
```

## 5. جدول المحتوى (content)

```sql
CREATE TABLE content (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('video_lecture', 'video_homework', 'pdf_homework', 'mcq_homework', 'mcq_exam')),
  grade TEXT NOT NULL CHECK (grade IN ('1', '2', '3')),
  youtube_link TEXT,
  drive_link TEXT,
  questions JSONB,
  duration INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_content_grade ON content(grade);
CREATE INDEX idx_content_type ON content(type);
```

## 6. جدول ربط المحتوى بالأسابيع (week_content)

```sql
CREATE TABLE week_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  week_id INTEGER REFERENCES weeks(id) ON DELETE CASCADE,
  content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(week_id, content_id)
);

CREATE INDEX idx_week_content_week ON week_content(week_id);
CREATE INDEX idx_week_content_content ON week_content(content_id);
```

## 7. جدول اشتراكات المستخدمين (subscriptions)

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
  start_date TIMESTAMP DEFAULT NOW(),
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  payment_method TEXT,
  amount_paid DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_package ON subscriptions(package_id);
CREATE INDEX idx_subscriptions_is_active ON subscriptions(is_active);
```

## 8. جدول تقدم المستخدم في المحتوى (user_content_progress)

```sql
CREATE TABLE user_content_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  score DECIMAL(5, 2),
  attempts INTEGER DEFAULT 0,
  last_accessed TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

CREATE INDEX idx_user_content_progress_user ON user_content_progress(user_id);
CREATE INDEX idx_user_content_progress_content ON user_content_progress(content_id);
CREATE INDEX idx_user_content_progress_completed ON user_content_progress(is_completed);
```

## 9. جدول الإشعارات (notifications)

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  image_url TEXT,
  target TEXT NOT NULL CHECK (target IN ('all', 'grade_1', 'grade_2', 'grade_3')),
  type TEXT NOT NULL CHECK (type IN ('text', 'popup', 'banner')),
  sent_by TEXT NOT NULL,
  read_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_target ON notifications(target);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created ON notifications(created_at);
```

## 10. جدول قراءة الإشعارات (user_notifications)

```sql
CREATE TABLE user_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, notification_id)
);

CREATE INDEX idx_user_notifications_user ON user_notifications(user_id);
CREATE INDEX idx_user_notifications_notification ON user_notifications(notification_id);
CREATE INDEX idx_user_notifications_is_read ON user_notifications(is_read);
```

## 11. جدول معاملات المحفظة (wallet_transactions)

```sql
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('add', 'subtract', 'purchase')),
  amount DECIMAL(10, 2) NOT NULL,
  balance_before DECIMAL(10, 2) NOT NULL,
  balance_after DECIMAL(10, 2) NOT NULL,
  admin_name TEXT,
  notes TEXT,
  reference_type TEXT,
  reference_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_wallet_transactions_user ON wallet_transactions(user_id);
CREATE INDEX idx_wallet_transactions_type ON wallet_transactions(type);
CREATE INDEX idx_wallet_transactions_created ON wallet_transactions(created_at);
```

## 12. جدول الأكواد (codes)

```sql
CREATE TABLE codes (
  id INTEGER PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  grade TEXT NOT NULL CHECK (grade IN ('1', '2', '3')),
  package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
  is_used BOOLEAN DEFAULT FALSE,
  used_by UUID REFERENCES users(id) ON DELETE SET NULL,
  used_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_codes_code ON codes(code);
CREATE INDEX idx_codes_grade ON codes(grade);
CREATE INDEX idx_codes_package ON codes(package_id);
CREATE INDEX idx_codes_is_used ON codes(is_used);
CREATE INDEX idx_codes_is_active ON codes(is_active);
```

## 13. جدول سجل النشاطات (activity_logs)

```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  action_details TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action_type);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
```

## 14. جدول نتائج الامتحانات (exam_results)

```sql
CREATE TABLE exam_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
  score DECIMAL(5, 2) NOT NULL,
  total_marks DECIMAL(5, 2) NOT NULL,
  percentage DECIMAL(5, 2) NOT NULL,
  answers JSONB NOT NULL,
  time_taken INTEGER,
  passed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_exam_results_user ON exam_results(user_id);
CREATE INDEX idx_exam_results_content ON exam_results(content_id);
CREATE INDEX idx_exam_results_passed ON exam_results(passed);
CREATE INDEX idx_exam_results_created ON exam_results(created_at);
```

## 15. جدول الامتحانات الشاملة (comprehensive_exams)

```sql
CREATE TABLE comprehensive_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  grade TEXT NOT NULL CHECK (grade IN ('1', '2', '3')),
  total_marks DECIMAL(5, 2) NOT NULL,
  passing_marks DECIMAL(5, 2) NOT NULL,
  duration INTEGER NOT NULL,
  questions JSONB NOT NULL,
  solution_video_link TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comprehensive_exams_grade ON comprehensive_exams(grade);
CREATE INDEX idx_comprehensive_exams_is_active ON comprehensive_exams(is_active);
```

## ملاحظات هامة:

### 1. الباقات (packages)
- `id` يبدأ من 5000 ويزيد تلقائياً
- يمكن أن تكون مجانية (is_free = TRUE)
- كل باقة مرتبطة بصف دراسي محدد

### 2. الأسابيع (weeks)
- `id` يبدأ من 1 ويزيد تلقائياً
- الأسبوع الواحد يمكن أن يكون في أكثر من باقة

### 3. المحتوى (content)
- `id` يبدأ من 100 ويزيد تلقائياً
- أنواع المحتوى:
  - `video_lecture`: فيديو شرح (youtube_link)
  - `video_homework`: فيديو واجب (youtube_link)
  - `pdf_homework`: PDF واجب (drive_link)
  - `mcq_homework`: واجب MCQ (questions JSONB)
  - `mcq_exam`: امتحان MCQ (questions JSONB)

### 4. الأكواد (codes)
- `id` يبدأ من 1000 ويزيد تلقائياً
- صيغة الكود: MD-2026-XXXXXXXX
- كل كود يستخدم مرة واحدة فقط

### 5. المحفظة (wallet)
- رصيد كل طالب في جدول `users`
- جميع المعاملات تسجل في `wallet_transactions`
- أنواع المعاملات:
  - `add`: إضافة رصيد
  - `subtract`: سحب رصيد
  - `purchase`: شراء باقة

### 6. النشاطات (activity_logs)
- تسجيل جميع أنشطة المستخدمين
- تشمل: تسجيل الدخول، فتح المحتوى، شراء الباقات، إلخ

### 7. تقدم المستخدم (user_content_progress)
- يتم تسجيل تقدم الطالب في كل محتوى
- `progress_percentage`: نسبة الإنجاز (للفيديوهات)
- `score`: الدرجة (للامتحانات)
- `attempts`: عدد المحاولات

## SQL Scripts للتنفيذ

يمكن تنفيذ هذه السكريبتات في Supabase SQL Editor:

### 1. Enable UUID Extension
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 2. Create Tables
نفذ كل جدول من الجداول أعلاه بالترتيب.

### 3. Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE week_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_content_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE comprehensive_exams ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Packages policies
CREATE POLICY "Everyone can read packages" ON packages
  FOR SELECT USING (TRUE);

-- Subscriptions policies
CREATE POLICY "Users can read their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User content progress policies
CREATE POLICY "Users can read their own progress" ON user_content_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_content_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Exam results policies
CREATE POLICY "Users can read their own exam results" ON exam_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create exam results" ON exam_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 4. Functions and Triggers

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weeks_updated_at BEFORE UPDATE ON weeks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_content_progress_updated_at BEFORE UPDATE ON user_content_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comprehensive_exams_updated_at BEFORE UPDATE ON comprehensive_exams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## بيانات تجريبية (Test Data)

```sql
-- Insert test admin user
INSERT INTO users (phone, email, password_hash, role, first_name, last_name, status)
VALUES ('01234567890', 'anasmd2026@outnouty.com', 'hashed_password_here', 'admin', 'Anas', 'MD', 'active');

-- Insert test packages
INSERT INTO packages (id, name, description, price, type, grade, is_active)
VALUES 
  (5000, 'الباقة الشهرية - أكتوبر', 'باقة شاملة لشهر أكتوبر', 200.00, 'monthly', '1', TRUE),
  (5001, 'الباقة الأسبوعية - الأسبوع 1', 'باقة أسبوعية', 50.00, 'weekly', '1', TRUE),
  (5002, 'الباقة المجانية', 'محاضرات مجانية', 0.00, 'special', '1', TRUE);

-- Insert test weeks
INSERT INTO weeks (id, name, description, grade)
VALUES 
  (1, 'الأسبوع الأول', 'مقدمة عن المنهج', '1'),
  (2, 'الأسبوع الثاني', 'التطبيقات العملية', '1');

-- Link weeks to packages
INSERT INTO package_weeks (package_id, week_id)
VALUES 
  (5000, 1),
  (5000, 2),
  (5001, 1);
```

## بيئة التطوير والإنتاج

### المتغيرات البيئية المطلوبة (.env)

```env
VITE_SUPABASE_URL=https://tybebkidedofqavukggj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ملاحظات الأمان

1. **تشفير كلمات المرور**: استخدم bcrypt أو argon2
2. **RLS Policies**: تأكد من تفعيل جميع السياسات
3. **JWT Secret**: احفظه بأمان في Supabase
4. **API Keys**: لا تشاركها في الكود العام

## الخطوات التالية

1. إنشاء الجداول في Supabase
2. تفعيل RLS Policies
3. إنشاء Supabase Edge Functions للعمليات المعقدة
4. ربط Frontend بـ Backend
5. اختبار جميع الوظائف
6. نشر المنصة على Vercel
