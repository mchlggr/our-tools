//---

// Standard Tools
import { NonEmptyString } from '@penumbra/extension';
import { Component, ComponentType } from 'react';

// TODO: rename * to *Type
type HandToolTag = 'tool:hand'
type SelectToolTag = 'tool:select'
type RectangleToolTag = 'tool:rectangle'
type LineToolTag = 'tool:line'
type TextToolTag = 'tool:text'
type PencilToolTag = 'tool:pencil'
// type LaserTool = 'tool:laser'
// type ZoomTool = 'tool:zoom'
// type EraserTool = 'tool:eraser'
// type ScreenshotTool = 'tool:screenshot'
// type SwapTool = 'tool:swap'
// type DictateTool = 'tool:dictate'
// type PollTool = 'tool:poll'
// type StickerTool = 'tool:sticker'
// type KudosTool = 'tool:kudos'
// type RandomTool = 'tool:random'
// type CommentTool = 'tool:comment'
// type RecordingTool = 'tool:recording'
// type MagicTool = 'tool:magic' like chalktalk with AI, squeck

type StandardToolTag = HandToolTag | SelectToolTag | RectangleToolTag | LineToolTag | TextToolTag | PencilToolTag
type AnyToolTag = StandardToolTag

type NormalMode = 'mode:normal'
type InputMode = 'mode:input'

type AnyMode = NormalMode | InputMode

type ToolProps = {
  mode: AnyMode
}

type DockToolProps  = ToolProps
type SpaceToolProps  = ToolProps
type SurfaceToolProps  = ToolProps
type InspectorToolProps  = ToolProps
type OutlineToolProps  = ToolProps

type DockToolComponent = ComponentType<DockToolProps>
type SpaceToolComponent = ComponentType<SpaceToolProps>
type SurfaceToolComponent = ComponentType<SurfaceToolProps>
type InspectorToolComponent = ComponentType<InspectorToolProps>
type OutlineToolComponent = ComponentType<OutlineToolProps>

// Slots are dependency injection locations for Tools
type SpaceSlotTag = 'slot:space'
type SceneSlotTag = 'slot:scene'
type SurfaceSlotTag = 'slot:surface'
type MassSlotTag = 'slot:mass'
type DockSlotTag = 'slot:dock'
type InspectorSlotTag = 'slot:inspector'
type OutlineSlotTag = 'slot:outline'

type AnySlotTag = SpaceSlotTag | SurfaceSlotTag | DockSlotTag | InspectorSlotTag | OutlineSlotTag | MassSlotTag

type Tool = {
  type: NonEmptyString
  icon: NonEmptyString // css class name for icon
  slots: Set<AnySlotTag>
  enabled: boolean
  components: {
    // The following components will be injected into UI slots when it's active loaded
    // TODO: more accurately specify props for each of these components
    DockTool: DockToolComponent
    SpaceTool: SpaceToolComponent
    SurfaceTool: SurfaceToolComponent,
    InspectorTool: InspectorToolComponent
    OutlineTool: OutlineToolComponent
  }
}

export {
  Tool,
  HandToolTag,
  SelectToolTag,
  RectangleToolTag,
  LineToolTag,
  TextToolTag,
  PencilToolTag,
  StandardToolTag,
  AnyToolTag
};
