import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Buttons/Button';

export function ToDashboard() {
	const navigate = useNavigate();
	const toDashboard = () => {
		navigate(`/dashboard`);
	};

	return (
		<Button
			className="mt-auto mb-2 mx-2"
			color="primary"
			onClick={toDashboard}
			type="button"
		>
			To dashboard
		</Button>
	);
}
