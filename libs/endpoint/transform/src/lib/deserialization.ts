import { Deserializer } from 'jsonapi-serializer';
import { EndpointReference } from '@penumbra/endpoint-shared';


// ---

// TODO: remove if this is unused
const typeForAttribute = (type: string) : string => {
  switch (type) {
    case 'many_polymorphic_references':
      return 'aos';
    default:
      return type;
  }
};

// ---

const valueForRelationship = (relationship: EndpointReference) => {
  return {
    id: relationship.id,
    type: relationship.type,
  };
};

const deserializeAnyHandler = {
  get(target: any, prop: any) {
    if (prop in target) {
      return target[prop];
    } else {
      return { valueForRelationship };
    }
  },
};

const deserializeAnyTarget = {
  keyForAttribute: 'underscore_case',
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
  transform: undefined,
};

const deserializeAnyProxy = new Proxy(
  deserializeAnyTarget,
  deserializeAnyHandler
);

const anyDeserializer = new Deserializer(deserializeAnyProxy);

// ---

export { anyDeserializer, typeForAttribute }
