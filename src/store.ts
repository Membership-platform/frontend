import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import institutionSlice from './slices/institutionSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		institution: institutionSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
