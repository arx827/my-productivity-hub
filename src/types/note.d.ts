export interface Note {
  id: string; // 筆記唯一識別符
  title: string; // 筆記標題
  content: string; // 筆記內容 (支援富文本 HTML 字符串)
  createdAt: string; // 建立時間
  updatedAt: string; // 更新時間
}