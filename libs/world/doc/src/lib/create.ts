import {
  defaultVersion,
  emptyBoundary,
  emptyEntities,
  emptyFacets,
  WorldModel
} from '@our-tools/world-shared';
import { createCounter, createDoc, createDate } from '@our-tools/crdt-repo';

//TODO: move to another shared module
const defaultTool = 'tool:select';

const createWorld = async (docUrl: string): Promise<WorldModel> => {
  return await createDoc((doc: WorldModel) => {
    doc.version = defaultVersion
    //
    doc.modifiedBy = 'user:13221';
    doc.modifiedAt = createDate()
    doc.modifiedCounter = createCounter()
    //
    doc.tool = defaultTool;
    doc.selectingIds = {};
    //
    doc.lockingIds = {};
    doc.parkingIds = {};
    doc.erasingIds = {};
    doc.hintingIds = {};
    //
    doc.editingIds = {}
    doc.croppingIds = {}
    doc.focusingIds = {}
    //
    doc.boundary = emptyBoundary;
    //
    doc.facets = emptyFacets;
    //
    doc.entities = emptyEntities;
    //
    doc.edges = [];
  }, { docUrl });
};

// ---

export { createWorld }
