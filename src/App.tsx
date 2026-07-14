import { Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import PageHeader from './components/PageHeader';

// 引入頁面組件 (稍後會建立)
const DashboardPage = () => (
  <>
    <PageHeader title="儀表板" description="概覽您的任務、筆記和生產力數據。" />
    <p>儀表板內容</p>
  </>
);
const TasksPage = () => (
  <>
    <PageHeader title="任務" description="管理您的所有任務。" />
    <p>任務列表內容</p>
  </>
);
const NotesPage = () => (
  <>
    <PageHeader title="筆記" description="記錄您的想法和靈感。" />
    <p>筆記列表內容</p>
  </>
);
const SettingsPage = () => (
  <>
    <PageHeader title="設定" description="調整您的個人偏好。" />
    <p>設定內容</p>
  </>
);
const LoginPage = () => (
  <>
    <PageHeader title="登入" description="請輸入您的帳號密碼。" />
    <p>登入表單</p>
  </>
);
const RegisterPage = () => (
  <>
    <PageHeader title="註冊" description="建立一個新帳號。" />
    <p>註冊表單</p>
  </>
);

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
              <Route path="/notes" element={<NotesPage />} />
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