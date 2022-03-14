//const proxy = require("http-proxy-middleware")
const pkg = require("../package.json")
const { proxy, createProxyMiddleware } = require("http-proxy-middleware")

const target = process.env.PROXY || pkg.proxy

module.exports = (app) => {
    if (target) {
        const backendPrefixes = ["/api"]
        backendPrefixes.forEach((backendUrl) => {
            app.use(backendUrl, createProxyMiddleware({ target }))
        })
    }
}
