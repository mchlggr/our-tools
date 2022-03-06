import {Deserializer, Serializer} from "jsonapi-serializer";
import {anyDeserializer} from "./deserializers";

const serializers = {
    users: {
        serializer: new Serializer('users', {
            keyForAttribute: 'underscore_case',
            attributes: [
                'email',
                'roles',
                'password'
            ],
        }),
        deserializer: anyDeserializer
    },
    roles: {
        serializer: new Serializer('roles', {
            keyForAttribute: 'underscore_case',
            attributes: [
                'name',
            ],
        }),
        deserializer: anyDeserializer
    },
    designs: {
        serializer: new Serializer('designs', {
            keyForAttribute: 'underscore_case',
            attributes: [
                'title',
                'history'
            ],
        }),
        deserializer: anyDeserializer
    }
};

export default serializers