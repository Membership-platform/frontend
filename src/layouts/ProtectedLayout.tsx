import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { Navigate } from 'react-router-dom'

const ProtectedLayout = () => {
	const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo)

	console.log('basicUserInfo: ', basicUserInfo)

	if (!basicUserInfo) {
		return <Navigate replace to={'/login'} />
	}

	return (
		<>
			<Outlet />
		</>
	)
}

export default ProtectedLayout
