import {AUTH_LOGIN, AUTH_LOGOUT} from "../actions/auth";
import {emptyObject} from "../utils/empty";
import {get} from 'lodash'
import produce from "immer";

const PENUMBRA_LOCAL_STORAGE_KEY = "claims"

const initialAuthState = {
    claims: JSON.parse(localStorage.getItem(PENUMBRA_LOCAL_STORAGE_KEY))
}

const authReducer = (baseState = initialAuthState, action) => {
    console.log("!!!/baseState",baseState)
    const {type, payload} = action

    console.log("!!!/payload",payload)

    switch (type) {
        case AUTH_LOGIN.SUCCESS: {
            return produce(baseState, (draftState) => {
                const {access_token, refresh_token} = payload || emptyObject

                // debugger
                const claimsPart = get(access_token.split('.'), 1)
                // noinspection JSDeprecatedSymbols
                const claims = JSON.parse(atob(claimsPart))

                localStorage.setItem("token", JSON.stringify(payload))
                localStorage.setItem("claims", JSON.stringify(claims))
                localStorage.setItem("refresh_token", JSON.stringify(refresh_token))

                return {
                    token: payload,
                    refresh_token,
                    claims
                }
            })
        }
        case AUTH_LOGOUT.STARTED:
        case AUTH_LOGOUT.SUCCESS: {
            return produce(baseState, (draftState) => {
                localStorage.removeItem("token")
                localStorage.removeItem("claims")
                localStorage.removeItem("refresh_token")

                return {claims: null, token: null, refresh_token: null}
            })
        }
        default: {
            return baseState
        }
    }
}

export default authReducer