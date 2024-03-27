// Dependencies
import createContext from 'zustand/context'
import create, {StateSelector} from 'zustand'
import produce from "immer";

// Selectors
import {getRenderModel, getViewModel, Model, ModelTransform} from "../selectors/model";

// ---

const {Provider: ModelStoreProvider, useStore: useModel} = createContext()

const createModelStore = () => create((set: Function) => ({
    viewModel: undefined,
    renderModel: (model: Model) => set(produce((draft: any) => {
        draft.viewModel = model
    }))
}))

const useRenderModel = () => useModel(getRenderModel)
// @ts-ignore
const useViewModel = () => useModel(getViewModel)

export {
    ModelStoreProvider,
    useModel,
    createModelStore,
    useRenderModel,
    useViewModel
}