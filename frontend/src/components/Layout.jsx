import React, {memo} from "react"
import classNames from "classnames"

import s from "../styles/layout.module.css"


function Layout({children, className, ...rest}) {
    return (
        <div
            className={classNames(s.module_container, className)}
            {...rest}
        >
            {children}
        </div>
    )
}

Layout.propTypes = {}

function LayoutHeader({children, className, ...rest}) {
    return (
        <div
            className={classNames(
                s.module_row,
                s.module_header,
                className
            )}
            {...rest}
        >
            {children}
        </div>
    )
}

function LayoutContent({children, className, ...rest}) {
    return (
        <div
            className={classNames(
                s.module_row,
                s.module_content,
                className
            )}
            {...rest}
        >
            {children}
        </div>
    )
}

function LayoutFooter({children, className, ...rest}) {
    return (
        <div
            className={classNames(
                s.module_row,
                s.module_footer,
                className
            )}
            {...rest}
        >
            {children}
        </div>
    )
}

const LayoutMemo = memo(Layout)
LayoutMemo.displayName = "Layout"

const LayoutHeaderMemo = memo(LayoutHeader)
LayoutHeaderMemo.displayName = "LayoutHeader"

const LayoutContentMemo = memo(LayoutContent)
LayoutContentMemo.displayName = "LayoutContent"

const LayoutFooterMemo = memo(LayoutFooter)
LayoutFooterMemo.displayName = "LayoutFooter"


LayoutMemo.Container = LayoutMemo
LayoutMemo.Header = LayoutHeaderMemo
LayoutMemo.Content = LayoutContentMemo
LayoutMemo.Footer = LayoutFooterMemo

export default LayoutMemo
