import {
    castArray,
    get,
    groupBy,
    keys,
    omit,
    set,
    values,
    zipObject,
} from 'lodash';
import serializers from "./serializers";
import {emptyArray} from "../utils/empty";

export const normalize = (resourceType, data) => {
    if (!serializers[resourceType]) {
        console.error(`No serializer/deserializer for ${resourceType}`);
    }

    return serializers[resourceType].deserializer.deserialize(data);
};

export const denormalize = (resourceType, data) => {
    const result = serializers[resourceType].serializer.serialize(data);
    if(data.id) {
        return result
    } else {
        return omit(result, 'data.id');
    }
};

export const normalizeResponse = (response) => {
    const {data = [], included = []} = response.data;
    const dataByType = groupBy(castArray(data).concat(included), 'type');

    const normalizeItems = (items = []) => Promise.all(items.map(item =>
        normalize(item.type, {data: item, included}),
    ));

    return Promise.all(values(dataByType).map(normalizeItems))
        .then(normalizedItems => ({
            ...response.data,
            normalized: zipObject(keys(dataByType), normalizedItems),
        }));
};

export const normalizeEndpointError = (err) => {
    const error = get(err, ['response', 'data', 'errors', 0]);

    // noinspection JSUnresolvedVariable
    throw {message: error.detail || error.title || err.message};
};

export const normalizeErrors = (err) => {
    // noinspection JSUnresolvedFunction
    throw get(err, 'response.data.errors', emptyArray)
        .reduce((errors, error) => {
            const attribute = /\/data\/[a-z]*\/(.*)$/.exec(get(error, 'source.pointer'))[1];
            set(errors, attribute.split('/'), error.title);
            return errors;
        }, {});
};