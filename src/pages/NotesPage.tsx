import React from 'react';
import PageHeader from '../components/PageHeader';

const NotesPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="筆記" description="記錄您的想法和靈感。" />
      {/* 未來將在此處添加筆記列表、編輯器等功能 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">所有筆記</h2>
        {/* 筆記列表組件 */}
        <p>筆記列表將顯示在這裡。</p>
      </div>
    </div>
  );
};

export default NotesPage;