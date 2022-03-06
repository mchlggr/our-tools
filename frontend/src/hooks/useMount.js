import {useRef, useEffect} from "react";

const useMount = (f) => {
    const mounted = useRef(false)
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
            return f() // Do NOT return Promise or Async
        }
    })
}
export default useMount