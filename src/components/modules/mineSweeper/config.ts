export enum MineSweeperDifficulty {
  BEGINNER,
  INTERMEDIATE,
  HARD,
}

export enum GameStatus {
  NEW,
  STARTED,
  DIED,
  WIN,
}

export enum CeilStatus {
  COVER,
  FLAGGED,
  UNKNOWN,
  OPEN,
  DIE,
  MISFLAGGED,
  MINE,
}

export enum ActionType {
  CLEAR_MAP,
  START_GAME,
  OPEN_CEIL,
  CHANGE_CEIL_STATE,
  GAME_OVER,
  WIN,
  OPENING_CEIL,
  OPENING_CEILS,
}

export type ConfigSetting = {
  rows: number;
  columns: number;
  ceils: number;
  bombs: number;
};

export const MineSweeperConfig: Record<MineSweeperDifficulty, ConfigSetting> = {
  [MineSweeperDifficulty.BEGINNER]: {
    rows: 9,
    columns: 9,
    ceils: 81,
    bombs: 10,
  },
  [MineSweeperDifficulty.INTERMEDIATE]: {
    rows: 16,
    columns: 16,
    ceils: 256,
    bombs: 40,
  },
  [MineSweeperDifficulty.HARD]: {
    rows: 16,
    columns: 30,
    ceils: 480,
    bombs: 99,
  },
};
