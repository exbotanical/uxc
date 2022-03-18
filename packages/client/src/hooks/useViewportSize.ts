import { useMediaQuery } from 'react-responsive';

export function useViewportSize() {
	const isLg = useMediaQuery({ minWidth: 1336 });
	const isMd = useMediaQuery({ minWidth: 1055 });
	const isSm = useMediaQuery({ minWidth: 780 });

	if (isLg) {
		return 3;
	}

	if (isMd) {
		return 2;
	}

	if (isSm) {
		return 1;
	}

	return 0;
}
