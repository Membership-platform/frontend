import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppSelector } from './hooks/redux-hooks'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Confirm from './pages/Confirm'
import DefaultLayout from './layouts/DefaultLayout'
import ProtectedLayout from './layouts/ProtectedLayout'
import Sidebar from './components/Sidebar'
import { OK, CREATED } from './constants/status'

function App() {
	const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo)
	return (
		<>
			<Routes>
				<Route element={<DefaultLayout />}>
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/confirm" element={<Confirm />} />
				<Route element={<ProtectedLayout />}>
					<Route path="/" element={<Home />} />
				</Route>
			</Routes>
			{[OK].indexOf(basicUserInfo?.status) != -1 && <Sidebar />}
		</>
	)
}

export default App
