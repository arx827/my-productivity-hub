import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import PomodoroTimer from '../components/PomodoroTimer';
import { useNotes } from '@/context/NotesContext';
import type { Task } from '@/types/task';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskCompletionChart from '@/components/TaskCompletionChart'; // 引入圖表組件

const API_BASE_URL = 'http://localhost:3001';

const DashboardPage: React.FC = () => {
  const { notes } = useNotes();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedPomodoroCycles, setCompletedPomodoroCycles] = useState(0);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const upcomingTasks = tasks.filter(
    (task) => task.status !== 'completed' && task.dueDate && task.dueDate >= today
  ).sort((a, b) => (a.dueDate && b.dueDate ? a.dueDate.localeCompare(b.dueDate) : 0));

  const recentNotes = notes.slice(0, 3); // 顯示最近的三則筆記

  const handlePomodoroCycleComplete = (cycleCount: number) => {
    setCompletedPomodoroCycles(cycleCount);
    // 這裡可以將完成的番茄鐘次數儲存到後端或本地儲存
    console.log(`完成 ${cycleCount} 個番茄鐘循環！`);
  };


  return (
    <div>
      <PageHeader title="儀表板" description="概覽您的任務、筆記和生產力數據。" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 今日任務 */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">今日/近期任務</h2>
            <Link to="/tasks">
              <Button variant="outline" size="sm">查看所有任務</Button>
            </Link>
          </div>
          {upcomingTasks.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {upcomingTasks.map((task) => (
                <li key={task.id} className="py-3 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-500">截止日期: {task.dueDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">目前沒有近期任務。</p>
          )}
        </Card>
        
        {/* 番茄鐘計時器 */}
        <PomodoroTimer onCycleComplete={handlePomodoroCycleComplete} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* 近期筆記 */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">近期筆記</h2>
            <Link to="/notes">
              <Button variant="outline" size="sm">查看所有筆記</Button>
            </Link>
          </div>
          {recentNotes.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {recentNotes.map((note) => (
                <li key={note.id} className="py-3">
                  <Link to={`/notes/${note.id}`} className="block">
                    <h3 className="text-lg font-medium text-primary hover:underline">{note.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{note.content.replace(/<[^>]*>?/gm, '')}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">目前沒有近期筆記。</p>
          )}
        </Card>
        
        {/* 生產力統計數據 (Placeholder) */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">生產力統計</h2>
          <TaskCompletionChart tasks={tasks} />
          <p className="mt-2">已完成番茄鐘循環總數: {completedPomodoroCycles}</p>
          {/* 未來將在此處添加圖表組件 */}
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;