import {get} from 'lodash'

export const getViewModel = ({viewModel}) => viewModel

export const getViewEntities = ({viewModel}) => get(viewModel, "entities")
export const getViewSelection = ({viewModel}) => get(viewModel, "selection")