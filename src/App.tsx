import { Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import ProtectedRoute from '@/components/ProtectedRoute'; // 引入 ProtectedRoute
import { NotesProvider } from '@/context/NotesContext'; // 引入 NotesProvider

// ... (引入所有頁面組件)
import DashboardPage from '@/pages/DashboardPage';
import TasksPage from '@/pages/TasksPage';
import TaskDetailPage from '@/pages/TaskDetailPage';
import NotesPage from '@/pages/NotesPage';
import NoteDetailPage from '@/pages/NoteDetailPage';
import SettingsPage from '@/pages/SettingsPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

function App() {
  const isAuthenticated = true; // 模擬使用者已登入，未來會從認證狀態獲取
  
  return (
    <NotesProvider> {/* 將 NotesProvider 包裹在頂層 */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}> {/* 保護所有巢狀路由 */}
          <Route path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/tasks/:id" element={<TaskDetailPage />} /> 
                  <Route path="/notes" element={<NotesPage />} />
                  <Route path="/notes/:id" element={<NoteDetailPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  {/* 巢狀路由和動態路由將在此處添加 */}
                </Routes>
              </Layout>
            }
          />
        </Route>
      </Routes>
    </NotesProvider>
  );
}

export default App;