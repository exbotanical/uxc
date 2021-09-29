import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import type { FC } from 'react';

import { useWrappedConn } from '@/hooks/useConn';

import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Modal } from '@/ui/Modal';
import { Select } from '@/ui/Select';
import { connector, PropsFromRedux } from '@/state';

interface ICreateChannelModalProps {}

const CreateChannelModal: FC<ICreateChannelModalProps & PropsFromRedux> = ({
	showNotification,
	hideUpsertChannelModal,
	channelModalState
}) => {
	const history = useHistory();
	const { client, setUser } = useWrappedConn();

	const [channelName, setChannelName] = useState(
		channelModalState?.data?.name || ''
	);

	const [channelDesc, setChannelDesc] = useState(
		channelModalState?.data?.desc || ''
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
			name: channelName,
			desc: channelDesc
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
				className={'grid grid-cols-3 gap-4 focus:outline-none w-full'}
				onSubmit={handleSubmit}
			>
				<div className={'col-span-3 block'}>
					<h4 className={'mb-2 text-primary-100'}>
						{isEdit && channelModalState.data
							? `Update #${channelModalState.data.name}`
							: 'Create a New Channel'}
					</h4>
				</div>
				<div className={'flex h-full w-full col-span-2'}>
					<Input
						className={'rounded-8 bg-primary-700 h-6'}
						name="name"
						maxLength={60}
						autoComplete="off"
						value={channelName}
						onChange={handleChange}
					/>
				</div>
				<div className={'grid items-start grid-cols-1 h-6'}>
					<Select>
						<option value="public" className={'hover:bg-primary-900'}>
							public
						</option>
						<option value="private" className={'hover:bg-primary-900'}>
							private
						</option>
					</Select>
				</div>
				<div className={'flex col-span-3 bg-primary-700 rounded-8'}>
					<Input
						className={'h-11 col-span-3 w-full'}
						name="description"
						rows={3}
						maxLength={500}
						textarea
						value={channelDesc}
						onChange={handleChange}
					/>
				</div>

				<div className={'flex pt-2 space-x-3 col-span-full items-center'}>
					<Button type="button" color="primary-300" onClick={onClose}>
						cancel
					</Button>
					<Button type="submit" className={'mr-3'}>
						{isEdit ? 'Save' : 'Create'}
					</Button>
				</div>
			</form>
		</Modal>
	);
};

CreateChannelModal.displayName = 'CreateChannelModal';

export const CreateChannelModalContainer = connector(CreateChannelModal);
