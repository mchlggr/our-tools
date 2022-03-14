import {emptyObject} from "../utils/empty";
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import useMount from "./useMount";
import {useCallback, useMemo} from "react";
import {createOne, deleteOne, fetchList, oneAction, updateOne} from "../actions/resource";

const useResourceList = (resourceType, resourceMeta = emptyObject) => {
    const {alias} = resourceMeta

    //TODO: const {list} = useParams()

    const dispatch = useDispatch()

    useMount(() => {
        if (alias) {
            //TODO: dispatch(setAlias(resourceType, alias, list)))
        }
    })

    const fetchResourceList = useCallback((payload, meta) => {
        return dispatch(fetchList(resourceType, payload, {...resourceMeta, ...meta}))
    }, [dispatch, resourceType, resourceMeta])

    const createResource = useCallback((payload, meta) => {
        return dispatch(createOne(resourceType, payload, {...resourceMeta, ...meta}))
    }, [dispatch, resourceType, resourceMeta])

    const updateResource = useCallback((payload, meta) => {
        return dispatch(updateOne(resourceType, payload, {...resourceMeta, ...meta}))
    }, [dispatch, resourceType, resourceMeta])

    const deleteResource = useCallback((payload, meta) => {
        return dispatch(deleteOne(resourceType, payload, {...resourceMeta, ...meta}))
    }, [dispatch, resourceType, resourceMeta])

    const resourceAction = useCallback((payload, meta) => {
            return dispatch(oneAction(resourceType, payload, {...resourceMeta, ...meta}))
        }, [dispatch, resourceType, resourceMeta]
    )

    const resourceListProps = useMemo(() => {
        return {
            fetchResourceList,
            createResource,
            updateResource,
            deleteResource,
            resourceAction
        }
    }, [
        fetchResourceList,
        createResource,
        updateResource,
        deleteResource,
        resourceAction
    ])
}