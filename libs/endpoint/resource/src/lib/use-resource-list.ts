import {get} from "lodash";
import {useMemo} from "react";
import { ResourceListHook } from "./types";
import {useResourceStore} from "./resource-store";
import { emptyArray, emptyObject } from '@our-tools/extension';

//---

const useRecords = (recordType: string, ids: readonly string[] = emptyArray) => {
    const store = useResourceStore();
    const { byId } = store[recordType]
    return useMemo(() => {
        return ids.map((id) => byId[id]);
    }, [byId, ids]);
};

const useAliasIds = (recordType: string, alias: string) => {
    const store = useResourceStore();
    if(alias === "") return emptyArray

    const list = get(store, [recordType, alias], {});
    const {ids = []} = list;
    return ids
}

const useAliasParams = (recordType: string, alias: string) => {
    const store = useResourceStore();
    if(alias === "") return emptyObject;

    const list = get(store, [recordType, alias], {});
    const {params = {}} = list;
    return params
}

//---

const defaultListOptions = Object.freeze({
  alias: "LIST"
})

const useResourceList : ResourceListHook = (endpoint, options  = defaultListOptions)  => {
    if (!endpoint) throw new Error(`Missing endpoint got: ${endpoint} instead`);

    const { alias } = options

    // if (!alias) throw new Error(`Missing alias got: ${alias} instead`);

    const token = {}
    const {
        getList,
        createResource,
        updateResource,
        deleteResource
    } = useResourceStore();

    const recordType = endpoint.recordType()

    const ids = useAliasIds(recordType, alias)
    const params = useAliasParams(recordType, alias)
    const records = useRecords(recordType, ids);

    return {
        params,
        // ---
        records,
        recordType,
        // ---
        isNew: new Set([]),
        isLoading: new Set([]),
        error: {},
        // ---
        fetchResourceList: (payload = {}, opts = {}) =>
            getList(endpoint, payload, {...options, ...opts}, token),
        // TODO: onFilter
        // TODO: onSort
        // TODO: onPageSize
        // TODO: onPageNumber
        // TODO: onDelete
        // ---
        createResource: (payload: any, opts: any = {}) => {
            return createResource(endpoint, payload, {...options, ...opts,}, token);
        },
        updateResource: (payload: any, opts: any = {}) => {
            return updateResource(endpoint, payload, {...options, ...opts,}, token
            );
        },
        deleteResource: (payload: any, opts: any = {}) => {
            return deleteResource(endpoint, payload, {...options, ...opts,}, token);
        },
    }
}

//---

export {useResourceList}
