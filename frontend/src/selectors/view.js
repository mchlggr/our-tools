import {get} from 'lodash'

export const getViewCenter = (view) => get(view, "center")
export const getViewCenterX = (view) => get(view, ["center", "x"])
export const getViewCenterY = (view) => get(view, ["center", "y"])

export const getViewMaxZoom = (view) => get(view, "maxZoom")
export const getViewMinZoom = (view) => get(view, "minZoom")
export const getViewZoom = (view) => get(view, "zoom")

export const getViewOffset = (view) => get(view, "offset")
export const getViewOffsetX = (view) => get(view, ["offset", "x"])
export const getViewOffsetY = (view) => get(view, ["offset", "y"])

export const getViewport = (view) => get(view, "viewport")
export const getViewportX = (view) => get(view, ["viewport", "x"])
export const getViewportY = (view) => get(view, ["viewport", "y"])

export const getViewScale = (view) => get(view, "scale")
