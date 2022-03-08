import React, { useContext } from 'react';

import type { SearchRecord } from '@/components/Search/hooks';

import SvgIcon from '@/components/Icon';
import * as S from '@/components/Search/SearchContent/SearchHit/styles';
import { SearchContext } from '@/components/Search/SearchContext';
import { onEnterKeyPressed } from '@/utils';

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
			isActiveRecord={isActiveRecord}
			onClick={handleRecordClick}
			onKeyPress={onEnterKeyPressed(handleRecordClick)}
		>
			<S.SearchHitContainer>
				<S.SearchHitIcon>
					<SvgIcon name="hash" size={12} />
				</S.SearchHitIcon>
				<S.SearchHitContent>
					<S.SearchHitTitle>{record.label}</S.SearchHitTitle>
				</S.SearchHitContent>

				<S.SearchHitAction>
					<SvgIcon color="#fff" name="arrow-right" size={23} />
				</S.SearchHitAction>
			</S.SearchHitContainer>
		</S.SearchHit>
	);
}

SearchHit.displayName = 'SearchHit';
