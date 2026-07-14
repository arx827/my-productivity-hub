import React from 'react';
import PageHeader from '../components/PageHeader';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="設定" description="調整您的個人偏好。" />
      {/* 未來將在此處添加設定選項，例如個人資料、主題切換等 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">帳戶設定</h2>
        <p>設定選項將顯示在這裡。</p>
      </div>
    </div>
  );
};

export default SettingsPage;