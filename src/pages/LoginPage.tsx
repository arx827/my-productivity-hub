import React from 'react';
import { Link } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">登入您的帳戶</h2>
        <form>
          <Input id="email" label="電子郵件" type="email" placeholder="您的電子郵件" />
          <Input id="password" label="密碼" type="password" placeholder="您的密碼" />
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-blue-500">
                忘記密碼？
              </Link>
            </div>
          </div>
          <Button type="submit" className="w-full">登入</Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          還沒有帳戶？{' '}
          <Link to="/register" className="font-medium text-primary hover:text-blue-500">
            註冊
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;