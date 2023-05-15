import { FC, useCallback, useEffect, useReducer, Reducer } from 'react';

import MineSweeperContainer from './MineSweeperContainer';
import { MineSweeperState, DispatchActionType } from './types';
import {
  mineSweeperReducer,
  initialStateFactory,
  getNearIndexes,
} from './reducer';
import {
  ActionType,
  CeilStatus,
  GameStatus,
  MineSweeperDifficulty,
} from './config';

const MineSweeperModule: FC = () => {
  const [state, dispatch] = useReducer<
    Reducer<MineSweeperState, DispatchActionType>
  >(mineSweeperReducer, initialStateFactory(MineSweeperDifficulty.BEGINNER));

  const handleReset = useCallback((difficulty: MineSweeperDifficulty) => {
    dispatch({ type: ActionType.CLEAR_MAP, payload: difficulty });
  }, []);

  const openSingleCeil = (index: number) => {
    switch (state.status) {
      case GameStatus.NEW:
        dispatch({ type: ActionType.START_GAME, payload: index });
        dispatch({ type: ActionType.OPEN_CEIL, payload: index });
        break;
      case GameStatus.STARTED:
        const ceil = state.ceils[index];

        if ([CeilStatus.FLAGGED, CeilStatus.OPEN].includes(ceil.status)) {
          break;
        } else if (ceil.nearBombs < 0) {
          dispatch({ type: ActionType.GAME_OVER, payload: index });
        } else {
          dispatch({ type: ActionType.OPEN_CEIL, payload: index });
        }
        break;
      default:
        console.log(state.status);
    }
  };

  /* If the number in a square is equal to the number
   * of squares touching that square that are flagged,
   * double clicking on the number opens up all remaining squares around the number. */
  const openMultiCeils = (index: number) => {
    const ceil = state.ceils[index];

    if (
      ceil.status !== CeilStatus.OPEN ||
      ceil.nearBombs <= 0 ||
      state.status !== GameStatus.STARTED
    )
      return;

    const indexes = getNearIndexes(index, state.rows, state.columns);
    const nearCeils = indexes.map(idx => state.ceils[idx]);

    if (
      nearCeils.filter(ceil => ceil.status === CeilStatus.FLAGGED).length !==
      ceil.nearBombs
    )
      return;

    const bombIndex = indexes.find(
      idx =>
        state.ceils[idx].nearBombs < 0 &&
        state.ceils[idx].status !== CeilStatus.FLAGGED
    );

    if (bombIndex) {
      dispatch({ type: ActionType.GAME_OVER, payload: bombIndex });
    } else {
      indexes.forEach(idx =>
        dispatch({ type: ActionType.OPEN_CEIL, payload: idx })
      );
    }
  };

  const changeCeilStatus = useCallback(
    (
      index: number,
      gameStatus: GameStatus,
      ceil: MineSweeperState['ceils'][number]
    ) => {
      if (
        ceil.status === CeilStatus.OPEN ||
        [GameStatus.WIN, GameStatus.DIED].includes(gameStatus)
      )
        return;
      dispatch({ type: ActionType.CHANGE_CEIL_STATUS, payload: index });
    },
    []
  );

  const openingSingleCeil = useCallback(
    (index: number, gameStatus: GameStatus) => {
      if ([GameStatus.DIED, GameStatus.WIN].includes(gameStatus)) return;
      dispatch({ type: ActionType.OPENING_CEIL, payload: index });
    },
    []
  );

  const getRemainingSafeCeilsCount = () => {
    const safeCeils = state.ceils
      .filter(ceil => ceil.status !== CeilStatus.OPEN)
      .filter(ceil => ceil.nearBombs >= 0);

    return safeCeils.length;
  };

  useEffect(() => {
    if (
      state.status === GameStatus.STARTED &&
      getRemainingSafeCeilsCount() === 0
    ) {
      dispatch({ type: ActionType.WIN });
    }
  });

  return (
    <MineSweeperContainer
      {...state}
      handleReset={handleReset}
      openingSingleCeil={openingSingleCeil}
      changeCeilStatus={changeCeilStatus}
      openSingleCeil={openSingleCeil}
      openMultiCeils={openMultiCeils}
    />
  );
};

export default MineSweeperModule;
