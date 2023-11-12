import React, { useState } from 'react'
import { Menu, MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import { HddOutlined, UserOutlined } from '@ant-design/icons'
import { basicUserInfo } from '../../slices/authSlice'

const LeftMenu = ({ mode }) => {
	const [current, setCurrent] = useState('Reports')
	const userResponse = useAppSelector(basicUserInfo)

	const onClick: MenuProps['onClick'] = (e) => {
		setCurrent(e.key)
	}

	return (
		<Menu
			onClick={onClick}
			selectedKeys={[current]}
			items={[
				{
					label: <Link to={'/'}>Reports</Link>,
					icon: <HddOutlined />,
					key: 'Reports',
				},

				{
					label: userResponse?.user?.role.name === 'admin' && (
						<Link to={'/users'}>Users</Link>
					),
					icon: userResponse?.user?.role.name === 'admin' && <UserOutlined />,
					key: 'Users',
				},
			]}
			mode={mode}>
			{/* <Menu.Item key="8">
            <Icon type="shop" />
            <span className="nav-text">nav 8</span>
          </Menu.Item> */}
		</Menu>
	)
}

export default LeftMenu
