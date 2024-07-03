import { Navigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import UserContext from './context/UserContext';

export default function Logout(){                                                                                                                                 
	const { unsetUser, setUser } = useContext(UserContext);
	unsetUser();
	useEffect(() => {
		setUser({id: null});
	});
	return (
		<Navigate to="/login" />
	)
}