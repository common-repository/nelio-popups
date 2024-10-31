/**
 * Internal dependencies
 */
import type { PopupMetas } from './gutenberg';

export type Popup = {
	readonly id: number;
	readonly url: string;
	readonly name: string;
	readonly config: PopupMetas;
};
