
const PENUMBRA_LOCAL_STORAGE_KEY = "claims"

const initialAuthState = {
    claims: JSON.parse(localStorage.getItem(PENUMBRA_LOCAL_STORAGE_KEY))
}

const authReducer = (baseState = initialAuthState, action) => {
    const {type} = action

    switch (type) {
        default: {
            return baseState
        }
    }
}

export default authReducer