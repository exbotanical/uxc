import React from 'react';

import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '@material-ui/icons/Search';

import '@/styles/header.scss';

const Header = () => {
	return (
		<div className="header">
			<div className="header__left">
				<Avatar className="header__avatar" />
				<AccessTimeIcon />
			</div>
			<div className="header__search">
				<SearchIcon />
				<input type="text" placeholder="Search" />
			</div>
			<div className="header__right">
				<HelpOutlineIcon />
			</div>
		</div>
	);
};

export default Header;
