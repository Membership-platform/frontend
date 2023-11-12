import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	current,
} from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosInstance'
import cookies from 'js-cookies'

type UserBasicInfo = {
	id: string
	email: string
	phone: string
	institutionId: number
}

type Users = {
	id: string
	firstname: string
	email: string
	phone: string
	role: []
	users: []
	institution: []
	filter: any
}

type UserProfileData = {
	email: string
	phone: string
	institutionId: number
}

type AuthApiState = {
	basicUserInfo?: UserBasicInfo | null
	userProfileData?: UserProfileData | null
	users: Users | any
	loading: boolean
	user: any
	status: 'idle' | 'loading' | 'failed'
	error: string | null
}

const initialState: AuthApiState = {
	basicUserInfo: null,
	userProfileData: undefined,
	users: null,
	user: null,
	status: 'idle',
	loading: false,
	error: null,
}

export const getUser = createAsyncThunk(
	'user/profile',
	async (userId: string) => {
		const response = await axiosInstance.get(`/v1/users/${userId}`)
		return response.data
	},
)

export const getUsers = createAsyncThunk('users/profile', async () => {
	try {
		const response = await axiosInstance.get(`/v1/users`)

		return response.data
	} catch (error) {
		return error.response.data
	}
})

export const deleteUser = createAsyncThunk(
	'user/delete',
	async (userId: number) => {
		const response = await axiosInstance.delete(`/v1/users/${userId}`)
		return response.data
	},
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(getUser.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.status = 'idle'
				state.userProfileData = action.payload
			})
			.addCase(getUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Get user profile data failed'
			})
			.addCase(getUsers.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.status = 'idle'
				state.users = action.payload
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Get user profile data failed'
			})
			.addCase(deleteUser.pending, (state) => {
				state.loading = true
				state.status = 'loading'
				state.error = null
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.loading = false
				state.status = 'idle'

				state.users.users = state.users?.users?.filter((user: any) => {
					return user.id !== action.meta.arg
				})
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false
				state.status = 'failed'
				state.error = action.error.message || 'Get user profile data failed'
			})
	},
})

export const userData = (state) => state.user.userProfileData
export const usersData = (state) => state.user.users

export default userSlice.reducer
