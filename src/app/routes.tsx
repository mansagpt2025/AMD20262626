import { createBrowserRouter, Navigate } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { TechnicalSupportPage } from './pages/TechnicalSupportPage';
import { AcademicSupportPage } from './pages/AcademicSupportPage';
import { ContactPage } from './pages/ContactPage';
import { MyProfilePage } from './pages/MyProfilePage';
import { WalletChargePage } from './pages/WalletChargePage';
import { PackagesPage } from './pages/PackagesPage';
import { MyClassesPage } from './pages/MyClassesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { FreeClassesPage } from './pages/FreeClassesPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { GradeManagementPage } from './pages/GradeManagementPage';
import { NotificationsManagementPage } from './pages/NotificationsManagementPage';
import { UserBanManagementPage } from './pages/UserBanManagementPage';
import { WalletManagementPage } from './pages/WalletManagementPage';
import { CodesManagementPage } from './pages/CodesManagementPage';
import { PackageContentPage } from './pages/PackageContentPage';
import { VideoViewerPage } from './pages/VideoViewerPage';
import { PDFViewerPage } from './pages/PDFViewerPage';
import { MCQExamPage } from './pages/MCQExamPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/technical-support',
    element: <TechnicalSupportPage />,
  },
  {
    path: '/academic-support',
    element: <AcademicSupportPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute requiredRole="student">
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my',
    element: (
      <ProtectedRoute requiredRole="student">
        <MyProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/charge',
    element: (
      <ProtectedRoute requiredRole="student">
        <WalletChargePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/classes',
    element: (
      <ProtectedRoute requiredRole="student">
        <PackagesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-classes',
    element: (
      <ProtectedRoute requiredRole="student">
        <MyClassesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications',
    element: (
      <ProtectedRoute requiredRole="student">
        <NotificationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/free',
    element: (
      <ProtectedRoute requiredRole="student">
        <FreeClassesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/md/200/9/p',
    element: (
      <ProtectedRoute requiredRole="student">
        <ChangePasswordPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/eldeeb/200/9',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/eldeeb/200/9/1',
    element: (
      <ProtectedRoute requiredRole="admin">
        <GradeManagementPage grade="1" />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/eldeeb/200/9/2',
    element: (
      <ProtectedRoute requiredRole="admin">
        <GradeManagementPage grade="2" />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/eldeeb/200/9/3',
    element: (
      <ProtectedRoute requiredRole="admin">
        <GradeManagementPage grade="3" />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/eldeeb/200/9/n',
    element: (
      <ProtectedRoute requiredRole="admin">
        <NotificationsManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/eldeeb/200/9/b',
    element: (
      <ProtectedRoute requiredRole="admin">
        <UserBanManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/eldeeb/200/9/w',
    element: (
      <ProtectedRoute requiredRole="admin">
        <WalletManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/anas/eldeeb/200/9/cl',
    element: (
      <ProtectedRoute requiredRole="admin">
        <CodesManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/package/content',
    element: (
      <ProtectedRoute requiredRole="student">
        <PackageContentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/viewer/video',
    element: (
      <ProtectedRoute requiredRole="student">
        <VideoViewerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/viewer/pdf',
    element: (
      <ProtectedRoute requiredRole="student">
        <PDFViewerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/viewer/mcq',
    element: (
      <ProtectedRoute requiredRole="student">
        <MCQExamPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);