import React, { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ListItem } from './styles';

import SvgIcon from '@/components/Icon';
import { Delimiter } from '@/components/PrivateThread/Delimiter';
import { PrivateThread } from '@/components/PrivateThread/PrivateThread';
import { ThreadsContext } from '@/state/context/ThreadsContext';
import { FlexCol } from '@/styles/Layout';
import { FontSizeLg } from '@/styles/Typography/FontSize';
import { onEnterKeyPressed } from '@/utils';

const PaddedListItem = styled(ListItem)`
	padding: 1rem;
	cursor: pointer;
`;

const FriendsLabel = styled.p`
	${FontSizeLg}
	margin-left: 1rem;
	font-weight: 600;
`;

const ThreadsListContainer = styled.ul`
	${FlexCol}
	height: 100%;
	padding: 0.5rem;
	overflow-y: auto;
`;

/**
 * @todo scrollto selected item
 */
export function PrivateThreadsList() {
	const threadRefs = useRef<(HTMLLIElement | null)[]>([]);
	const dmRef = useRef<HTMLButtonElement>(null);

	const { threads } = useContext(ThreadsContext);
	const navigate = useNavigate();
	const location = useLocation();
	const focusedThreadIdx = useRef(0);

	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == '';
	const nThreads = threads.length;

	function handleClick() {
		navigate(`/`);
	}

	useEffect(() => {
		threadRefs.current = threadRefs.current.slice(0, nThreads);
	}, [threads, nThreads, threadRefs]);

	useEffect(() => {
		/**
		 * @todo cleanup
		 * @todo default initial to selected, else first
		 * @todo fix outline color
		 */
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'ArrowDown') {
				if (document.activeElement === dmRef.current) {
					threadRefs.current[0]?.focus();
					focusedThreadIdx.current = 0;
				} else if (
					document.activeElement ===
					threadRefs.current[focusedThreadIdx.current]
				) {
					let nextIdx = ++focusedThreadIdx.current;
					if (nextIdx > nThreads - 1) --nextIdx;

					threadRefs.current[nextIdx]?.focus();
					focusedThreadIdx.current = nextIdx;
				}
			} else if (e.key === 'ArrowUp') {
				if (
					document.activeElement ===
					threadRefs.current[focusedThreadIdx.current]
				) {
					const nextIdx =
						focusedThreadIdx.current === 0 ? 0 : --focusedThreadIdx.current;

					threadRefs.current[nextIdx]?.focus();
					focusedThreadIdx.current = nextIdx;
				}
			}
		}

		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [threads, nThreads]);

	return (
		<>
			<ul>
				<PaddedListItem
					data-testid="friends-btn"
					isActiveItem={isActiveItem}
					onClick={handleClick}
					onKeyPress={onEnterKeyPressed(handleClick)}
					tabIndex={0}
				>
					<SvgIcon name="people" size={21} />
					<FriendsLabel>Friends</FriendsLabel>
				</PaddedListItem>
			</ul>

			<Delimiter ref={dmRef} title="Direct Messages" />

			<ThreadsListContainer role="tablist" tabIndex={0}>
				{threads.map(({ _id: id }, idx) => (
					<PrivateThread
						id={id}
						key={id}
						ref={(el) => (threadRefs.current[idx] = el)}
					/>
				))}
			</ThreadsListContainer>
		</>
	);
}

PrivateThreadsList.displayName = 'PrivateThreadsList';
