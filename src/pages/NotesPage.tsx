import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { useNotes } from '@/context/NotesContext';
import type { Note } from '@/types/note';
import { Link } from 'react-router-dom';
import NoteEditor from '@/components/NoteEditor'; // 引入 NoteEditor

const NotesPage: React.FC = () => {
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState(''); // 整合富文本編輯器
  const [searchTerm, setSearchTerm] = useState(''); // 新增搜尋關鍵字狀態

  // 過濾筆記列表
  const filteredNotes = useMemo(() => {
    if (!searchTerm) {
      return notes;
    }
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  const handleAddNote = () => {
    setCurrentNote(null);
    setNoteTitle('');
    setNoteContent('');
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setIsModalOpen(true);
  };

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('確定要刪除這則筆記嗎？')) {
      await deleteNote(id);
    }
  };

  const handleSubmitNote = async () => {
    if (!noteTitle.trim()) return;

    if (currentNote) {
      await updateNote(currentNote.id, noteTitle, noteContent);
    } else {
      await addNote(noteTitle, noteContent);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageHeader title="筆記" description="記錄您的想法和靈感。" />
      <div className="flex justify-between items-center mb-4">
        <Input 
          id="searchNotes" 
          placeholder="搜尋筆記..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs"
        />
        <Button onClick={handleAddNote}>新增筆記</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content.replace(/<[^>]*>?/gm, '')}</p> {/* 移除 HTML 標籤顯示摘要 */}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Link to={`/notes/${note.id}`}>
                <Button variant="outline" size="sm">查看</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => handleEditNote(note)}>編輯</Button>
              <Button variant="danger" size="sm" onClick={() => handleDeleteNote(note.id)}>刪除</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentNote ? '編輯筆記' : '新增筆記'}>
        <div className="space-y-4">
          <Input
            id="noteTitle"
            label="筆記標題"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="輸入筆記標題"
          />
          <div>
            <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700 mb-1">筆記內容</label>
            <NoteEditor
              value={noteContent}
              onChange={setNoteContent}
              placeholder="輸入筆記內容..."
            />
          </div>
          <Button onClick={handleSubmitNote} className="w-full mt-4">
            {currentNote ? '更新筆記' : '建立筆記'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NotesPage;