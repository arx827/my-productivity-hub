import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'; // 引入 ErrorBoundary

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary> {/* 包裹 App 組件 */}
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
