import React, { useState } from 'react'
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button } from 'antd'
// import { arrowRightOutlined } from '@ant-design/icons'

import './Navbar.scss'

const NavBar = () => {
	const [visible, setVisible] = useState(false)

	const showDrawer = () => {
		setVisible(true)
	}

	const onClose = () => {
		setVisible(false)
	}

	return (
		<div className="NavBar">
			<nav className="menu">
				<div className="menu__logo">
					<a href="">Logo</a>
				</div>
				<div className="menu__container">
					<div className="menu_left"></div>
					<div className="menu_rigth">
						<RightMenu mode="horizontal" />
					</div>
					<Button
						className="menu__mobile-button"
						type="primary"
						onClick={showDrawer}>
						okk
					</Button>
					<Drawer
						title="Basic Drawer"
						placement="right"
						className="menu_drawer"
						closable={false}
						onClose={onClose}
						open={visible}>
						<LeftMenu mode="inline" />
						<RightMenu mode="inline" />
					</Drawer>
				</div>
			</nav>
		</div>
	)
}

export default NavBar
