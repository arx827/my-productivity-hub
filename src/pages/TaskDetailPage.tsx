import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 獲取 URL 中的動態參數 id

  // 這裡將來會從 API 或狀態管理中獲取任務詳情
  const task = {
    id: id,
    title: `任務 ${id} 的標題`,
    description: `這是任務 ${id} 的詳細描述。您可以在這裡查看任務的所有細節。`,
    priority: '高',
    dueDate: '2026-07-30',
    status: '進行中',
  };

  if (!task) {
    return <p>任務未找到。</p>;
  }

  return (
    <div>
      <PageHeader title={`任務詳情: ${task.title}`} description="查看和編輯任務的詳細資訊。" />
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p className="text-gray-700 mb-2">**描述:** {task.description}</p>
        <p className="text-gray-700 mb-2">**優先級:** <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">{task.priority}</span></p>
        <p className="text-gray-700 mb-2">**截止日期:** {task.dueDate}</p>
        <p className="text-gray-700 mb-4">**狀態:** <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">{task.status}</span></p>
        <div className="flex space-x-4">
          <Link to={`/tasks/${id}/edit`}>
            <Button variant="primary">編輯任務</Button>
          </Link>
          <Button variant="outline" onClick={() => alert('刪除任務功能待實作')}>刪除任務</Button>
        </div>
      </Card>
      <Link to="/tasks" className="text-primary hover:underline">返回任務列表</Link>
    </div>
  );
};

export default TaskDetailPage;