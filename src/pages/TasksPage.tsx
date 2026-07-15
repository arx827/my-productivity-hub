import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import TaskForm from '@/components/TaskForm'; // 引入 TaskForm
import type { Task } from '@/types/task';
import { v4 as uuidv4 } from 'uuid'; // 用於生成唯一 ID
import axios from 'axios'; // 引入 axios

const API_BASE_URL = 'http://localhost:3001'; // JSON Server 的基礎 URL

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all'); // 新增篩選狀態
  const [searchTerm, setSearchTerm] = useState(''); // 新增搜尋關鍵字
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('createdAt'); // 新增排序依據
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // 新增排序順序

  // 從 API 獲取任務列表
  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // 模擬從後端獲取任務列表
  useEffect(() => {
    fetchTasks();
  }, []);

  // 過濾和排序任務列表
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // 狀態篩選
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // 搜尋
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 排序
    return filtered.sort((a, b) => {
      let compareValue = 0;
      if (sortBy === 'dueDate' && a.dueDate && b.dueDate) {
        compareValue = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
        compareValue = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'createdAt') {
        compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });
  }, [tasks, filterStatus, searchTerm, sortBy, sortOrder]);

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

  const confirmDeleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const handleSubmitTaskForm = async (data: { title: string; description?: string; priority: 'low' | 'medium' | 'high'; dueDate?: string; }) => {
    const now = new Date().toISOString();
    try {
      if (currentTask) {
        // 更新現有任務
        const updatedTask = {
          ...currentTask,
          title: data.title,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate,
          updatedAt: now,
        };
        await axios.put(`${API_BASE_URL}/tasks/${currentTask.id}`, updatedTask);
        setTasks(tasks.map(task => task.id === currentTask.id ? updatedTask : task));
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
        const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, newTask);
        setTasks([...tasks, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleToggleStatus = async (id: string) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;

    const newStatus = taskToUpdate.status === 'completed' ? 'todo' : 'completed';
    const updatedTask: Task = { ...taskToUpdate, status: newStatus, updatedAt: new Date().toISOString() };

    try {
      await axios.patch(`${API_BASE_URL}/tasks/${id}`, { status: newStatus, updatedAt: updatedTask.updatedAt });
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <div className="flex space-x-2 item-center">
          <Input 
            id="searchTasks" 
            placeholder="搜尋任務..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'todo' | 'in-progress' | 'completed')}
            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="all">所有狀態</option>
            <option value="todo">待辦</option>
            <option value="in-progress">進行中</option>
            <option value="completed">已完成</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'priority' | 'createdAt')}
            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="createdAt">建立日期</option>
            <option value="dueDate">截止日期</option>
            <option value="priority">優先級</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="desc">降序</option>
            <option value="asc">升序</option>
          </select>
        </div>
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
              {filteredAndSortedTasks.map((task) => (
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