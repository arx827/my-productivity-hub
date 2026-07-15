import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Note } from '@/types/note';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

interface NotesContextType {
  notes: Note[];
  addNote: (title: string, content: string) => Promise<void>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  fetchNotes: () => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get<Note[]>(`${API_BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (title: string, content: string) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };
    try {
      const response = await axios.post<Note>(`${API_BASE_URL}/notes`, newNote);
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    const now = new Date().toISOString();
    const updatedNote = { title, content, updatedAt: now };
    try {
      await axios.patch(`${API_BASE_URL}/notes/${id}`, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note))
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, fetchNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};