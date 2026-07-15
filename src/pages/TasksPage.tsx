import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import TaskForm from '../components/TaskForm'; // 引入 TaskForm
import type { Task } from 'src/types/task';
import { v4 as uuidv4 } from 'uuid'; // 用於生成唯一 ID

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // 模擬從後端獲取任務列表
  useEffect(() => {
    // 在實際應用中，這裡會發送 API 請求
    const fetchedTasks: Task[] = [
      {
        id: '1',
        title: '完成 React 教學文件',
        description: '撰寫 React 從零到深入的教學文件，包含專案實作。',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2026-07-31',
        createdAt: '2026-07-01T10:00:00Z',
        updatedAt: '2026-07-28T15:30:00Z',
      },
      {
        id: '2',
        title: '規劃面試作品集專案', 
        description: '設計個人化任務與效能追蹤系統的架構和功能。',
        status: 'completed',
        priority: 'high',
        dueDate: '2026-07-20',
        createdAt: '2026-06-25T09:00:00Z',
        updatedAt: '2026-07-20T11:00:00Z',
      },
      {
        id: '3',
        title: '學習 Tailwind CSS', 
        description: '熟悉 Tailwind CSS 的實用工具類別和響應式設計。',
        status: 'todo',
        priority: 'medium',
        dueDate: '2026-08-05',
        createdAt: '2026-07-10T14:00:00Z',
        updatedAt: '2026-07-10T14:00:00Z',
      },
    ];
    setTasks(fetchedTasks);
  }, []);

  const handleAddTask = () => {
  setCurrentTask(null);
  setIsModalOpen(true);
};

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    setCurrentTask(task);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    setIsConfirmModalOpen(false);
  }

  const handleSubmitTaskForm = (data: { title: string; description?: string; priority: 'low' | 'medium' | 'high'; dueDate?: string; }) => {
    const now = new Date().toISOString();
    if (currentTask) {
      setTasks(tasks.map(task => 
        task.id === currentTask.id
          ? { 
              ...task, 
              title: data.title, 
              description: data.description, 
              priority: data.priority, 
              dueDate: data.dueDate, 
              updatedAt: now 
            }
          : task
      ));
    } else {
      const newTask: Task = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        status: 'todo',
        priority: data.priority,
        dueDate: data.dueDate,
        createdAt: now,
        updatedAt: now,
      };
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed', updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">高</span>;
      case 'medium': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">中</span>;
      case 'low': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">低</span>;
    }
  };

  const getStatusBadge = (status: 'todo' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'todo': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">待辦</span>;
      case 'in-progress': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">進行中</span>;
      case 'completed': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">已完成</span>;
    }
  };

  return (
    <div>
      <PageHeader title="任務" description="管理您的所有任務。" />
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddTask}>新增任務</Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">標題</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">優先級</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止日期</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">操作</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input 
                      type="checkbox" 
                      checked={task.status === 'completed'} 
                      onChange={() => handleToggleStatus(task.id)} 
                      className="mr-2 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    {task.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getPriorityBadge(task.priority)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate || '無'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadge(task.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditTask(task)}>編輯</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task)}>刪除</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentTask ? '編輯任務' : '新增任務'}>
        <TaskForm 
          onSubmit={handleSubmitTaskForm} 
          defaultValues={currentTask || undefined} 
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* 刪除確認 Modal */}
      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="確認刪除">
        <div className="space-y-4">
          <p>您確定要刪除任務 "{currentTask?.title}" 嗎？此操作無法復原。</p>
          <Button variant="danger" onClick={() => {
            if (currentTask) {
              confirmDeleteTask(currentTask.id);
            }
          }} className="w-full">
            確定刪除
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TasksPage;