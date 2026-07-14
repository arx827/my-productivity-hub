import { Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/Layout';

import DashboardPage from '@/pages/DashboardPage';
import TasksPage from '@/pages/TasksPage';
import NotesPage from '@/pages/NotesPage';
import SettingsPage from '@/pages/SettingsPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import TaskDetailPage from '@/pages/TaskDetailPage';
import NoteDetailPage from '@/pages/NoteDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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
    </Routes>
  );
}

export default App;