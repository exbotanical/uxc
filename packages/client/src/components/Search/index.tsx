import React, { useRef } from 'react';

import SvgIcon from '@/components/Icon';
import { Modal } from '@/components/Modal/Modal';
import { SearchContent } from '@/components/Search/SearchContent';
import { SearchProvider } from '@/components/Search/SearchContext';
import { SearchForm } from '@/components/Search/SearchForm';
import * as S from '@/components/Search/styles';

export function SearchModal({
	isOpen,
	closeSearch
}: {
	isOpen: boolean;
	closeSearch: () => void;
}) {
	const modalRef = useRef<HTMLDivElement>(null);

	return isOpen ? (
		<Modal modalRef={modalRef} onModalClose={closeSearch}>
			<SearchProvider>
				<S.Container ref={modalRef}>
					<S.Header>
						<SearchForm />

						<S.CloseButton
							data-testid="uxc-search-esc-btn"
							onClick={closeSearch}
						>
							<SvgIcon color="#fff" name="escape" size={18} />
						</S.CloseButton>
					</S.Header>

					<S.ModalContent>
						<SearchContent />
					</S.ModalContent>
					<S.Footer />
				</S.Container>
			</SearchProvider>
		</Modal>
	) : null;
}

SearchModal.displayName = 'SearchModal';
