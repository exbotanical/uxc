import React, { useContext } from 'react';

import type { SearchRecord } from '@/components/Search/hooks';

import SvgIcon from '@/components/Icon';
import * as S from '@/components/Search/SearchContent/SearchHit/styles';
import { SearchContext } from '@/components/Search/SearchContext';

interface SearchHitProps {
	record: SearchRecord;
}

export function SearchHit({ record }: SearchHitProps) {
	const { activeRecordId, setIsOpen, appendToHistory } =
		useContext(SearchContext);

	function handleClick() {
		appendToHistory(record);
		setIsOpen(false);
	}

	const id = `search-hit-${record.id}`;
	const isActiveRecord = activeRecordId === id;

	return (
		<S.SearchHit
			data-testid={id}
			id={id}
			isActiveRecord={isActiveRecord}
			onClick={handleClick}
		>
			<S.StyledHashLink smooth to={record.link}>
				<S.SearchHitContainer>
					<S.SearchHitIcon>
						<SvgIcon name="hash" size={12} />
					</S.SearchHitIcon>

					<S.SearchHitContent>
						{record.category === 'message' ? (
							<S.SearchHitTitle
								dangerouslySetInnerHTML={{ __html: record.label }}
							/>
						) : (
							<S.SearchHitTitle>{record.label}</S.SearchHitTitle>
						)}
					</S.SearchHitContent>

					<S.SearchHitAction>
						<SvgIcon color="#fff" name="arrow-right" size={23} />
					</S.SearchHitAction>
				</S.SearchHitContainer>
			</S.StyledHashLink>
		</S.SearchHit>
	);
}

SearchHit.displayName = 'SearchHit';
