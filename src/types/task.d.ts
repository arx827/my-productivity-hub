export interface Task {
  id: string; // 任務唯一識別符
  title: string; // 任務標題
  description?: string; // 任務描述 (可選)
  status: 'todo' | 'in-progress' | 'completed'; // 任務狀態
  priority: 'low' | 'medium' | 'high'; // 任務優先級
  dueDate?: string; // 截止日期 (ISO 格式，例如 'YYYY-MM-DD')
  createdAt: string; // 建立時間
  updatedAt: string; // 更新時間
}