/**
 * External dependencies
 */
import type { OverlaySettings } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';

export function parseOverlaySettings(
	value?: Partial< OverlaySettings >
): OverlaySettings {
	if ( ! value ) {
		return DEFAULT_POPUP_METAS.overlay;
	} //end if

	if ( ! value.isEnabled ) {
		return { isEnabled: false };
	} //end if

	return {
		isEnabled: true,
		color: value.color ?? '#000000cc',
	};
} //end parseOverlaySettings()
