import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import cookies from 'js-cookies'
import axiosInstance from '../api/axiosInstance'

type User = {
	firstName: string
	email: string
	password: string
	phone: string
	country: string
	language?: string
	institutionId: number
}

type UserLogin = {
	email: string
	password: string
}

type UserBasicInfo = {
	id: string
	email: string
	phone: string
	country: string
	institutionId: number
}

type UserProfileData = {
	email: string
	phone: string
	institutionId: number
	country: string
	language?: string
}

type AuthApiState = {
	basicUserInfo?: UserBasicInfo | null
	userProfileData?: UserProfileData | null
	loading: boolean
	confirm: any
	status: 'idle' | 'loading' | 'failed'
	error: string | null
}

const initialState: AuthApiState = {
	basicUserInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo') as string)
		: null,
	userProfileData: undefined,
	confirm: null,
	loading: false,
	status: 'idle',
	error: null,
}

export const login = createAsyncThunk('login', async (data: UserLogin) => {
	try {
		const response = await axiosInstance.post('/v1/auth/login', data)
		const resData = response.data

		localStorage.setItem('userInfo', JSON.stringify(resData))

		return resData
	} catch (error) {
		return error.response.data
	}
})

export const register = createAsyncThunk('register', async (data: User) => {
	try {
		const response = await axiosInstance.post('/v1/auth/signup', data)
		const resData = response.data

		localStorage.setItem('userInfo', JSON.stringify(resData))

		return resData
	} catch (error) {
		return error.response.data
	}
})

export const signout = createAsyncThunk('logout', async () => {
	const response = await axiosInstance.get('/v1/auth/logout')
	const resData = response.data

	localStorage.removeItem('userInfo')

	return resData
})

export const confirm = createAsyncThunk('confirm', async (data: any) => {
	try {
		const response = await axiosInstance.post('/v1/users/confirm', data)
		const resData = response.data

		return resData
	} catch (error) {
		return error.response.data
	}
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				login.fulfilled,
				(state, action: PayloadAction<UserBasicInfo>) => {
					state.loading = false
					state.status = 'idle'
					state.basicUserInfo = action.payload
				},
			)
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.status = 'failed'
				state.error = action.error.message || 'Login failed'
			})

			.addCase(register.pending, (state) => {
				state.loading = true
				state.status = 'loading'

				state.error = null
			})
			.addCase(
				register.fulfilled,
				(state, action: PayloadAction<UserBasicInfo>) => {
					state.loading = false
					state.status = 'idle'
					state.basicUserInfo = action.payload
				},
			)
			.addCase(register.rejected, (state, action) => {
				state.loading = false
				state.status = 'failed'
				state.error = action.error.message || 'Registration failed'
			})

			.addCase(signout.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(signout.fulfilled, (state, action) => {
				console.log('action ==>>>', action)

				state.status = 'idle'
				state.basicUserInfo = null
			})
			.addCase(signout.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Logout failed'
			})
			.addCase(confirm.pending, (state) => {
				state.loading = true
				state.status = 'loading'
				state.error = null
			})
			.addCase(confirm.fulfilled, (state, action) => {
				state.loading = false
				state.status = 'idle'
				state.confirm = action.payload
			})
			.addCase(confirm.rejected, (state, action) => {
				state.loading = false
				state.status = 'failed'
				state.error = action.error.message || 'Logout failed'
			})
	},
})

export const isLoading = (state) => state.auth.loading
export const basicUserInfo = (state) => state.auth.basicUserInfo
export const errorMessage = (state) => state.auth.error
export const confirmInfo = (state) => state.auth.confirm

export default authSlice.reducer
