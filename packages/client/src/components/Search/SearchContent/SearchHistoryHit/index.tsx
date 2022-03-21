import React, { useContext } from 'react';

import type { SearchRecord } from '@/components/Search/hooks';

import SvgIcon from '@/components/Icon';
import * as S from '@/components/Search/SearchContent/SearchHistoryHit/styles';
import { SearchContext } from '@/components/Search/SearchContext';
import { mitigateClickBubble, onEnterKeyPressed } from '@/utils';
import { useTheme } from 'styled-components';

interface SearchHistoryHitProps {
	record: SearchRecord;
	isFavorite?: boolean;
}

export function SearchHistoryHit({
	record,
	isFavorite = false
}: SearchHistoryHitProps) {
	const theme = useTheme();
	const blue = theme.colors.link.norm;
	const gray = theme.colors.font.weak;

	const {
		activeRecordId,
		removeFromHistory,
		appendToFavorites,
		removeFromFavorites,
		setIsOpen
	} = useContext(SearchContext);

	const favoriteIconConfig = isFavorite
		? {
				fill: blue,
				color: blue,
				hoverColor: blue
		  }
		: {
				fill: '',
				color: gray,
				hoverColor: blue
		  };

	const favoriteActionConfig = isFavorite
		? {
				title: 'Unfavorite this search result',
				onClick: mitigateClickBubble(() => removeFromFavorites(record))
		  }
		: {
				title: 'Favorite this search result',
				onClick: mitigateClickBubble(() => appendToFavorites(record))
		  };

	const closeActionConfig = isFavorite
		? {
				title: 'Remove this search result from favorites',
				onClick: mitigateClickBubble(() => removeFromFavorites(record))
		  }
		: {
				title: 'Remove this search result from history',
				onClick: mitigateClickBubble(() => removeFromHistory(record))
		  };

	function handleClick() {
		setIsOpen(false);
	}

	const id = `search-hit-${record.id}`;
	const isActiveRecord = activeRecordId === id;

	return (
		<S.ListItem
			isActiveRecord={isActiveRecord}
			onClick={handleClick}
			id={id}
			data-testid={id}
		>
			<S.StyledHashLink smooth to={record.link}>
				<S.ListItemContent>
					{record.content ? <S.Badge>{record.content}</S.Badge> : null}
					<S.Label dangerouslySetInnerHTML={{ __html: record.label }} />
				</S.ListItemContent>

				<S.LeftAction>
					<S.IconButton {...favoriteActionConfig}>
						<SvgIcon name="star" size={20} {...favoriteIconConfig} />
					</S.IconButton>
				</S.LeftAction>

				<S.RightAction>
					<S.IconButton {...closeActionConfig}>
						<SvgIcon name="close" size={32} color={gray} hoverColor={'#fff'} />
					</S.IconButton>
				</S.RightAction>
			</S.StyledHashLink>
		</S.ListItem>
	);
}

SearchHistoryHit.displayName = 'SearchHistoryHit';
