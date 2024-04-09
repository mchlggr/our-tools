import {
  type Doc,
  type Patch,
  type Prop,
} from "@automerge/automerge";
import { patch } from "./patch";
import { cloneDeep, get } from 'lodash';
import { isText } from './utils';


const unpatch = <T>(doc: Doc<T>, patch: Patch): Patch => {
  if (patch.action === "insert") {
    return {
      action: "del",
      path: patch.path,
      length: patch.values.length,
    };
  }

  if (patch.action === "del") {
    const [index, ...path] = [...patch.path].reverse();

    const value = get(doc, path.reverse(), doc) as
      | Record<Prop, any>
      | Text
      | Array<any>
      | string;

    if (typeof value === "string") {
      return {
        action: "splice",
        path: patch.path,
        value: [...Array(patch.length)]
          .map((_, i) => value[Number(index) + i])
          .join(""),
      };
    }

    if (!Array.isArray(value) && !isText(value)) {
      return {
        action: "put",
        path: patch.path,
        conflict: false,
        value: cloneDeep(value[index]),
      };
    }

    const length = patch.length || 1;

    return {
      action: "insert",
      path: patch.path,
      values: isText(value)
        ? [...Array(length)].map((_, i) => value.get(Number(index) + i))
        : [...Array(length)].map((_, i) => cloneDeep(value[Number(index) + i])),
    };
  }

  if (patch.action === "put") {
    const value = get(doc, patch.path);

    if (value !== undefined) {
      return {
        action: "put",
        path: patch.path,
        conflict: false,
        value: cloneDeep(value),
      };
    } else {
      // get cannot look up the value of text on put actions,
      // so handle that case separately here.
      const parent = get(doc, patch.path.slice(0, -1));
      const lastPart = patch.path[patch.path.length - 1];
      if (isText(parent) && typeof lastPart === "number") {
        return {
          action: "put",
          path: patch.path,
          conflict: false,
          value: parent.get(lastPart),
        };
      }

      return {
        action: "del",
        path: patch.path,
      };
    }
  }

  if (patch.action === "inc") {
    return {
      action: "inc",
      path: patch.path,
      value: -patch.value,
    };
  }

  if (patch.action === "splice") {
    return {
      action: "del",
      path: patch.path,
      length: patch.value.length,
    };
  }

  throw new Error(`Unknown patch action: ${patch.action}`);
};

const unpatchAll = <T>(beforeDoc: Doc<T>, patches: Patch[]): Patch[] => {
  const copy = cloneDeep(beforeDoc);

  const inverse: Patch[] = [];

  cloneDeep(patches).forEach((p) => {
    inverse.push(unpatch(copy, p));
    patch(copy, p);
  });

  return inverse.reverse();
};

// ---

export { unpatch, unpatchAll }
