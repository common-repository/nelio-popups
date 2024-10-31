/**
 * External dependencies
 */
import type { SoundStyle } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';
import { hasType } from '../functions';

export function parseSoundStyle( value?: Partial< SoundStyle > ): SoundStyle {
	if ( ! value || ! hasType( value ) ) {
		return DEFAULT_POPUP_METAS.sound;
	} //end if

	if ( 'custom' === value.type ) {
		return {
			type: 'custom',
			customUrl: value.customUrl ?? '',
		};
	} //end if

	return { type: value.type };
} //end parseSoundStyle()
