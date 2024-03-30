//---

// Standard Tools
import { NonEmptyString } from '@penumbra/extension';
import { Component, ComponentType } from 'react';

// TODO: rename * to *Type
type HandTool = 'tool:hand'
type SelectTool = 'tool:select'
type RectangleTool = 'tool:rectangle'
type LineTool = 'tool:line'
type TextTool = 'tool:text'
type PencilTool = 'tool:pencil'
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

type StandardTool = HandTool | SelectTool | RectangleTool | LineTool | TextTool | PencilTool
type AnyTool = StandardTool

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
type SpaceSlot = 'slot:space'
type SurfaceSlot = 'slot:surface'
type MassSlot = 'slot:mass'
type DockSlot = 'slot:dock'
type InspectorSlot = 'slot:inspector'
type OutlineSlot = 'slot:outline'

type AnySlot = SpaceSlot | SurfaceSlot | DockSlot | InspectorSlot | OutlineSlot | MassSlot

type Tool = {
  type: NonEmptyString
  icon: NonEmptyString // css class name for icon
  slots: Set<AnySlot>
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
  HandTool,
  SelectTool,
  RectangleTool,
  LineTool,
  TextTool,
  PencilTool,
  StandardTool,
  AnyTool
};
