const usersReducer = (state = { users: [], loading: false }, action) => {
    switch (action.type) {
        case 'LOADING_USERS':
            return {
                ...state,
                users: [...state.users],
                loading: true
            }
        case 'ADD_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'EDIT_USER':
            let user = state.users.map(user => {
                if (user.id === action.user.id)
                    user.username = action.user.username
                return user
            })

            return {
                ...state,
                users: user
            }

        default: return state
    }
}

export default usersReducer