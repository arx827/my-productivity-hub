import React from 'react';
import PageHeader from '../components/PageHeader';

const TasksPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="任務" description="管理您的所有任務。" />
      {/* 未來將在此處添加任務列表、篩選、排序等功能 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">所有任務</h2>
        {/* 任務列表組件 */}
        <p>任務列表將顯示在這裡。</p>
      </div>
    </div>
  );
};

export default TasksPage;