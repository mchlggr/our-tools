import { chain, keys, values, zipObject } from 'lodash';
import { anyDeserializer } from './deserialization';
import {JsonApiResponse, JsonApiDocument} from "@penumbra/endpoint-jsonapi";
import {typeOf} from "@penumbra/extension";
// import {ResourceRecord} from "@penumbra/endpoint-resource";
import { Normalization, NormalizedRecords, NormalizedResponse } from '@penumbra/endpoint-shared';

export const normalizeItem: Normalization = (recordType : string, data : object) => {
  return anyDeserializer.deserialize(data);
};

// ---


async function normalizePayload<RecordEntry>({
  data = [],
  included = [],
  ...rest
}: JsonApiResponse) : Promise<NormalizedResponse<RecordEntry>> {
  const dataByType = chain(data)
    .castArray()
    .concat(included)
    .groupBy('type')
    .value();

  const normalizedItems = await Promise.all(
    values(dataByType).map(async (items = []) =>
      Promise.all(
        items.map((i: JsonApiDocument) => normalizeItem(i.type, { data: i, included }))
      )
    )
  );

  const normalized  = zipObject(keys(dataByType), normalizedItems) as NormalizedRecords<RecordEntry>;

    let record = {} as RecordEntry
    if (typeOf(data) == "object") {
        const {type, id} = data as JsonApiDocument
        const found = normalized[type].find((i) => i.id === id)
        if(found) record = found
    }

    const records = []
    if (typeOf(data) == "array") {
        for (const item of data as JsonApiDocument[]) {
            records.push(normalized[item.type].filter((i) => i.id === item.id))
        }
    }

  return { ...rest, data, included, normalized, record, records: records.flat() };
}

// ---

//TODO: remove this 'denormalize' function
export const denormalize: Normalization = (recordType, data) => {
  // const serializer = null

  // if(!serializer) {
  throw new Error(`No Serializer Found for ${recordType}`);
  // }
  //  console.log('denormalize/data',data);

  // const result = serializer.serialize(data)
  // console.log('denormalize/result', result);
  // if (result) {
  //     return result
  // }
};

// ---
