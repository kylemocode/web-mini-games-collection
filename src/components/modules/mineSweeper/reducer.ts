import sampleSize from 'lodash.samplesize';

import {
  MineSweeperDifficulty,
  MineSweeperConfig,
  ConfigSetting,
  CeilStatus,
  GameStatus,
  ActionType,
} from './config';
import { MineSweeperState, DispatchActionType } from './types';

const generateGameConfig = (config: ConfigSetting) => {
  const { rows, columns, bombs } = config;
  const ceils = Array(rows * columns)
    .fill({})
    .map(_ => ({
      status: CeilStatus.COVER,
      nearBombs: 0,
      opening: false,
    }));

  return {
    rows,
    columns,
    ceils,
    bombs,
  };
};

export const getNearIndexes = (
  index: number,
  rows: number,
  columns: number
) => {
  if (index < 0 || index >= rows * columns) return [];
  const row = Math.floor(index / columns);
  const column = index % columns;

  return [
    index - columns - 1,
    index - columns,
    index - columns + 1,
    index - 1,
    index + 1,
    index + columns - 1,
    index + columns,
    index + columns + 1,
  ].filter((_, arrayIndex) => {
    if (row === 0 && arrayIndex < 3) return false;
    if (row === rows - 1 && arrayIndex > 4) return false;
    if (column === 0 && [0, 3, 5].includes(arrayIndex)) return false;
    if (column === columns - 1 && [2, 4, 7].includes(arrayIndex)) return false;
    return true;
  });
};

const autoOpenCeils = (state: MineSweeperState, index: number) => {
  const { rows, columns } = state;
  const ceils = state.ceils.map(ceil => ({
    ...ceil,
    traversed: false,
  }));
  return traverseCeils(index);

  function traverseCeils(index: number): number[] {
    const ceil = ceils[index];

    if (
      ceil.traversed ||
      ceil.nearBombs < 0 ||
      ceil.status === CeilStatus.FLAGGED
    )
      return [];

    ceil.traversed = true;

    if (ceil.nearBombs > 0) return [index];

    return [
      index,
      ...getNearIndexes(index, rows, columns).reduce(
        (lastIndexesList: Array<number>, ceilIndex: number) => {
          return [...lastIndexesList, ...traverseCeils(ceilIndex)];
        },
        []
      ),
    ];
  }
};

const setBombs = (
  config: ConfigSetting & { exclude: number },
  originCeils: MineSweeperState['ceils']
) => {
  const { rows, columns, bombs, exclude } = config;
  const ceils = originCeils.map(ceil => ({ ...ceil }));

  if (rows * columns !== ceils.length)
    throw new Error('rows and columns not equal to ceils');

  const indexArray = [...Array(rows * columns).keys()];

  sampleSize(
    indexArray.filter(i => i !== exclude),
    bombs
  ).forEach(chosen => {
    ceils[chosen].nearBombs = -100;
    getNearIndexes(chosen, rows, columns).forEach(nearIndex => {
      ceils[nearIndex].nearBombs += 1;
    });
  });

  return {
    rows,
    columns,
    ceils,
    bombs,
  };
};

export const initialStateFactory = (
  difficulty = MineSweeperDifficulty.BEGINNER
): MineSweeperState => {
  return {
    difficulty,
    status: GameStatus.NEW,
    ...generateGameConfig(MineSweeperConfig[difficulty]),
  };
};

export const mineSweeperReducer = (
  state: MineSweeperState,
  action: DispatchActionType
): MineSweeperState => {
  switch (action.type) {
    case ActionType.CLEAR_MAP:
      const difficulty = action.payload ?? state.difficulty;
      return initialStateFactory(difficulty);
    case ActionType.START_GAME:
      const exclude = action.payload;

      return {
        ...state,
        ...setBombs(
          { ...MineSweeperConfig[state.difficulty], exclude },
          state.ceils
        ),
        status: GameStatus.STARTED,
      };
    case ActionType.OPEN_CEIL: {
      const indexes = autoOpenCeils(state, action.payload);
      const ceils = [...state.ceils];

      indexes.forEach(i => {
        const ceil = ceils[i];
        ceils[i] = { ...ceil, status: CeilStatus.OPEN };
      });

      return {
        ...state,
        ceils,
      };
    }
    case ActionType.CHANGE_CEIL_STATUS: {
      const index = action.payload;
      const ceils = [...state.ceils];
      const ceil = state.ceils[index];
      let newStatus;

      switch (ceil.status) {
        case CeilStatus.COVER:
          newStatus = CeilStatus.FLAGGED;
          break;
        case CeilStatus.FLAGGED:
          newStatus = CeilStatus.UNKNOWN;
          break;
        case CeilStatus.UNKNOWN:
          newStatus = CeilStatus.COVER;
          break;
        default:
          throw new Error(`Unknown ceil status ${ceil.status}`);
      }
      ceils[index] = { ...ceil, status: newStatus };
      return {
        ...state,
        ceils,
      };
    }
    case ActionType.GAME_OVER: {
      const ceils = state.ceils.map(ceil => {
        if (ceil.nearBombs < 0 && ceil.status !== CeilStatus.FLAGGED) {
          return {
            ...ceil,
            status: CeilStatus.MINE,
          };
        } else if (ceil.status === CeilStatus.FLAGGED && ceil.nearBombs >= 0) {
          return {
            ...ceil,
            status: CeilStatus.MISFLAGGED,
          };
        } else {
          return {
            ...ceil,
            opening: false,
          };
        }
      });
      ceils[action.payload].status = CeilStatus.DIE;
      return {
        ...state,
        status: GameStatus.DIED,
        ceils,
      };
    }
    case ActionType.WIN: {
      const ceils = state.ceils.map(ceil => {
        if (ceil.nearBombs >= 0) {
          return {
            ...ceil,
            status: CeilStatus.OPEN,
          };
        } else {
          return {
            ...ceil,
            status: CeilStatus.FLAGGED,
          };
        }
      });
      return {
        ...state,
        status: GameStatus.WIN,
        ceils,
      };
    }
    case ActionType.OPENING_CEIL: {
      const ceil = state.ceils[action.payload];
      const ceils = state.ceils.map(ceil => ({
        ...ceil,
        opening: false,
      }));
      ceils[action.payload] = { ...ceil, opening: true };
      return {
        ...state,
        ceils,
      };
    }
    case ActionType.OPENING_CEILS: {
      const indexes = getNearIndexes(action.payload, state.rows, state.columns);
      const ceils = state.ceils.map(ceil => ({
        ...ceil,
        opening: false,
      }));
      [...indexes, action.payload].forEach(index => {
        const ceil = { ...ceils[index] };
        ceil.opening = true;
        ceils[index] = ceil;
      });
      return {
        ...state,
        ceils,
      };
    }
    default:
      return state;
  }
};
