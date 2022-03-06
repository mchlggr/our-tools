const pageRoutes = {
    auth: {
        login: () => "/login",
        signup: () => "/signup"
    },
    design: {
        index: () => `/designs`,
        edit: (id=":id") => `/designs/${id}`
    }
}

export default pageRoutes