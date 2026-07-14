import React from 'react';
import PageHeader from '../components/PageHeader';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="儀表板" description="概覽您的任務、筆記和生產力數據。" />
      {/* 未來將在此處添加儀表板的具體內容，例如任務摘要、生產力圖表等 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">今日任務</div>
        <div className="bg-white p-6 rounded-lg shadow">生產力趨勢</div>
        <div className="bg-white p-6 rounded-lg shadow">番茄鐘</div>
        <div className="bg-white p-6 rounded-lg shadow">近期筆記</div>
      </div>
    </div>
  );
};

export default DashboardPage;