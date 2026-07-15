import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { Task } from '@/types/task';

// 安裝 @hookform/resolvers: npm install @hookform/resolvers

const taskSchema = z.object({
  title: z.string().min(1, { message: '任務標題不能為空' }),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
});

type TaskFormInputs = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: TaskFormInputs) => void;
  defaultValues?: Partial<Task>;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, defaultValues, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      priority: defaultValues?.priority || 'medium',
      dueDate: defaultValues?.dueDate || '',
    },
  });

  useEffect(() => {
    reset({
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      priority: defaultValues?.priority || 'medium',
      dueDate: defaultValues?.dueDate || '',
    });
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="title"
        label="任務標題"
        {...register('title')}
        error={errors.title?.message}
        placeholder="輸入任務標題"
      />
      <Input
        id="description"
        label="任務描述"
        {...register('description')}
        error={errors.description?.message}
        placeholder="輸入任務描述 (可選)"
      />
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">優先級</label>
        <select
          id="priority"
          {...register('priority')}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
        {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>}
      </div>
      <Input
        id="dueDate"
        label="截止日期"
        type="date"
        {...register('dueDate')}
        error={errors.dueDate?.message}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>取消</Button>
        <Button type="submit">{defaultValues ? '更新任務' : '建立任務'}</Button>
      </div>
    </form>
  );
};

export default TaskForm;