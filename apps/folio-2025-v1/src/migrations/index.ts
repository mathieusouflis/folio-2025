import * as migration_20251125_190949 from './20251125_190949';

export const migrations = [
  {
    up: migration_20251125_190949.up,
    down: migration_20251125_190949.down,
    name: '20251125_190949'
  },
];
