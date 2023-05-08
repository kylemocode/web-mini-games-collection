enum MineSweeperDifficulty {
  Beginner,
  Intermediate,
  Hard,
}

type ConfigSetting = {
  rows: number;
  columns: number;
  ceils: number;
  mines: number;
};

export const MineSweeperConfig: Record<MineSweeperDifficulty, ConfigSetting> = {
  [MineSweeperDifficulty.Beginner]: {
    rows: 9,
    columns: 9,
    ceils: 81,
    mines: 10,
  },
  [MineSweeperDifficulty.Intermediate]: {
    rows: 16,
    columns: 16,
    ceils: 256,
    mines: 40,
  },
  [MineSweeperDifficulty.Hard]: {
    rows: 16,
    columns: 30,
    ceils: 480,
    mines: 99,
  },
};
