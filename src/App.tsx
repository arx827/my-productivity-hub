import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import ProtectedRoute from '@/components/ProtectedRoute'; // 引入 ProtectedRoute
import { NotesProvider } from '@/context/NotesContext'; // 引入 NotesProvider
import { Toaster } from 'react-hot-toast'; // 引入 Toaster

// 使用 React.lazy 延遲載入頁面組件
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const TasksPage = lazy(() => import('@/pages/TasksPage'));
const TaskDetailPage = lazy(() => import('@/pages/TaskDetailPage'));
const NotesPage = lazy(() => import('@/pages/NotesPage'));
const NoteDetailPage = lazy(() => import('@/pages/NoteDetailPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));


function App() {
  // const isAuthenticated = true; // 移除此行
  
  return (
    <NotesProvider> {/* 將 NotesProvider 包裹在頂層 */}
      <Toaster /> {/* 添加 Toaster 組件 */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<ProtectedRoute />}> {/* 不再傳遞 isAuthenticated */}
          <Route path="/*"
            element={
              <Layout>
                <Suspense fallback={<div>載入中...</div>}> {/* 顯示載入指示器 */}
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/tasks/:id" element={<TaskDetailPage />} /> 
                    <Route path="/notes" element={<NotesPage />} />
                    <Route path="/notes/:id" element={<NoteDetailPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </Suspense>
              </Layout>
            }
          />
        </Route>
      </Routes>
    </NotesProvider>
  );
}

export default App;