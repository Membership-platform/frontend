import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'

const { Content, Footer, Sider } = Layout

const Sidebar = () => {
	return (
		<Layout>
			<Sider
				width={150}
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					top: 0,
					left: 0,
				}}>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['4']}
					items={[
						{
							label: <a>Reports</a>,
							icon: <LogoutOutlined />,
							key: 'Reports',
						},
						{
							label: <a>Users</a>,
							icon: <LogoutOutlined />,
							key: 'Users',
						},
					]}>
					{/* <Menu.Item key="8">
            <Icon type="shop" />
            <span className="nav-text">nav 8</span>
          </Menu.Item> */}
				</Menu>
			</Sider>
		</Layout>
	)
}

export default Sidebar
