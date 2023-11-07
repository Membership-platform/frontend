import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosInstance'

type InstitutionInfo = {
	id: string
	name: string
	createdAt: string
	updatedAt: string
}

type AuthApiState = {
	institutions?: InstitutionInfo | null
	status: 'idle' | 'loading' | 'failed'
	error: string | null
}

const initialState: AuthApiState = {
	institutions: undefined,
	status: 'idle',
	error: null,
}

export const getInstitutions = createAsyncThunk('institutions', async () => {
	const response = await axiosInstance.get(`/v1/institutions`)

	return response.data
})

const institutionsSlice = createSlice({
	name: 'institutionList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(getInstitutions.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(getInstitutions.fulfilled, (state, action) => {
				state.status = 'idle'
				state.institutions = action.payload
			})
			.addCase(getInstitutions.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Get institution data failed'
			})
	},
})

export const selectInstitutions = (state) => state.institution.institutions

export default institutionsSlice.reducer
