import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "@supabase/supabase-js";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

// Explicitly handle OPTIONS preflight requests
app.options('*', (c) => {
  return c.text('OK');
});

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize database with admin user
app.post("/init-db", async (c) => {
  try {
    // Create admin user
    const adminData = {
      phone: "614235anas",
      email: "anasmd2026@outnouty.com",
      password: "614235anas",
      role: "admin",
      first_name: "محمود",
      last_name: "الديب",
      name: "البارع محمود الديب",
      status: "active",
      created_at: new Date().toISOString(),
    };

    await kv.set(`user:phone:614235anas`, adminData);
    await kv.set(`user:email:anasmd2026@outnouty.com`, adminData);

    return c.json({ success: true, message: "Database initialized successfully" });
  } catch (error) {
    console.error("Error initializing database:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Student signup
app.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { phone, password, ...userData } = body;

    // Check if user already exists
    const existingUser = await kv.get(`user:phone:${phone}`);
    if (existingUser) {
      return c.json({ success: false, error: "رقم الهاتف مسجل بالفعل" }, 400);
    }

    // Generate student code (starts from 5000)
    const allUsers = await kv.getByPrefix("user:phone:");
    const studentCode = 5000 + allUsers.filter((u: any) => u.role === 'student').length + 1;

    // Create new student
    const newUser = {
      ...userData,
      phone,
      password,
      role: "student",
      student_code: studentCode,
      wallet: 0,
      status: "active",
      created_at: new Date().toISOString(),
    };

    await kv.set(`user:phone:${phone}`, newUser);
    
    return c.json({ 
      success: true, 
      user: { ...newUser, password: undefined },
      message: "تم إنشاء الحساب بنجاح" 
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Login
app.post("/login", async (c) => {
  try {
    const { phone, password } = await c.req.json();

    const user = await kv.get(`user:phone:${phone}`);
    
    if (!user || user.password !== password) {
      return c.json({ success: false, error: "رقم الهاتف أو كلمة المرور غير صحيحة" }, 401);
    }

    if (user.status === 'blocked') {
      return c.json({ success: false, error: "تم حظر هذا الحساب" }, 403);
    }

    return c.json({ 
      success: true, 
      user: { ...user, password: undefined },
      message: "تم تسجيل الدخول بنجاح" 
    });
  } catch (error) {
    console.error("Error during login:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get user profile
app.get("/profile/:phone", async (c) => {
  try {
    const phone = c.req.param('phone');
    const user = await kv.get(`user:phone:${phone}`);
    
    if (!user) {
      return c.json({ success: false, error: "المستخدم غير موجود" }, 404);
    }

    return c.json({ success: true, user: { ...user, password: undefined } });
  } catch (error) {
    console.error("Error getting profile:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update password
app.put("/change-password", async (c) => {
  try {
    const { phone, oldPassword, newPassword } = await c.req.json();

    const user = await kv.get(`user:phone:${phone}`);
    
    if (!user) {
      return c.json({ success: false, error: "المستخدم غير موجود" }, 404);
    }

    if (user.password !== oldPassword) {
      return c.json({ success: false, error: "كلمة المرور القديمة غير صحيحة" }, 401);
    }

    user.password = newPassword;
    await kv.set(`user:phone:${phone}`, user);

    return c.json({ success: true, message: "تم تغيير كلمة المرور بنجاح" });
  } catch (error) {
    console.error("Error changing password:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all packages
app.get("/packages", async (c) => {
  try {
    const packages = await kv.getByPrefix("package:");
    return c.json({ success: true, packages });
  } catch (error) {
    console.error("Error getting packages:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get package by ID
app.get("/packages/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const pkg = await kv.get(`package:${id}`);
    
    if (!pkg) {
      return c.json({ success: false, error: "الباقة غير موجودة" }, 404);
    }

    return c.json({ success: true, package: pkg });
  } catch (error) {
    console.error("Error getting package:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Purchase package
app.post("/purchase", async (c) => {
  try {
    const { phone, packageId, paymentMethod, code } = await c.req.json();

    const user = await kv.get(`user:phone:${phone}`);
    const pkg = await kv.get(`package:${packageId}`);

    if (!user || !pkg) {
      return c.json({ success: false, error: "المستخدم أو الباقة غير موجودة" }, 404);
    }

    let success = false;

    if (paymentMethod === 'wallet') {
      if (user.wallet >= pkg.price) {
        user.wallet -= pkg.price;
        success = true;
      } else {
        return c.json({ success: false, error: "رصيد المحفظة غير كافي" }, 400);
      }
    } else if (paymentMethod === 'code') {
      const purchaseCode = await kv.get(`code:${code}`);
      if (purchaseCode && !purchaseCode.used && purchaseCode.packageId === packageId) {
        purchaseCode.used = true;
        purchaseCode.usedBy = phone;
        purchaseCode.usedAt = new Date().toISOString();
        await kv.set(`code:${code}`, purchaseCode);
        success = true;
      } else {
        return c.json({ success: false, error: "الكود غير صحيح أو مستخدم من قبل" }, 400);
      }
    }

    if (success) {
      // Add package to user's subscriptions
      if (!user.subscriptions) user.subscriptions = [];
      user.subscriptions.push({
        packageId,
        purchasedAt: new Date().toISOString(),
        paymentMethod,
      });

      await kv.set(`user:phone:${phone}`, user);

      return c.json({ success: true, message: "تم شراء الباقة بنجاح" });
    }

    return c.json({ success: false, error: "فشلت عملية الشراء" }, 400);
  } catch (error) {
    console.error("Error purchasing package:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get user's subscribed packages
app.get("/my-packages/:phone", async (c) => {
  try {
    const phone = c.req.param('phone');
    const user = await kv.get(`user:phone:${phone}`);
    
    if (!user) {
      return c.json({ success: false, error: "المستخدم غير موجود" }, 404);
    }

    const subscriptions = user.subscriptions || [];
    const packages: any[] = [];

    for (const sub of subscriptions) {
      const pkg = await kv.get(`package:${sub.packageId}`);
      if (pkg) {
        packages.push({ ...pkg, purchasedAt: sub.purchasedAt });
      }
    }

    return c.json({ success: true, packages });
  } catch (error) {
    console.error("Error getting user packages:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get notifications
app.get("/notifications/:phone", async (c) => {
  try {
    const phone = c.req.param('phone');
    const notifications = await kv.getByPrefix(`notification:${phone}:`);
    
    return c.json({ success: true, notifications: notifications.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) });
  } catch (error) {
    console.error("Error getting notifications:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Mark notification as read
app.put("/notifications/:id/read", async (c) => {
  try {
    const id = c.req.param('id');
    const notification = await kv.get(id);
    
    if (!notification) {
      return c.json({ success: false, error: "الإشعار غير موجود" }, 404);
    }

    notification.read = true;
    notification.readAt = new Date().toISOString();
    await kv.set(id, notification);

    return c.json({ success: true, message: "تم تحديث الإشعار" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete notification
app.delete("/notifications/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(id);
    return c.json({ success: true, message: "تم حذف الإشعار" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get homework scores
app.get("/homework-scores/:phone", async (c) => {
  try {
    const phone = c.req.param('phone');
    const scores = await kv.getByPrefix(`homework:${phone}:`);
    
    return c.json({ success: true, scores });
  } catch (error) {
    console.error("Error getting homework scores:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get exam scores
app.get("/exam-scores/:phone", async (c) => {
  try {
    const phone = c.req.param('phone');
    const scores = await kv.getByPrefix(`exam:${phone}:`);
    
    return c.json({ success: true, scores });
  } catch (error) {
    console.error("Error getting exam scores:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Submit exam
app.post("/submit-exam", async (c) => {
  try {
    const { phone, examId, answers, timeTaken } = await c.req.json();

    const exam = await kv.get(`exam:data:${examId}`);
    if (!exam) {
      return c.json({ success: false, error: "الامتحان غير موجود" }, 404);
    }

    // Calculate score
    let correctAnswers = 0;
    const results: any[] = [];

    for (let i = 0; i < exam.questions.length; i++) {
      const question = exam.questions[i];
      const userAnswer = answers[i];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;

      results.push({
        questionId: i,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      });
    }

    const score = Math.round((correctAnswers / exam.questions.length) * 100);

    const submission = {
      phone,
      examId,
      score,
      correctAnswers,
      totalQuestions: exam.questions.length,
      timeTaken,
      results,
      submittedAt: new Date().toISOString(),
    };

    await kv.set(`exam:${phone}:${examId}`, submission);

    return c.json({ 
      success: true, 
      submission,
      message: "تم تسليم الامتحان بنجاح" 
    });
  } catch (error) {
    console.error("Error submitting exam:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get comprehensive exams
app.get("/comprehensive-exams", async (c) => {
  try {
    const exams = await kv.getByPrefix("exam:comprehensive:");
    return c.json({ success: true, exams });
  } catch (error) {
    console.error("Error getting comprehensive exams:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create package (Admin only)
app.post("/admin/create-package", async (c) => {
  try {
    const body = await c.req.json();
    const packageId = `pkg_${Date.now()}`;
    
    const pkg = {
      id: packageId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`package:${packageId}`, pkg);

    return c.json({ success: true, package: pkg, message: "تم إنشاء الباقة بنجاح" });
  } catch (error) {
    console.error("Error creating package:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);