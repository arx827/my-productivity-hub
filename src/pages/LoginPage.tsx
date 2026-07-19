import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore'; // 引入 Zustand store

const API_BASE_URL = 'http://localhost:3001';

const loginSchema = z.object({
  email: z.string().email({ message: '請輸入有效的電子郵件地址' }),
  password: z.string().min(6, { message: '密碼至少需要 6 個字元' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // 從 Zustand 獲取 login 函數
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // 模擬登入 API 請求
      const response = await axios.post(`${API_BASE_URL}/login`, { 
        email: data.email, 
        password: data.password 
      });

      // 假設後端返回一個 token
      // const { accessToken, user } = response.data;

      // TEST:
      const { accessToken, user } = {accessToken: 'testAccessToken', user: {id: '827', name: 'Eason', email: 'john@example.com'}};
      
      login(accessToken, user); // 使用 Zustand 的 login 函數更新狀態
      alert('登入成功！');
      navigate('/'); // 登入成功後導向儀表板
    } catch (error) {
      console.error('登入失敗:', error);
      alert('登入失敗，請檢查您的電子郵件和密碼。');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">登入您的帳戶</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input id="email" label="電子郵件" type="email" placeholder="您的電子郵件" {...register('email')} error={errors.email?.message}/>
          <Input id="password" label="密碼" type="password" placeholder="您的密碼" {...register('password')} error={errors.password?.message}/>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-blue-500">
                忘記密碼？
              </Link>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>登入</Button>
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