import { invalidateSession } from '../utils/auth';
import type { Request } from 'express';

export function logoutController(req: Request) {
	invalidateSession(req);
}
