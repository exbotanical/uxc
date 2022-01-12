
import { useWrappedConn } from '@uxc/client/hooks/useConn';
import { connector, PropsFromRedux } from '@uxc/client/state';
import { Button } from '@uxc/client/ui/Button';
import { Input } from '@uxc/client/ui/Input';
import { Modal } from '@uxc/client/ui/Modal';
import { Select } from '@uxc/client/ui/Select';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

function CreateChannelModal({
	channelModalState,
	hideUpsertChannelModal,
	showNotification
}: PropsFromRedux) {
	const history = useHistory();
	const { client, setUser } = useWrappedConn();

	const [channelName, setChannelName] = useState(
		channelModalState.data.name || ''
	);

	const [channelDesc, setChannelDesc] = useState(
		channelModalState.data.desc || ''
	);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;

		const executor = name == 'name' ? setChannelName : setChannelDesc;

		executor(value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!channelName || !channelDesc) return;

		const res = await client.mutation.createChannel({
			desc: channelDesc,
			name: channelName
		});

		if (typeof res === 'object' && 'error' in res) {
			showNotification({
				message:
					'Something went wrong while creating your channel. Please try again in a few minutes.',
				type: 'error'
			});
		} else if (res.channel) {
			// TODO improve
			setUser((user) => ({
				...user,
				channels: [...user.channels, res.channel],
				currentChannel: res.channel
			}));

			history.push(`/channel/${res.channel.uuid}`);
		}

		hideUpsertChannelModal();
	};

	const onClose = () => {
		setChannelName('');
		setChannelDesc('');
		hideUpsertChannelModal();
	};

	const isEdit = channelModalState.type === 'edit';

	return (
		<Modal isOpen={channelModalState.showing} onRequestClose={onClose}>
			<form
				className="grid grid-cols-3 gap-4 focus:outline-none w-full"
				onSubmit={handleSubmit}
			>
				<div className="col-span-3 block">
					<h4 className="mb-2 text-primary-100">
						{isEdit && channelModalState.data
							? `Update #${channelModalState.data.name}`
							: 'Create a New Channel'}
					</h4>
				</div>

				<div className="flex h-full w-full col-span-2">
					<Input
						autoComplete="off"
						className="rounded-8 bg-primary-700 h-6"
						maxLength={60}
						name="name"
						onChange={handleChange}
						value={channelName}
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
						value={channelDesc}
					/>
				</div>

				<div className="flex pt-2 space-x-3 col-span-full items-center">
					<Button color="primary-300" onClick={onClose} type="button">
						cancel
					</Button>

					<Button className="mr-3" type="submit">
						{isEdit ? 'Save' : 'Create'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}

CreateChannelModal.displayName = 'CreateChannelModal';

export const CreateChannelModalContainer = connector(CreateChannelModal);
