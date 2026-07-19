import React, { useState, useEffect, useCallback } from 'react';
import Button from '@/components/ui/Button';

interface PomodoroTimerProps {
  workDuration?: number; // 工作時間，單位分鐘
  breakDuration?: number; // 休息時間，單位分鐘
  longBreakDuration?: number; // 長休息時間，單位分鐘
  cyclesBeforeLongBreak?: number; // 多少個番茄鐘循環後進入長休息
  onCycleComplete?: (cycleCount: number) => void; // 每次循環完成的回調
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  workDuration = 25,
  breakDuration = 5,
  longBreakDuration = 15,
  cyclesBeforeLongBreak = 4,
  onCycleComplete,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(workDuration * 60); // 單位秒
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true); // true: 工作時間, false: 休息時間
  const [cycleCount, setCycleCount] = useState(0); // 完成的番茄鐘循環次數

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsWorkTime(true);
    setTimeRemaining(workDuration * 60);
  }, [workDuration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeRemaining === 0) {
      // 時間到
      clearInterval(Number(interval));
      if (isWorkTime) {
        // 工作時間結束，進入休息時間
        const newCycleCount = cycleCount + 1;
        setCycleCount(newCycleCount);
        onCycleComplete?.(newCycleCount);

        if (newCycleCount % cyclesBeforeLongBreak === 0) {
          // 長休息
          setTimeRemaining(longBreakDuration * 60);
          setIsWorkTime(false);
        } else {
          // 短休息
          setTimeRemaining(breakDuration * 60);
          setIsWorkTime(false);
        }
      } else {
        // 休息時間結束，進入工作時間
        setTimeRemaining(workDuration * 60);
        setIsWorkTime(true);
      }
      // 自動開始下一個階段
      setIsRunning(true); // 如果需要自動開始下一個階段，取消註釋此行
    }
    return () => {
      if (interval) {
        clearInterval(Number(interval));
      }
    };
  }, [isRunning, timeRemaining, isWorkTime, cycleCount, workDuration, breakDuration, longBreakDuration, cyclesBeforeLongBreak, onCycleComplete]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">番茄鐘計時器</h3>
      <div className="text-6xl font-bold mb-4">
        {formatTime(timeRemaining)}
      </div>
      <p className="text-lg mb-4">
        {isWorkTime ? '專注工作' : '休息一下'}
      </p>
      <div className="flex space-x-4">
        <Button onClick={toggleTimer}>
          {isRunning ? '暫停' : '開始'}
        </Button>
        <Button variant="outline" onClick={resetTimer}>
          重置
        </Button>
      </div>
      <p className="mt-4 text-gray-600">已完成番茄鐘循環: {cycleCount}</p>
    </div>
  );
};

export default PomodoroTimer;