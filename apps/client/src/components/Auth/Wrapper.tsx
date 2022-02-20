import React from 'react';

import * as S from './styles';

import bg from '@/assets/splash.png';

export function Wrapper({ content }: { content: React.ReactNode }) {
	return (
		<S.Container style={{ backgroundImage: `url(${bg})` }}>
			<h1>uxc</h1>
			<>{content}</>
		</S.Container>
	);
}
