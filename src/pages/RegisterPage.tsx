import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const registerSchema = z.object({
  name: z.string().min(1, { message: '使用者名稱不能為空' }),
  email: z.string().email({ message: '請輸入有效的電子郵件地址' }),
  password: z.string().min(6, { message: '密碼至少需要 6 個字元' }),
  confirmPassword: z.string().min(6, { message: '請確認密碼' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: '兩次輸入的密碼不一致',
  path: ['confirmPassword'],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // 模擬註冊 API 請求
      await axios.post(`${API_BASE_URL}/register`, { 
        name: data.name, 
        email: data.email, 
        password: data.password 
      });
      alert('註冊成功！請登入。');
      navigate('/login'); // 註冊成功後導向登入頁面
    } catch (error) {
      console.error('註冊失敗:', error);
      alert('註冊失敗，請稍後再試。');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">建立新帳戶</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input id="name" label="使用者名稱" type="text" placeholder="您的使用者名稱" {...register('name')} error={errors.name?.message} />
          <Input id="email" label="電子郵件" type="email" placeholder="您的電子郵件" {...register('email')} error={errors.email?.message} />
          <Input id="password" label="密碼" type="password" placeholder="您的密碼" {...register('password')} error={errors.password?.message} />
          <Input id="confirm-password" label="確認密碼" type="password" placeholder="再次輸入密碼" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>註冊</Button>
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