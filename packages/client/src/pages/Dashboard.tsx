import React from 'react';

import { ConnectedCreateChannelModal } from '@/components/Modal/CreateChannel';
import { NotificationController } from '@/components/Notification/NotificationController';
import { Profile, RightPanel } from '@/components/Panels/RightPanel';
import { useViewportSize } from '@/hooks/useViewportSize';
import { motion } from 'framer-motion';

export function Dashboard() {
	const viewport = useViewportSize();

	return (
		<motion.div
			initial={{ scaleY: 0 }}
			animate={{ scaleY: 1 }}
			exit={{ scaleY: 0 }}
			transition={{ duration: 0.5 }}
		>
			<NotificationController />

			<ConnectedCreateChannelModal />

			<div className="grid h-screen grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-2 lg:gap-4 p-0 lg:p-2">
				<div className="col-span-1 lg:col-span-3"></div>
				<div className="col-span-1 md:col-span-2 lg:col-span-6"></div>

				{viewport > 1 ? (
					<div className="col-span-0 col-span-3">
						<RightPanel bottom={<div />} top={<Profile />} />
					</div>
				) : null}
			</div>
		</motion.div>
	);
}
