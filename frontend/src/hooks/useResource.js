import {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from "react-router-dom";

import {emptyObject} from "../utils/empty";
import {selectError, selectOne} from "../selectors/resource";
import useMount from "./useMount";
import {createOne, deleteOne, fetchOne, oneAction, updateOne} from "../actions/resource";


const useResource = (resourceType, resourceMeta = emptyObject) => {
    const {alias} = resourceMeta

    const {id} = useParams()

    const isNew = !id

    const dispatch = useDispatch()

    useMount(() => {
        if (alias) {
            //dispatch(setAlias(resourceType, alias, id)))
        }
    })

    const selectId =  useCallback(()=>id, [id])

    const loading = false // useSelector()
    const error = useSelector(useCallback(selectError(resourceType, selectId), [resourceType, selectId]))
    const resource = useSelector(useCallback(selectOne(resourceType, selectId), [resourceType, selectId]))

    const fetchResource = useCallback((payload, meta) => {
        return dispatch(fetchOne(resourceType, payload, {...resourceMeta, ...meta}))
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

    const resourceProps = useMemo(() => {
        const {id: resourceId} = resource
            return {
                isNew,
                loading,
                error,
                resource,
                resourceId,
                // --
                fetchResource,
                createResource,
                updateResource,
                deleteResource,
                resourceAction
            }
        }, [
            isNew,
            loading,
            error,
            resource,
            // --
            fetchResource,
            createResource,
            updateResource,
            deleteResource,
            resourceAction
        ]
    )

    return resourceProps
}

export default useResource