// Dependencies
import React from 'react';
import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import createContext from 'zustand/context';

// Types
import {ResourceStoreMethod, ResourceStoreState, ResourceAction, RecordPayload} from "./resourceTypes";

// State Utils

import {flow, omit, pick} from 'lodash';
import * as _ from 'lodash'
import {JsonApiQuery} from "../endpoints/jsonapiTypes";
import {addLinks, addNormalized, makeAlias, makeAliasList} from "./resourceState";
import {mergeParams} from "./queryUtils";

//---

const {Provider: PrivateProvider, useStore: usePrivateStore} =
    createContext();

// ---

const getOne =  (set, get: () => ResourceStoreState) : ResourceStoreMethod =>async (endpoint, payload: RecordPayload, config, token) => {
    const {alias} = config;
    const type = endpoint.recordType();
    const id = payload.id;
    const params = omit(payload, ['id']);
    const result = await endpoint.find(id, token, params);
    if (result.isSuccess()) {
        const value = result.success();
        set((state) => {
            addNormalized(state, value);
            addLinks(state, value);
            if (alias) {
                const content = makeAlias(value);
                _.set(state, [type, alias], content);
            }
        });
        return value;
    } else {
        const error = result.fail();
        throw new Error(`getOne Failed! ${error.message}`);
    }
};

const getList = (set, get: () => ResourceStoreState) : ResourceStoreMethod =>async (endpoint, payload: RecordPayload, config, token) => {
    debugger
    const {alias, url} = config;
    const configPayload: JsonApiQuery = pick(config, ['filter', 'sort', 'page', 'include']);
    const type = endpoint.recordType();
    const params = mergeParams(configPayload, payload);
    const result = await endpoint.list(token, params, url);

    if (result.isSuccess()) {
            debugger

        const value = result.success();
        set((state) => {
                        debugger

            addNormalized(state, value);
            if (alias) {
                debugger
                const content = makeAliasList(value);
                //TODO: _.set(state, [type, 'lookup', alias],  content)
                _.set(state, [type, alias], content);
            }
        });
    } else {
            debugger

        const error = result.fail();
        throw new Error(`getList Failed! ${error.message}`);
    }
};

const getMany =  (set, get: () => ResourceStoreState) : ResourceStoreMethod =>async (endpoint, payload, config, token) => {
    const {alias} = config;
    const type = endpoint.recordType();
    const result = await endpoint.list(token, payload); // TODO: rename to endpoint.index
    if (result.isSuccess()) {
        const value = result.success();
        set((state) => addNormalized(state, value));
    } else {
        throw new Error('getMany Failed!');
    }
};

const createResource =  (set, _get: () => ResourceStoreState) : ResourceStoreMethod =>async (endpoint, payload, config, token) => {
    // const {
    //   auth: { token },
    // } = get();
    const {alias, url} = config;
    const result = await endpoint.create(token, payload, url);
    if (result.isSuccess()) {
        const value = result.success();
        set((state) => {
            addNormalized(state, value);
            addLinks(state, value);
        });
        return value;
    } else {
        const error = result.fail();
        // throw new Error("createResource Failed!")
        return error;
    }
};

const updateResource = (set, _get: () => ResourceStoreState) : ResourceStoreMethod => async (endpoint, payload: RecordPayload, config, token) => {
    const {alias, url} = config;
    const id = payload.id;

    const result = await endpoint.update(id, token, payload, url);
    if (result.isSuccess()) {
        const value = result.success();
        set((state) => {
            addNormalized(state, value);
            addLinks(state, value);
        });
        return value;
    } else {
        const error = result.fail();
        // throw new Error(`updateResource Failed! ${error.message}`)
        return error;
    }
};

const deleteResource = (set, get: () => ResourceStoreState) : ResourceStoreMethod => async (endpoint, payload , config, token) => {
    //TODO: if request is successful, purge any references to data in the resource store
};

// ---
const createResourceStore = () => {
    return flow([
        // (s) => persist(s, {name: 'resource-storage'}),
        (s) => devtools(s),
        (s) => immer(s),
        (s) => create(s),
    ])((set, get: () => ResourceStoreState) => {
        return {
            sync_transfers: { byId: {} },
            sync_plans: { byId: {} },
            integrations: { byId: {} },
            // ---
            getOne: getOne(set, get),
            getList: getList(set, get),
            getMany: getMany(set, get),
            createResource: createResource(set, get),
            updateResource: updateResource(set, get),
            deleteResource: deleteResource(set, get),
        }
    })
}

//---

const ResourceStore = ({children}: any) => {
    return (
        <PrivateProvider createStore={createResourceStore}>
            {children}
        </PrivateProvider>
    );
};

//---

interface ResourceStoreHook {

}

//---

const useResourceStore = usePrivateStore as () => ResourceStoreState;

//---

export {useResourceStore, ResourceStore}
