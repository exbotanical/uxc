import { onEnterKeyPressed } from '@/utils';
import React, { useContext } from 'react';

import SvgIcon from '@/components/Icon';
import { SearchContext } from '@/components/Search/SearchContext';

import type { SearchRecord } from '@/components/Search/hooks';

import * as S from '@/components/Search/SearchContent/SearchHit/styles';

interface SearchHitProps {
	record: SearchRecord;
}

export function SearchHit({ record }: SearchHitProps) {
	const { activeItemId, setActiveRecordId } = useContext(SearchContext);

	function handleRecordClick() {
		setActiveRecordId(record.id);
	}

	const isActiveRecord = activeItemId === record.id;

	return (
		<S.SearchHit
			onClick={handleRecordClick}
			onKeyPress={onEnterKeyPressed(handleRecordClick)}
			isActiveRecord={isActiveRecord}
		>
			<S.SearchHitContainer>
				<S.SearchHitIcon>
					<SvgIcon name="hash" size={12} />
				</S.SearchHitIcon>
				<S.SearchHitContent>
					<S.SearchHitTitle>{record.label}</S.SearchHitTitle>
				</S.SearchHitContent>

				<S.SearchHitAction>
					<SvgIcon name="arrow-right" size={23} color="#fff" />
				</S.SearchHitAction>
			</S.SearchHitContainer>
		</S.SearchHit>
	);
}

SearchHit.displayName = 'SearchHit';
