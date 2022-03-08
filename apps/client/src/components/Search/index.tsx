import React, { createRef } from 'react';

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
	const modalRef = createRef<HTMLDivElement>();

	return isOpen ? (
		<Modal modalRef={modalRef} onModalClose={closeSearch}>
			<SearchProvider>
				{/* <Search ref={modalRef} closeSearch={closeSearch} /> */}

				<S.Container ref={modalRef}>
					<S.Header>
						<SearchForm />

						<S.CloseButton onClick={closeSearch}>
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
