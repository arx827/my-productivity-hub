import React from 'react';
import { Link } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">建立新帳戶</h2>
        <form>
          <Input id="name" label="使用者名稱" type="text" placeholder="您的使用者名稱" />
          <Input id="email" label="電子郵件" type="email" placeholder="您的電子郵件" />
          <Input id="password" label="密碼" type="password" placeholder="您的密碼" />
          <Input id="confirm-password" label="確認密碼" type="password" placeholder="再次輸入密碼" />
          <Button type="submit" className="w-full mt-6">註冊</Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          已經有帳戶？{' '}
          <Link to="/login" className="font-medium text-primary hover:text-blue-500">
            登入
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;