import {
  MineSweeperDifficulty,
  GameStatus,
  CeilStatus,
  ActionType,
} from './config';

export type MineSweeperState = {
  difficulty: MineSweeperDifficulty;
  status: GameStatus;
  rows: number;
  columns: number;
  bombs: number;
  ceils: Array<{
    status: CeilStatus;
    nearBombs: number;
    opening: boolean;
    traversed?: boolean;
  }>;
};

export type DispatchActionType =
  | { type: ActionType.CLEAR_MAP; payload: MineSweeperDifficulty }
  | { type: ActionType.START_GAME; payload: number }
  | { type: ActionType.OPEN_CEIL; payload: number }
  | { type: ActionType.CHANGE_CEIL_STATE; payload: number }
  | { type: ActionType.GAME_OVER; payload: number }
  | { type: ActionType.WIN }
  | { type: ActionType.OPENING_CEIL; payload: number }
  | { type: ActionType.OPENING_CEILS; payload: number };
