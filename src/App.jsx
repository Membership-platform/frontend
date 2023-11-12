import React, { useEffect } from 'react'
import { Button, Modal, Space, Typography } from 'antd'
import { Routes, Route } from 'react-router-dom'

import { useAppSelector } from './hooks/redux-hooks'
import { Link } from 'react-router-dom'

import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Confirm from './pages/Confirm'
import DefaultLayout from './layouts/DefaultLayout'
import ProtectedLayout from './layouts/ProtectedLayout'
import NavBar from './components/NavBar'
import { OK, UNAUTHORIZED } from './constants/status'
import { usersData } from './slices/userSlice'

const { Title } = Typography

function App() {
	const userResponse = useAppSelector(usersData)

	const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo)

	useEffect(() => {
		if (userResponse?.status === UNAUTHORIZED) {
			localStorage.removeItem('userInfo')
		}
	}, [])

	return (
		<>
			{[OK].indexOf(basicUserInfo?.status) != -1 && <NavBar />}
			<Routes>
				<Route element={<DefaultLayout />}>
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/confirm" element={<Confirm />} />
				<Route element={<ProtectedLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/users" element={<Users />} />
				</Route>
			</Routes>

			<>
				{[UNAUTHORIZED].indexOf(userResponse?.status) != -1 && (
					<Modal footer={null} open={false}>
						<Space
							direction="horizontal"
							style={{
								width: '100%',
								justifyContent: 'center',
								marginTop: '20px',
								marginBottom: '18px',
							}}>
							<Title style={{ fontSize: '17px' }}>
								Your session is expired, Please Login again
							</Title>
						</Space>
						<Space
							direction="horizontal"
							style={{
								width: '100%',
								justifyContent: 'center',
								marginBottom: '10px',
							}}>
							<Button type="primary">
								<Link to="/login">Login</Link>
							</Button>
						</Space>
					</Modal>
				)}
			</>
		</>
	)
}

export default App
