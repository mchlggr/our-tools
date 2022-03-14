const apiRoutes = {
    auth: {
        login: () => "/api/v1/token", // POST
        signup: () => "/users" // POST
    },
    design: {
        index: () => `/designs`, // Get
    }
}

export default apiRoutes