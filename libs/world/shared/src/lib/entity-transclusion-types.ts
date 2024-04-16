/**
 * Represents a block entity transclusion.
 *
 * @typedef {string} BlockEntityTransclusion
 * @description A block entity transclusion is a string that represents the type of transclusion applied to a block.
 * Possible values are:
 * - "block:transclusion": Indicates that the block is a transclusion block.
 */
type BlockEntityTransclusion = 'block:transclusion'

/**
 * Represents the transclusion layer entity.
 *
 * @typedef {('layer:transclusion')} LayerEntityTransclusion
 */
type LayerEntityTransclusion = 'layer:transclusion'

/**
 * Represents a surface entity transclusion.
 * @typedef { 'surface:transclusion' } SurfaceEntityTransclusion
 */
type SurfaceEntityTransclusion = 'surface:transclusion'

/**
 * Represents the transclusion of a model entity.
 *
 * @typedef {'model:transclusion'} ModelEntityTransclusion
 */
type ModelEntityTransclusion = 'model:transclusion'

/**
 * Represents the transclusion of a scene entity.
 * @typedef {string} SceneEntityTransclusion
 * @description The possible values are "scene:transclusion".
 */
type SceneEntityTransclusion = 'scene:transclusion'

/**
 * Represents the transclusion of a space entity.
 *
 * @typedef {string} SpaceEntityTransclusion
 * @see {@link https://example.com/spaceentitytransclusion}
 */
type SpaceEntityTransclusion = 'space:transclusion'

/**
 * Represents the transclusion of any entity.
 * This class can be one of the following types:
 * - `BlockEntityTransclusion`
 * - `LayerEntityTransclusion`
 * - `SurfaceEntityTransclusion`
 * - `ModelEntityTransclusion`
 * - `SceneEntityTransclusion`
 * - `SpaceEntityTransclusion`
 *
 * @typedef {BlockEntityTransclusion | LayerEntityTransclusion | SurfaceEntityTransclusion | ModelEntityTransclusion | SceneEntityTransclusion | SpaceEntityTransclusion} AnyEntity
 *Transclusion
 */
type AnyEntityTransclusion = BlockEntityTransclusion
  | LayerEntityTransclusion
  | SurfaceEntityTransclusion
  | ModelEntityTransclusion
  | SceneEntityTransclusion
  | SpaceEntityTransclusion

// ---



// ---

export {
  BlockEntityTransclusion,
  LayerEntityTransclusion,
  SurfaceEntityTransclusion,
  ModelEntityTransclusion,
  SceneEntityTransclusion,
  SpaceEntityTransclusion,
  AnyEntityTransclusion
};

