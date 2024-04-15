import { isEngagedKey, typeSuffix } from '@our-tools/world-shared';
import { UserColorMapping, ViewLayerProps } from '@our-tools/view-shared';
import { flatten } from 'lodash';
import { cn } from '@our-tools/util-css';

const cnEngaged = (type: string, key: string, ids: string[], color: UserColorMapping) => {
  console.assert(isEngagedKey(key), 'This is not an engaging key');

  return ids.map((userId) => `${key}-${type}-${color[userId]}`);
};

const cnLayer = (props: ViewLayerProps) => {
  const { userColors } = props;
  const type = typeSuffix(props.type);

  const classNames = flatten([
    cnEngaged(type, 'selecting', props.selecting, userColors),
    cnEngaged(type, 'locking', props.locking, userColors),
    cnEngaged(type, 'packing', props.packing, userColors),
    cnEngaged(type, 'hinting', props.hinting, userColors),
    cnEngaged(type, 'editing', props.editing, userColors),
    cnEngaged(type, 'cropping', props.cropping, userColors),
    cnEngaged(type, 'focusing', props.focusing, userColors)
  ]);
  return cn(classNames);
};

// ---

export {
  cnEngaged,
  cnLayer
};
