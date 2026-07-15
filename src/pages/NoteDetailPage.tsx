import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useNotes } from '@/context/NotesContext';
import type { Note } from '@/types/note';

const NoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { notes, deleteNote } = useNotes();
  const [note, setNote] = useState<Note | undefined>(undefined);

  useEffect(() => {
    setNote(notes.find(n => n.id === id));
  }, [id, notes]);

  const handleDelete = async () => {
    if (note && window.confirm('確定要刪除這則筆記嗎？')) {
      await deleteNote(note.id);
      // 刪除後導航回筆記列表頁
      // history.push('/notes'); // 在 React Router v6 中使用 useNavigate
    }
  };

  if (!note) {
    return <p>筆記未找到。</p>;
  }

  return (
    <div>
      <PageHeader title={`筆記詳情: ${note.title}`} description="查看和編輯筆記的詳細資訊。" />
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
        <p className="text-gray-700 mb-2">**建立日期:** {new Date(note.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-4">**更新日期:** {new Date(note.updatedAt).toLocaleDateString()}</p>
        <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: note.content }}></div>
        <div className="flex space-x-4">
          <Link to={`/notes/${note.id}/edit`}> {/* 這裡需要一個編輯頁面路由 */}
            <Button variant="primary">編輯筆記</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>刪除筆記</Button>
        </div>
      </Card>
      <Link to="/notes" className="text-primary hover:underline">返回筆記列表</Link>
    </div>
  );
};

export default NoteDetailPage;