import { FC, useReducer } from 'react';

import { mineSweeperReducer, initialStateFactory } from './reducer';
import MineSweeperContainer from './MineSweeperContainer';
import { MineSweeperDifficulty } from './config';

const MineSweeperModule: FC = () => {
  const [state, dispatch] = useReducer(
    mineSweeperReducer,
    initialStateFactory(MineSweeperDifficulty.BEGINNER)
  );

  return <MineSweeperContainer />;
};

export default MineSweeperModule;
