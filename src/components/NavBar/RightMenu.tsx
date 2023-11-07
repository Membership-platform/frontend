import React, { useEffect } from 'react'
import { Menu } from 'antd'
import { signout } from '../../slices/authSlice'
import {
	FlagOutlined,
	HddOutlined,
	LogoutOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { basicUserInfo } from '../../slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

const RightMenu = ({ mode }) => {
	const dispatch = useAppDispatch()
	const userResponse = useAppSelector(basicUserInfo)

	const logout = () => {
		console.log('logged out')
		try {
			dispatch(signout())
		} catch (error) {}
	}
	return (
		<Menu
			items={[
				{
					label: <a onClick={logout}>Sign Out</a>,
					icon: <LogoutOutlined />,
					key: 'SignOut',
					children: [
						{
							label: userResponse.user?.firstName,
							icon: <UserOutlined />,
							key: 'submenu-item-1',
						},
						{
							label: userResponse.user?.country,
							icon: <FlagOutlined />,
							key: 'submenu-item-2',
						},

						{
							label: userResponse.user?.institution?.name,
							icon: <HddOutlined />,
							key: 'submenu-item-3',
						},
					],
				},
			]}
			mode={mode}
		/>
	)
}

export default RightMenu
