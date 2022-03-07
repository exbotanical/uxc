import React, { createRef } from 'react';
import { Modal } from '@/components/Modal/Modal';

import { SearchProvider } from '@/components/Search/SearchContext';
import * as S from '@/components/Search/styles';
import SvgIcon from '@/components/Icon';
import { SearchForm } from '@/components/Search/SearchForm';
import { SearchContent } from '@/components/Search/SearchContent';

export function SearchModal({
	isOpen,
	closeSearch
}: {
	isOpen: boolean;
	closeSearch: () => void;
}) {
	const modalRef = createRef<HTMLDivElement>();

	return isOpen ? (
		<Modal onModalClose={closeSearch} modalRef={modalRef}>
			<SearchProvider>
				{/* <Search ref={modalRef} closeSearch={closeSearch} /> */}

				<S.Container ref={modalRef}>
					<S.Header>
						<SearchForm />

						<S.CloseButton onClick={closeSearch}>
							<SvgIcon name="escape" size={18} color="#fff" />
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
