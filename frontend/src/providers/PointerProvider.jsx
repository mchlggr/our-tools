import React, {memo, useCallback, useMemo, useState} from 'react';
import {createPointerStore, PointerStoreProvider} from "../contexts/pointerStore";


const PointerProvider = (props) => {
    const {children} = props


    return (<>
            <PointerStoreProvider createStore={createPointerStore}>
                {children}
            </PointerStoreProvider>
        </>
    );
}

PointerProvider.propTypes = {};

const PointerProviderMemo = memo(PointerProvider)
PointerProviderMemo.displayName = "PointerProvider"

export default PointerProviderMemo