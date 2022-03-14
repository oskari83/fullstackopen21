import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import visibleReducer from './reducers/visibleReducer'

const store = configureStore({
    reducer: {
      blogs: blogReducer,
      message: messageReducer,
      users: userReducer,
      visible: visibleReducer,
    }
})

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))

export default store