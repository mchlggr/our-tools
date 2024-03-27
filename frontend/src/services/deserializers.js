import {Deserializer} from "jsonapi-serializer";

export const valueForRelationship = (relationship) => {
    return {
        id: relationship.id,
        type: relationship.type
    }
}

const deserializeAnyHandler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop]
        } else {
            return { valueForRelationship }
        }
    }
}

const deserializeAnyTarget = {
    keyForAttribute: "underscore_case",
    ref: undefined,
    included: undefined,
    id: undefined,
    attributes: undefined,
    topLevelLinks: undefined,
    dataLinks: undefined,
    dataMeta: undefined,
    relationshipLinks: undefined,
    relationshipMeta: undefined,
    ignoreRelationshipData: undefined,
    nullIfMissing: undefined,
    pluralizeType: undefined,
    typeForAttribute: undefined,
    typeAsAttribute: undefined,
    meta: undefined,
    transform: undefined
}

const deserializeAnyProxy = new Proxy(deserializeAnyTarget, deserializeAnyHandler)

export const anyDeserializer = new Deserializer(deserializeAnyProxy)
