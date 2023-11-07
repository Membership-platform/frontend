import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux-hooks'
import { Navigate } from 'react-router-dom'
import { OK } from '../constants/status'

const DefaultLayout = () => {
	const basicUserInfo: any = useAppSelector((state) => state.auth.basicUserInfo)

	if (basicUserInfo?.status === OK) {
		return <Navigate replace to={'/'} />
	}

	return (
		<>
			<Outlet />
		</>
	)
}

export default DefaultLayout
