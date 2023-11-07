import React from 'react'
import { Alert, Typography } from 'antd'
import { Col, Row } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import './style.scss'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { basicUserInfo, isLoading, login } from '../slices/authSlice'
import { NOT_FOUND, UNAUTHORIZED } from '../constants/status'

import './style.scss'

const { Title, Text } = Typography

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
	console.log(e, 'I was closed.')
}

const Login = () => {
	const dispatch = useAppDispatch()
	const loading = useAppSelector(isLoading)
	const userResponse = useAppSelector(basicUserInfo)

	console.log(userResponse)

	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values)
		try {
			await dispatch(
				login({
					email: values.email,
					password: values.password,
				}),
			)
		} catch (error) {}
	}

	return (
		<div className="pages">
			<div className="auth-padding">
				<Row>
					<Col span={8} offset={8}>
						<Title>Membership Platform</Title>
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{ remember: true }}
							onFinish={onFinish}>
							<Form.Item
								name="email"
								rules={[
									{ required: true, message: 'Please input your Email!' },
								]}>
								<Input
									prefix={<UserOutlined className="site-form-item-icon" />}
									placeholder="Email"
								/>
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{ required: true, message: 'Please input your Password!' },
								]}>
								<Input
									prefix={<LockOutlined className="site-form-item-icon" />}
									type="password"
									placeholder="Password"
								/>
							</Form.Item>

							{userResponse?.status === UNAUTHORIZED && (
								<Alert
									message={
										<div>
											<Text>{userResponse?.message}</Text>
										</div>
									}
									type="error"
									closable
									onClose={onClose}
								/>
							)}

							{userResponse?.status === NOT_FOUND && (
								<Alert
									message={
										<div>
											<Text>{userResponse?.message}</Text>
										</div>
									}
									type="error"
									closable
									onClose={onClose}
								/>
							)}

							<Form.Item>
								<Button
									type="primary"
									loading={loading}
									htmlType="submit"
									className={userResponse ? 'login-btn-1' : 'login-btn-2'}>
									Log in
								</Button>
								<span className="space-between-btn-text">Or</span>{' '}
								<a href="/register">register now!</a>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Login
function dispatch(arg0: any) {
	throw new Error('Function not implemented.')
}
