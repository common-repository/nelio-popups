/**
 * External dependencies
 */
import type { FullCssSizeUnit, PopupSpacing } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';

export function parseSpacingStyle(
	value?: Partial< PopupSpacing >
): PopupSpacing {
	const def = DEFAULT_POPUP_METAS.spacing;
	if ( ! value ) {
		return def;
	} //end if

	return {
		margin: parseUnit( value.margin ?? {}, def.margin ),
		padding: parseUnit( value.padding ?? {}, def.padding ),
	};
} //end parseSpacingStyle()

// =======
// HELPERS
// =======

function parseUnit(
	val: Partial< FullCssSizeUnit >,
	def: FullCssSizeUnit
): FullCssSizeUnit {
	return {
		top: { ...def.top, ...val.top },
		bottom: { ...def.bottom, ...val.bottom },
		left: { ...def.left, ...val.left },
		right: { ...def.right, ...val.right },
	};
} //end parseUnit()
