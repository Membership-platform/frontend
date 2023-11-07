import React, { useEffect } from 'react'
import { Alert, Typography } from 'antd'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { isLoading, confirm, confirmInfo } from '../slices/authSlice'
import { UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import './style.scss'
import { NOT_FOUND, OK } from '../constants/status'

const { Title, Text } = Typography

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
	console.log(e, 'I was closed.')
}

const Confirm = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const loading = useAppSelector(isLoading)
	const userResponse = useAppSelector(confirmInfo)

	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values)
		try {
			dispatch(
				confirm({
					authConfirmToken: values.authConfirmToken,
				}),
			)
		} catch (error) {
			console.log('error: ', error)
		}
	}

	useEffect(() => {
		if (userResponse?.status === OK) {
			return navigate('/login')
		}
	}, [userResponse?.status])

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
							<Col>
								<Text>Confirmation code</Text>
							</Col>
							<Form.Item
								name="authConfirmToken"
								rules={[
									{ required: true, message: 'Please input your Code!' },
								]}>
								<Input
									prefix={<UserOutlined className="site-form-item-icon" />}
									placeholder="Code"
								/>
							</Form.Item>

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

							{userResponse?.status === OK && (
								<Alert
									message={
										<div>
											<Text>{userResponse?.message}</Text>
										</div>
									}
									type="success"
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
									Confirm
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Confirm
function dispatch(arg0: boolean) {
	throw new Error('Function not implemented.')
}
