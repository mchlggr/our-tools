import {useMemo} from "react";
import {ResourceConfig, ResourceList, ResourceListHook} from "./types";
import {useResourceStore} from "./resource-store";
import {get} from "lodash";
import {ResourceEndpoint} from "./resource-endpoint";

//---

const useRecords = (recordType, ids = []) => {
    const store = useResourceStore();
    const { byId } = store[recordType]
    return useMemo(() => {
        return ids.map((id) => byId[id]);
    }, [byId, ids]);
};

const useAliasIds = (recordType, alias) => {
    const store = useResourceStore();
    const list = get(store, [recordType, alias], {});
    const {ids = []} = list;
    return ids
}

const useAliasParams = (recordType, alias) => {
    const store = useResourceStore();
    const list = get(store, [recordType, alias], {});
    const {params = {}} = list;
    return params
}

//---

// const defaultListOptions = { alias: "LIST"}

const useResourceList = (endpoint: ResourceEndpoint, options: ResourceConfig = defaultListOptions) : ResourceList  => {
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
