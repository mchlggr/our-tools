import { ReactNode, ComponentType } from 'react';
import { NonEmptyString } from '@penumbra/extension';
import { Uuid } from '@penumbra/world-shared';
import { Tool } from '@penumbra/tool-shared';

type StageComponentType = ComponentType

type StageComponents = {
  Dock: StageComponentType,
  Dash: StageComponentType,
  Park: StageComponentType,
  Inspector: StageComponentType,
  Outline: StageComponentType,
  MiniMap: StageComponentType,
  Background: StageComponentType
  Brush: StageComponentType
  Cursor: StageComponentType
  Canvas: StageComponentType
  OtherBrush: StageComponentType
  OtherCursor: StageComponentType
  OtherHint: StageComponentType
  Grid: StageComponentType
  GuideSnap: StageComponentType
  LoadingIcon: StageComponentType
  LoadingScreen: StageComponentType
  ErrorFallback: StageComponentType
}

type User = {
  uuid: Uuid,
  name: NonEmptyString
  email: NonEmptyString
}


type StageTools = {
[tool: NonEmptyString]:  Tool
}

type StageOptions = {
 autoFocus: boolean
}

interface StageProps {
  type: NonEmptyString;
  children?: ReactNode;
  tools?: StageTools;
  components?: StageComponents;
  options?: StageOptions;
  user?: User;
  className?: NonEmptyString
}

export { StageProps };
