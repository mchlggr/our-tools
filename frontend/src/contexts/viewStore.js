import {useCallback} from "react";

import createContext from 'zustand/context'

import create from 'zustand'
import produce from "immer";

const {Provider: ViewStoreProvider, useStore: useView} = createContext()

const defaultInitialW = 120
const defaultInitialH = 80

const createViewStore = ({
                             initialW = defaultInitialW,
                             initialH = defaultInitialH
                         }) => create((set) => ({
    // Initial
    initialW,
    initialH,
    // Scale
    minScale: 0.85,
    maxScale: 2,
    wheelStep: 200,
    _scale: 1,
    //
    cx: initialW / 2,
    cy: initialH / 2,
    drag: [0, 0],
    wheel: 0,
    //
    getScale: () => set(({
                             minScale,
                             maxScale,
                             _scale,
                             wheel,
                             wheelStep
                         }) => Math.max(minScale, Math.min(maxScale, _scale - wheel / wheelStep))),
    getDragMultiplier: () => set(({getScale}) => 0.5 / getScale()),
    setScale: (value) => set((draft) => {
        const {minScale, maxScale} = draft
        draft.scale(Math.max(minScale, Math.min(maxScale, value)))
    })
}))