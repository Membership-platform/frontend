import React, { useState, useMemo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { Typography } from 'antd'
import { Col, Row } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Select as AntSelect, Alert } from 'antd'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { getInstitutions } from '../slices/institutionSlice'
import { selectInstitutions } from '../slices/institutionSlice'
import { isLoading, register, basicUserInfo } from '../slices/authSlice'
import { BAD_REQUEST, CONFLICT, CREATED } from '../constants/status'

import { Button, Form, Input } from 'antd'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import './style.scss'

const { Title, Text } = Typography

const { Option } = AntSelect

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
	console.log(e, 'I was closed.')
}

const Register = () => {
	const [phone, setPhone] = useState('')
	const [country, setCountry] = useState('')
	const [institutionId, setnstitutionId] = useState(0)
	const options = useMemo(() => countryList()?.getData(), [])
	const dispatch = useAppDispatch()
	const institutions = useAppSelector(selectInstitutions)
	const loading = useAppSelector(isLoading)
	const userResponse = useAppSelector(basicUserInfo)

	const changeHandler = (value) => {
		setCountry(value.label)
	}

	const handleChange = (value: number) => {
		setnstitutionId(value)
		console.log(`selected ${value}`)
	}

	const onFinish = async (values: any) => {
		try {
			await dispatch(
				register({
					firstName: values.firstName,
					email: values.email,
					password: values.password,
					phone: phone,
					country: country,
					institutionId: institutionId,
				}),
			)
		} catch (error) {}
	}

	useEffect(() => {
		dispatch(getInstitutions())
	}, [dispatch])

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
								<Text>FirstName</Text>
							</Col>
							<Form.Item
								className="email-style"
								name="firstName"
								rules={[
									{ required: true, message: 'Please input your firstName!' },
								]}>
								<Input
									prefix={<UserOutlined className="site-form-item-icon" />}
									placeholder="FirstName"
								/>
							</Form.Item>
							<Col>
								<Text>Email</Text>
							</Col>
							<Form.Item
								className="email-style"
								name="email"
								rules={[
									{ required: true, message: 'Please input your Email!' },
								]}>
								<Input
									prefix={<UserOutlined className="site-form-item-icon" />}
									placeholder="Email"
								/>
							</Form.Item>
							<Col>
								<Text>Password</Text>
							</Col>
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

							{userResponse?.status === BAD_REQUEST &&
								userResponse.errors &&
								userResponse.errors.map((error) => (
									<Alert
										message={
											<div>
												<Text>{error?.message}</Text>
											</div>
										}
										type="error"
										closable
										onClose={onClose}
									/>
								))}

							<Col
								className={
									userResponse?.status === BAD_REQUEST ? 'text-up' : '0'
								}>
								<Text>Institution</Text>
							</Col>
							<Form.Item>
								<AntSelect
									onChange={handleChange}
									placeholder="Select"
									optionLabelProp="label"
									dropdownMatchSelectWidth={false}>
									{institutions?.institutions?.map((institution) => (
										<Option
											key={institution.id}
											value={institution.id}
											label={institution.name}>
											{institution.name}
										</Option>
									))}
								</AntSelect>
							</Form.Item>
							<Col>
								<Text>Country</Text>
							</Col>
							<Form.Item>
								<Select options={options} onChange={changeHandler} />
							</Form.Item>

							<Col>
								<Text>Phone</Text>
							</Col>
							<Form.Item
								name="phone"
								rules={[
									{ required: true, message: 'Please input your Phone!' },
								]}>
								<PhoneInput
									inputClassName="phone-input-width"
									defaultCountry="rw"
									value={phone}
									onChange={(phone) => setPhone(phone)}
								/>
							</Form.Item>

							{userResponse?.status === CONFLICT &&
								userResponse.errors &&
								userResponse.errors.map((error) => (
									<Alert
										message={
											<div>
												<Text>{error?.message}</Text>
											</div>
										}
										type="error"
										closable
										onClose={onClose}
									/>
								))}

							{userResponse?.status === CREATED && (
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
									Register
								</Button>
								<span className="space-between-btn-text">Or</span>{' '}
								<a href="/login">Login now!</a>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Register
