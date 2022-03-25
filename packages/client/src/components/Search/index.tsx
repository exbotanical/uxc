import React, { useContext, useRef } from 'react';

import { SearchContext } from './SearchContext';

import SvgIcon from '@/components/Icon';
import { Modal } from '@/components/Modal/Modal';
import { SearchContent } from '@/components/Search/SearchContent';
import { SearchForm } from '@/components/Search/SearchForm';
import * as S from '@/components/Search/styles';

/**
 * @todo Add up/down arrow keyboard support.
 * @todo User search result to direct to thread.
 */
export function SearchModal() {
	const modalRef = useRef<HTMLDivElement>(null);
	const { isOpen, setIsOpen } = useContext(SearchContext);

	function closeSearch() {
		setIsOpen(false);
	}

	return isOpen ? (
		<Modal modalRef={modalRef} onModalClose={closeSearch}>
			<S.Container ref={modalRef}>
				<S.Header>
					<SearchForm />

					<S.CloseButton
						data-testid="uxc-search-esc-btn"
						onClick={closeSearch}
						title="Close search"
					>
						<SvgIcon color="#fff" name="escape" size={18} />
					</S.CloseButton>
				</S.Header>

				<S.ModalContent>
					<SearchContent />
				</S.ModalContent>
				<S.Footer />
			</S.Container>
		</Modal>
	) : null;
}

SearchModal.displayName = 'SearchModal';
