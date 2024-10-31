/**
 * External dependencies
 */
import type { PopupLocation } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';

export function parsePopupLocation(
	value?: Partial< PopupLocation >
): PopupLocation {
	return value ?? DEFAULT_POPUP_METAS.location;
} //end parsePopupLocation()
