import {registerSelectors, getStateWith} from 'reselect-tools'
import {
    selectAllDesigns, selectActiveDesignId,
    selectActiveDesign,
    selectActiveHistory,
    selectActiveHistorySize,
    selectActiveAt,
    selectActiveModel,
    selectActiveEntities,
    selectActiveSelection,
    selectActiveView,
    selectActiveViewTarget,
    selectActiveTool
} from "./design";
import {
    selectOne, selectError,
    selectMany,
    selectList,
    selectOneError
} from "./resource";
import {selectActiveUserId} from "./auth";


export const registerAllSelectors = () => registerSelectors({
    // Design Selectors
    selectAllDesigns,
    selectActiveDesignId,
    selectActiveDesign,
    selectActiveHistory,
    selectActiveHistorySize,
    selectActiveAt,
    selectActiveModel,
    selectActiveEntities,
    selectActiveSelection,
    selectActiveView,
    selectActiveViewTarget,
    selectActiveTool,
    // General Resource Selectors
    selectOne,
    selectError,
    selectMany,
    selectList,
    selectOneError,
    // Auth Selectors
    selectActiveUserId
})