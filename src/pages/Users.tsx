import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Col, Row, Typography, Popconfirm } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import type { ColumnsType } from 'antd/es/table'
import { deleteUser, getUsers, usersData } from '../slices/userSlice'

const { Title } = Typography

interface DataType {
	id: number
	key: string
	firstName: string
	country: string
	email: string
	institution: string[]
	role: string[]
	verified: boolean
}

const Users = () => {
	const dispatch = useAppDispatch()
	const userResponse = useAppSelector(usersData)

	const handleDelete = async (key: number) => {
		try {
			await dispatch(deleteUser(key))
		} catch (error) {}
	}

	const columns: ColumnsType<DataType> = [
		{
			title: 'FirstName',
			dataIndex: 'firstName',
			key: 'firstName',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Country',
			dataIndex: 'country',
			key: 'country',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Institution',
			key: 'institution',
			dataIndex: 'institution',
			render: (_, record: any) => {
				let color = record.institution.name?.length > 7 ? 'green' : 'blue'
				if (record.name?.length === 'loser') {
					color = 'volcano'
				}
				return (
					<>
						<Tag color={color} key={record.name}>
							{record.institution.name.toUpperCase()}
						</Tag>
					</>
				)
			},
		},
		{
			title: 'Role',
			key: 'role',
			dataIndex: 'role',
			render: (_, record: any) => {
				let color = record.role.name?.length > 5 ? 'geekblue' : 'green'
				if (record.name?.length === 'loser') {
					color = 'volcano'
				}
				return (
					<>
						<Tag color={color} key={record.name}>
							{record.role.name.toUpperCase()}
						</Tag>
					</>
				)
			},
		},
		{
			title: 'Account',
			key: 'account',
			dataIndex: 'account',
			render: (_, record: any) => {
				let color = record.verified === false ? 'geekblue' : 'green'
				if (record.name?.length === 'loser') {
					color = 'volcano'
				}
				return (
					<>
						<Tag color={color} key={record.name}>
							{record.verified === true ? 'Verified' : 'Not Verified'}
						</Tag>
					</>
				)
			},
		},

		{
			title: 'Action',
			key: 'action',
			render: (_, record: any) => (
				<Space size="middle">
					<a>Edit</a>
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => handleDelete(record.id)}>
						<a>Delete</a>
					</Popconfirm>
				</Space>
			),
		},
	]

	const filterNormalUsers =
		userResponse &&
		userResponse.users?.filter((user) => {
			return user.role.name != 'admin'
		})

	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])

	return (
		<div>
			<Row>
				<Col span={22} offset={1}>
					<Title level={3}>Users</Title>
					<Table
						columns={columns}
						dataSource={filterNormalUsers}
						rowKey={(obj) => obj.id}
					/>
				</Col>
			</Row>
		</div>
	)
}

export default Users
