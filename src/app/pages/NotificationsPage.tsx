import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Bell, Trash2, Mail, MailOpen } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  readAt?: string;
}

export function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/notifications/${user.phone}`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );

      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading notifications:', error);
      toast.error('حدث خطأ أثناء تحميل الإشعارات');
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    setSelectedNotification(notification);
    setDialogOpen(true);

    // Mark as read if not already read
    if (!notification.read) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/server/notifications/${notification.id}/read`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          // Update local state
          setNotifications(prev =>
            prev.map(n =>
              n.id === notification.id
                ? { ...n, read: true, readAt: new Date().toISOString() }
                : n
            )
          );
        }
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  const handleDeleteNotification = async (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/notifications/${notificationId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        toast.success('تم حذف الإشعار');
        setDialogOpen(false);
      } else {
        toast.error('حدث خطأ أثناء حذف الإشعار');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('حدث خطأ أثناء حذف الإشعار');
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
    return date.toLocaleDateString('ar-EG');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري تحميل الإشعارات...</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">الإشعارات</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              لا توجد إشعارات
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              سيتم عرض جميع الإشعارات والتحديثات هنا
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <Card
                    onClick={() => handleNotificationClick(notification)}
                    className={`cursor-pointer shadow-md hover:shadow-xl transition-all border-r-4 ${
                      notification.read
                        ? 'bg-white/60 dark:bg-gray-800/60 border-r-gray-300 dark:border-r-gray-600'
                        : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-r-blue-500'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.read
                              ? 'bg-gray-200 dark:bg-gray-700'
                              : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                          }`}>
                            {notification.read ? (
                              <MailOpen className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <Mail className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-bold text-lg ${
                                notification.read
                                  ? 'text-gray-700 dark:text-gray-300'
                                  : 'text-blue-900 dark:text-blue-100'
                              }`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-xs">
                                  جديد
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                              <span>{getTimeAgo(notification.createdAt)}</span>
                              {notification.read && notification.readAt && (
                                <span className="text-xs">قُرئ: {getTimeAgo(notification.readAt)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDeleteNotification(notification.id, e)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Notification Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-right">
              {selectedNotification?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedNotification?.message}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>تم الإرسال: {selectedNotification && new Date(selectedNotification.createdAt).toLocaleString('ar-EG')}</span>
              {selectedNotification?.read && selectedNotification.readAt && (
                <span>قُرئ: {new Date(selectedNotification.readAt).toLocaleString('ar-EG')}</span>
              )}
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setDialogOpen(false)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                إغلاق
              </Button>
              {selectedNotification && (
                <Button
                  variant="outline"
                  onClick={(e) => {
                    handleDeleteNotification(selectedNotification.id, e);
                  }}
                  className="text-red-500 hover:text-red-700 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4 ml-2" />
                  حذف
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

