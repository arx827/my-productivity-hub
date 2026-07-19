import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // 更新 state 以便下一次渲染將顯示備用 UI
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // 您也可以將錯誤報告給錯誤日誌服務
  }

  public render() {
    if (this.state.hasError) {
      // 您可以渲染任何自訂的備用 UI
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
          <h1 className="text-2xl font-bold">抱歉，發生了一些錯誤。</h1>
          <p className="mt-4">請嘗試重新整理頁面或稍後再試。</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;