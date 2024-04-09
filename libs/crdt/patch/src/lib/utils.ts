import { cloneDeepWith } from 'lodash';
import { Text } from '@automerge/automerge'
import { typeOf } from '@penumbra/extension';

// ---

const isText = (v: unknown): boolean => v instanceof Text
const toJsonExists = (v: object): boolean =>  "toJSON" in v && typeof v.toJSON === "function"

interface toJSON {
  toJSON: () => string
}

const cloneDeepCrdt = <T>(value: T): T => cloneDeepWith(value, (v: unknown): any => {
 switch(true) {
   case typeOf(v) === 'bytes': {
    return new Uint8Array((v as Uint8Array).map(Number))
   }
   case typeOf(v) === 'date': {
     return new Date((v as Date).getTime())
   }
   case typeOf(v) === 'object' && toJsonExists(v as object): {
     return (v as toJSON).toJSON()
   }
 }
})

// ---

export { isText, cloneDeepCrdt }

