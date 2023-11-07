import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosInstance'
import cookies from 'js-cookies'

type UserBasicInfo = {
	id: string
	email: string
	phone: string
	institutionId: number
}

type UserProfileData = {
	email: string
	phone: string
	institutionId: number
}

type AuthApiState = {
	basicUserInfo?: UserBasicInfo | null
	userProfileData?: UserProfileData | null
	status: 'idle' | 'loading' | 'failed'
	error: string | null
}

const initialState: AuthApiState = {
	basicUserInfo: cookies.getItem('userInfo')
		? JSON.parse(cookies.getItem('userInfo') as string)
		: null,
	userProfileData: undefined,
	status: 'idle',
	error: null,
}

export const getUser = createAsyncThunk(
	'users/profile',
	async (userId: string) => {
		const response = await axiosInstance.get(`/v1/users/${userId}`)
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
	},
})

export const userData = (state) => state.user.userProfileData

export default userSlice.reducer
