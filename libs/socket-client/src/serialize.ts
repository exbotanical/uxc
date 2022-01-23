import type { Opcode, ResponseOpcode, TransactionId } from '@uxc/types';

export function serialize(opcode: Opcode, data: any, txId?: TransactionId) {
	return `{"op":"${opcode}","d":${JSON.stringify(data)}${
		txId ? `,"txId":"${txId}"` : ''
	}}`;
}

export const deserialize = JSON.parse;

export const toResponseCode = (opcode: Opcode): ResponseOpcode =>
	opcode === 'error' ? opcode : `${opcode}:reply`;
