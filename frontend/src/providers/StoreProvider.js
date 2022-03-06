// Dependencies
import React, {memo} from 'react';
import {Provider} from 'react-redux'
import {compose, createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import rootReducer from "../reducers/rootReducer";
import designMockState from "../static/designMockState";

const composeEnhancers =
    process.env.NODE_ENV === 'production'
        ? compose
        : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const setupStore = () => {

    const preloadedState = {
        ...designMockState
    }

    const store = createStore(
        rootReducer(),
        preloadedState,
        composeEnhancers(applyMiddleware(thunkMiddleware)),
    );

    return store;
};

const reduxStore = setupStore()

const StoreProvider = ({children}) => {
    return (
        <Provider store={reduxStore}>
            {children}
        </Provider>
    );
}

StoreProvider.propTypes = {};

const StoreProviderMemo = memo(StoreProvider)
StoreProviderMemo.displayName = "StoreProvider"

export default StoreProviderMemo;