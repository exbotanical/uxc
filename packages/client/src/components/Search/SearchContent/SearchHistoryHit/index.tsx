import React, { useContext, useRef, useState } from 'react';
import { useTheme } from 'styled-components';

import type { SearchRecord } from '@/components/Search/hooks';

import SvgIcon from '@/components/Icon';
import * as S from '@/components/Search/SearchContent/SearchHistoryHit/styles';
import { SearchContext } from '@/components/Search/SearchContext';
import { mitigateClickBubble, onEnterKeyPressed } from '@/utils';

interface SearchHistoryHitProps {
	record: SearchRecord;
	isFavorite?: boolean;
}

export function SearchHistoryHit({
	record,
	isFavorite = false
}: SearchHistoryHitProps) {
	const [isFocused, setIsFocused] = useState(false);

	const theme = useTheme();
	const themeBlue = theme.colors.link.norm;
	const themeGray = theme.colors.font.weak;

	const {
		removeFromHistory,
		appendToFavorites,
		removeFromFavorites,
		setIsOpen
	} = useContext(SearchContext);

	const favoriteIconConfig = isFavorite
		? {
				fill: themeBlue,
				color: themeBlue,
				hoverColor: themeBlue
		  }
		: {
				fill: '',
				color: themeGray,
				hoverColor: themeBlue
		  };

	// @todo pass in these handler fns as props so we only create a single instance
	const favoriteActionConfig = isFavorite
		? {
				title: 'Unfavorite this search result',
				onClick: mitigateClickBubble(() => {
					removeFromFavorites(record);
				}),
				onKeyPress: onEnterKeyPressed(
					mitigateClickBubble(() => {
						removeFromFavorites(record);
					})
				)
		  }
		: {
				title: 'Favorite this search result',
				onClick: mitigateClickBubble(() => {
					appendToFavorites(record);
				}),
				onKeyPress: onEnterKeyPressed(
					mitigateClickBubble(() => {
						appendToFavorites(record);
					})
				)
		  };

	const closeActionConfig = isFavorite
		? {
				title: 'Remove this search result from favorites',
				onClick: mitigateClickBubble(() => {
					removeFromFavorites(record);
				}),
				onKeyPress: onEnterKeyPressed(
					mitigateClickBubble(() => {
						removeFromFavorites(record);
					})
				)
		  }
		: {
				title: 'Remove this search result from history',
				onClick: mitigateClickBubble(() => {
					removeFromHistory(record);
				}),
				onKeyPress: onEnterKeyPressed(
					mitigateClickBubble(() => {
						removeFromHistory(record);
					})
				)
		  };

	function handleClick() {
		setIsOpen(false);
	}

	function handleKeypress() {
		// this event will propagate up to and invoke `handleClick`
		ref.current?.click();
	}

	function handleFocus() {
		setIsFocused(true);
	}

	function handleBlur() {
		setIsFocused(false);
	}

	const id = `search-history-hit-${record.id}`;
	const ref = useRef<HTMLAnchorElement>(null);

	return (
		<S.ListItem
			data-testid={id}
			id={id}
			isFocused={isFocused}
			onClick={handleClick}
			onKeyPress={onEnterKeyPressed(handleKeypress)}
			tabIndex={-1}
			onFocus={handleFocus}
			onBlur={handleBlur}
		>
			<S.StyledHashLink smooth to={record.link} ref={ref}>
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
						<SvgIcon
							color={themeGray}
							hoverColor="#fff"
							name="close"
							size={32}
						/>
					</S.IconButton>
				</S.RightAction>
			</S.StyledHashLink>
		</S.ListItem>
	);
}

SearchHistoryHit.displayName = 'SearchHistoryHit';
