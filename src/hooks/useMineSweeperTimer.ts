import { useState, useEffect, useCallback } from 'react';

import { GameStatus } from '@/components/modules/mineSweeper/config';

function useMineSweeperTimer(status: GameStatus): number {
  const [seconds, setSeconds] = useState(0);

  const addSecond = useCallback(() => {
    setSeconds(prevSec => prevSec + 1);
  }, []);

  useEffect(() => {
    let timer: number;

    switch (status) {
      case GameStatus.STARTED:
        timer = setInterval(addSecond, 1000) as unknown as number;
        break;
      case GameStatus.NEW:
        setSeconds(0);
        break;
      default:
        break;
    }

    return () => clearInterval(timer);
  }, [status, addSecond]);

  return seconds;
}

export default useMineSweeperTimer;
