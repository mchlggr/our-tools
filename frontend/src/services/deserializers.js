import {Deserializer} from "jsonapi-serializer";

export const polymorphicReference = (relationship) => {
    return {
        id: relationship.id,
        type: relationship.type
    }
}

const deserializeAnyHandler = {
    get(target, prop) {
        if(prop in target) {
            return target[prop]
        } else {
            return polymorphicReference(prop)
        }
    }
}

const deserializeAnyTarget = {
    keyForAttribute: "underscore_case",
}


const deserializeAnyProxy = new Proxy(deserializeAnyTarget, deserializeAnyHandler)



export const anyDeserializer = new Deserializer(deserializeAnyProxy)
