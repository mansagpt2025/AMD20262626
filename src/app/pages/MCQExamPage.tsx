import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, CheckCircle, XCircle, Award, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
}

export function MCQExamPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const examId = searchParams.get('id');
  const examType = searchParams.get('type') || 'homework'; // homework or exam

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock exam data - replace with Supabase call
  const exam = {
    id: examId,
    title: examType === 'homework' ? 'واجب الدرس الأول' : 'امتحان الشهر الأول',
    description: 'اختبار شامل على المنهج',
    total_marks: 50,
    passing_marks: 25,
    duration: 3600, // seconds
    questions: [
      {
        id: 1,
        question: 'ما هو ناتج 2 + 2؟',
        options: ['3', '4', '5', '6'],
        correct_answer: 1,
        explanation: 'ناتج جمع 2 + 2 يساوي 4',
      },
      {
        id: 2,
        question: 'ما هي عاصمة مصر؟',
        options: ['الإسكندرية', 'القاهرة', 'أسوان', 'الأقصر'],
        correct_answer: 1,
        explanation: 'القاهرة هي عاصمة جمهورية مصر العربية',
      },
      {
        id: 3,
        question: 'كم عدد أيام السنة؟',
        options: ['360', '364', '365', '366'],
        correct_answer: 2,
        explanation: 'السنة العادية تحتوي على 365 يوم',
      },
      {
        id: 4,
        question: 'ما هو لون السماء؟',
        options: ['أحمر', 'أخضر', 'أزرق', 'أصفر'],
        correct_answer: 2,
        explanation: 'السماء زرقاء بسبب انتثار الضوء في الغلاف الجوي',
      },
      {
        id: 5,
        question: 'كم عدد قارات العالم؟',
        options: ['5', '6', '7', '8'],
        correct_answer: 2,
        explanation: 'يوجد 7 قارات في العالم',
      },
    ] as Question[],
  };

  useEffect(() => {
    if (!isSubmitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSubmitted, timeRemaining]);

  useEffect(() => {
    // Prevent page refresh
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitted]);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    if (!isSubmitted) {
      setAnswers({ ...answers, [questionId]: answerIndex });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < exam.questions.length) {
      const confirmSubmit = confirm('لم تجب على جميع الأسئلة. هل تريد التسليم؟');
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    setShowResults(true);
    // TODO: Save results to database
  };

  const calculateScore = () => {
    let correct = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correct_answer) {
        correct++;
      }
    });
    return {
      correct,
      total: exam.questions.length,
      percentage: Math.round((correct / exam.questions.length) * 100),
      marks: Math.round((correct / exam.questions.length) * exam.total_marks),
    };
  };

  const score = calculateScore();
  const passed = score.marks >= exam.passing_marks;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                نتيجة الامتحان
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br ${
              passed ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'
            } rounded-2xl shadow-2xl p-8 text-white text-center mb-8`}
          >
            <Award className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-2">{score.percentage}%</h2>
            <p className="text-2xl mb-4">{score.marks} / {exam.total_marks}</p>
            <p className="text-xl mb-2">
              {score.correct} إجابة صحيحة من {score.total}
            </p>
            <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold ${
              passed ? 'bg-white text-green-600' : 'bg-white text-red-600'
            }`}>
              {passed ? '✓ ناجح' : '✗ راسب'}
            </div>
          </motion.div>

          {/* Detailed Results */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              الإجابات التفصيلية
            </h3>
            {exam.questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct_answer;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 ${
                    isCorrect ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        السؤال {index + 1}: {question.question}
                      </h4>
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg ${
                              optionIndex === question.correct_answer
                                ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                                : 'bg-gray-100 dark:bg-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {optionIndex === question.correct_answer && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                              <span className={`${
                                optionIndex === question.correct_answer
                                  ? 'text-green-900 dark:text-green-300 font-bold'
                                  : optionIndex === userAnswer && !isCorrect
                                  ? 'text-red-900 dark:text-red-300'
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {option}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-bold text-blue-900 dark:text-blue-300 mb-1">
                                التوضيح:
                              </p>
                              <p className="text-blue-800 dark:text-blue-400">
                                {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = exam.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {exam.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white font-bold font-mono">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              السؤال {currentQuestion + 1} من {exam.questions.length}
            </span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              الإجابات: {Object.keys(answers).length} / {exam.questions.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / exam.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-right">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  className={`w-full p-6 rounded-xl text-right font-medium transition-all border-2 ${
                    answers[question.id] === index
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-600 shadow-lg scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers[question.id] === index
                        ? 'border-white bg-white text-amber-600'
                        : 'border-gray-400 dark:border-gray-500'
                    }`}>
                      {answers[question.id] === index && <CheckCircle className="w-6 h-6" />}
                    </div>
                    <span className="flex-1 text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 gap-4">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                السؤال السابق
              </button>

              {currentQuestion === exam.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  تسليم الامتحان
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(exam.questions.length - 1, prev + 1))}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  السؤال التالي
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Question Navigator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-right">
            الانتقال السريع للأسئلة
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`aspect-square rounded-lg font-bold transition-all ${
                  currentQuestion === index
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white scale-110'
                    : answers[exam.questions[index].id] !== undefined
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
