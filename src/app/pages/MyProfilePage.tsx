import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, User, Award, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function MyProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [homeworkScores, setHomeworkScores] = useState<any[]>([]);
  const [examScores, setExamScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);

      // Load homework scores
      const homeworkRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/homework-scores/${userData.phone}`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const homeworkData = await homeworkRes.json();
      if (homeworkData.success) {
        setHomeworkScores(homeworkData.scores);
      }

      // Load exam scores
      const examRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/exam-scores/${userData.phone}`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const examData = await examRes.json();
      if (examData.success) {
        setExamScores(examData.scores);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" dir="rtl">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <BookOpen className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  البارع محمود الديب
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">منصة التفوق الأكاديمي</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <span className="font-semibold">العودة</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-md">
              <TabsTrigger 
                value="info" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <User className="w-4 h-4 ml-2" />
                المعلومات الشخصية
              </TabsTrigger>
              <TabsTrigger 
                value="homework"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <BookOpen className="w-4 h-4 ml-2" />
                درجات الواجب
              </TabsTrigger>
              <TabsTrigger 
                value="exams"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Award className="w-4 h-4 ml-2" />
                درجات الامتحانات
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="info">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <User className="w-6 h-6" />
                      المعلومات الشخصية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InfoField label="الاسم الكامل" value={`${user?.first_name || ''} ${user?.last_name || ''}`} />
                      <InfoField label="كود الطالب" value={user?.student_code || 'غير متوفر'} badge />
                      <InfoField label="رقم الهاتف" value={user?.phone || 'غير متوفر'} />
                      <InfoField label="رقم هاتف ولي الأمر" value={user?.parent_phone || 'غير متوفر'} />
                      <InfoField label="الصف الدراسي" value={user?.grade || 'غير متوفر'} />
                      <InfoField label="الشعبة" value={user?.division || 'غير متوفر'} />
                      <InfoField label="المحافظة" value={user?.governorate || 'غير متوفر'} />
                      <InfoField label="المدينة" value={user?.city || 'غير متوفر'} />
                      <InfoField label="تاريخ الميلاد" value={user?.birth_date || 'غير متوفر'} />
                      <InfoField label="النوع" value={user?.gender === 'male' ? 'ذكر' : user?.gender === 'female' ? 'أنثى' : 'غير متوفر'} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Homework Scores Tab */}
            <TabsContent value="homework">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-xl">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <BookOpen className="w-6 h-6" />
                      درجات الواجبات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {homeworkScores.length === 0 ? (
                      <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد واجبات محلولة بعد</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-900">
                              <TableHead className="text-right font-bold">الترتيب</TableHead>
                              <TableHead className="text-right font-bold">الباقة</TableHead>
                              <TableHead className="text-right font-bold">الأسبوع</TableHead>
                              <TableHead className="text-right font-bold">اسم الواجب</TableHead>
                              <TableHead className="text-right font-bold">الدرجة</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {homeworkScores.map((score, index) => (
                              <motion.tr
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                              >
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{score.packageName}</TableCell>
                                <TableCell>{score.week}</TableCell>
                                <TableCell>{score.homeworkName}</TableCell>
                                <TableCell>
                                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">
                                    {score.score} / {score.totalScore}
                                  </Badge>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Exam Scores Tab */}
            <TabsContent value="exams">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Award className="w-6 h-6" />
                      درجات الامتحانات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {examScores.length === 0 ? (
                      <div className="text-center py-12">
                        <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد امتحانات محلولة بعد</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-900">
                              <TableHead className="text-right font-bold">الترتيب</TableHead>
                              <TableHead className="text-right font-bold">الباقة</TableHead>
                              <TableHead className="text-right font-bold">الأسبوع</TableHead>
                              <TableHead className="text-right font-bold">اسم الامتحان</TableHead>
                              <TableHead className="text-right font-bold">الدرجة</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {examScores.map((score, index) => (
                              <motion.tr
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                              >
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{score.packageName}</TableCell>
                                <TableCell>{score.week}</TableCell>
                                <TableCell>{score.examName}</TableCell>
                                <TableCell>
                                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                                    {score.score} / {score.totalScore}
                                  </Badge>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

function InfoField({ label, value, badge = false }: { label: string; value: string; badge?: boolean }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">{label}</p>
      {badge ? (
        <Badge className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1">
          {value}
        </Badge>
      ) : (
        <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
      )}
    </motion.div>
  );
}

