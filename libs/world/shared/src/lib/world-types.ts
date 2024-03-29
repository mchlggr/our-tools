import { Uuid, WorldUnit } from './types';
import { WorldModel } from './model-types';

// ---

type WorldHistory = WorldModel[]

type WorldArchive = {
  uuid: Uuid
  buildVersion: string
  at: number
  unit: WorldUnit,
  // overlay: object
  history: WorldHistory
}

// ---

export {
  WorldModel,
  WorldHistory,
  WorldArchive,
};
