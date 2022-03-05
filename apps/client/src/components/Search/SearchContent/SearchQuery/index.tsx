import { onEnterKeyPressed } from '@/utils';
import React, { useContext } from 'react';

import SvgIcon from '@/components/Icon';
import { SearchContext } from '@/components/Search/SearchContext';

import type { SearchRecord } from '@/components/Search/hooks';

import * as S from '@/components/Search/SearchContent/SearchQuery/styles';

interface SearchQueryProps {
	record: SearchRecord;
}

export function SearchQuery({ record }: SearchQueryProps) {
	const { activeItemId, setActiveRecordId } = useContext(SearchContext);

	function handleRecordClick() {
		setActiveRecordId(record.id);
	}

	const isActiveRecord = activeItemId === record.id;

	return (
		<S.ListItem
			isActiveRecord={isActiveRecord}
			role="button"
			tabIndex={0}
			onClick={handleRecordClick}
			onKeyPress={onEnterKeyPressed(handleRecordClick)}
		>
			<S.LinkBoundary>
				<S.ListItemContent>
					{record.content ? <S.Badge>{record.content}</S.Badge> : null}
					<S.Label>{record.label}</S.Label>
				</S.ListItemContent>

				<S.LeftAction>
					<S.IconButton title="Save this search">
						<SvgIcon name="star" size={20} />
					</S.IconButton>
				</S.LeftAction>

				<S.RightAction>
					<S.IconButton title="Remove this search from history">
						<SvgIcon name="close" size={20} />
					</S.IconButton>
				</S.RightAction>
			</S.LinkBoundary>
		</S.ListItem>
	);
}

SearchQuery.displayName = 'SearchQuery';
