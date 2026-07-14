import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const NoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 這裡將來會從 API 或狀態管理中獲取筆記詳情
  const note = {
    id: id,
    title: `筆記 ${id} 的標題`,
    content: `這是筆記 ${id} 的詳細內容。您可以在這裡查看筆記的所有細節。`,
    createdAt: '2026-07-28',
    updatedAt: '2026-07-29',
  };

  if (!note) {
    return <p>筆記未找到。</p>;
  }

  return (
    <div>
      <PageHeader title={`筆記詳情: ${note.title}`} description="查看和編輯筆記的詳細資訊。" />
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
        <p className="text-gray-700 mb-2">**建立日期:** {note.createdAt}</p>
        <p className="text-gray-700 mb-4">**更新日期:** {note.updatedAt}</p>
        <div className="prose max-w-none mb-4">
          <p>{note.content}</p>
        </div>
        <div className="flex space-x-4">
          <Link to={`/notes/${id}/edit`}>
            <Button variant="primary">編輯筆記</Button>
          </Link>
          <Button variant="outline" onClick={() => alert('刪除筆記功能待實作')}>刪除筆記</Button>
        </div>
      </Card>
      <Link to="/notes" className="text-primary hover:underline">返回筆記列表</Link>
    </div>
  );
};

export default NoteDetailPage;