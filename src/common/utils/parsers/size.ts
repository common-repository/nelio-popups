/**
 * External dependencies
 */
import type { CssSizeUnit, PopupSize } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';
import { extract, hasType } from '../functions';

export function parsePopupSize( value?: Partial< PopupSize > ): PopupSize {
	if ( ! value || ! hasType( value ) ) {
		return DEFAULT_POPUP_METAS.size;
	} //end if

	if ( 'custom' === value.type ) {
		const size: CssSizeUnit = { unit: '%' as const, value: 40 };
		return {
			type: value.type,
			width: {
				...extract( 'unit', size, value.width ),
				...extract( 'value', size, value.width ),
			},
			height:
				! value.height || 'auto-adjust' === value.height.type
					? { type: 'auto-adjust' }
					: {
							type: 'custom-height',
							value: {
								...extract( 'unit', size, value.height.value ),
								...extract( 'value', size, value.height.value ),
							},
							isContentScrollable:
								value.height.isContentScrollable || false,
					  },
		};
	} //end if

	if ( 'fullscreen' === value.type ) {
		return { type: value.type };
	} //end if

	return {
		type: 'auto',
		value: value.value ?? 'normal',
	};
} //end parsePopupSize()
