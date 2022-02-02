import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/Fields/Input';
import { Select } from '@/components/Fields/Select';
import { Modal } from '@/components/Modal/Modal';
import { connector, PropsFromRedux } from '@/state';

function CreatePrivateThreadModal({
	threadModalState,
	hideUpsertThreadModal,
	showNotification
}: PropsFromRedux) {
	const navigate = useNavigate();

	// const [channelName, setChannelName] = useState(
	// 	threadModalState.data?.name || ''
	// );

	// const [channelDesc, setChannelDesc] = useState(
	// 	threadModalState.data?.desc || ''
	// );

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		// const { value, name } = event.target;
		// const executor = name == 'name' ? setChannelName : setChannelDesc;
		// executor(value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		hideUpsertThreadModal();
	};

	const handleClose = () => {
		// @todo prevent rerender in chat area
		hideUpsertThreadModal();
	};

	// const isEdit = threadModalState.type === 'edit';

	return (
		<Modal isOpen={threadModalState.showing} onRequestClose={handleClose}>
			<form
				className="grid grid-cols-3 gap-4 focus:outline-none w-full"
				onSubmit={handleSubmit}
			>
				<div className="col-span-3 block">
					<h4 className="mb-2 text-primary-100">
						{/* {isEdit && threadModalState.data
							? `Update #${threadModalState.data.name}`
							: 'Create a New Channel'}
						s */}
					</h4>
				</div>

				<div className="flex h-full w-full col-span-2">
					<Input
						autoComplete="off"
						className="rounded-8 bg-primary-700 h-6"
						maxLength={60}
						name="name"
						onChange={handleChange}
						// value={channelName}
					/>
				</div>

				<div className="grid items-start grid-cols-1 h-6">
					<Select className="h-6">
						<option className="hover:bg-primary-900" value="public">
							public
						</option>

						<option className="hover:bg-primary-900" value="private">
							private
						</option>
					</Select>
				</div>

				<div className="flex col-span-3 bg-primary-700 rounded-8">
					<Input
						className="h-11 col-span-3 w-full"
						maxLength={500}
						name="description"
						onChange={handleChange}
						rows={3}
						// value={channelDesc}
					/>
				</div>

				<div className="flex pt-2 space-x-3 col-span-full items-center">
					{/* <Button color="primary-300" onClick={onClose} type="button">
						Cancel
					</Button>

					<Button className="mr-3" type="submit">
						{isEdit ? 'Save' : 'Create'}
					</Button> */}
				</div>
			</form>
		</Modal>
	);
}

CreatePrivateThreadModal.displayName = 'CreatePrivateThreadModal';

export const ConnectedCreatePrivateThreadModal = connector(
	CreatePrivateThreadModal
);
