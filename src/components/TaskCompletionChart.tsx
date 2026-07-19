import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Task } from '@/types/task';

interface TaskCompletionChartProps {
  tasks: Task[];
}

const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ tasks }) => {
  // 處理數據以適應圖表格式
  const processData = () => {
    const dailyCompletions: { [key: string]: number } = {};
    tasks.forEach(task => {
      if (task.status === 'completed' && task.updatedAt) {
        const date = new Date(task.updatedAt).toISOString().split('T')[0];
        dailyCompletions[date] = (dailyCompletions[date] || 0) + 1;
      }
    });

    const data = Object.keys(dailyCompletions).sort().map(date => ({
      date,
      completedTasks: dailyCompletions[date],
    }));
    return data;
  };

  const data = processData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completedTasks" stroke="#8884d8" activeDot={{ r: 8 }} name="完成任務數" />
      </LineChart>
    </ResponsiveContainer>
  )
};

export default TaskCompletionChart;