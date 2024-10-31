/**
 * External dependencies
 */
import type {
	AdvancedSettings,
	CookieSettings,
	TimeValue,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';
import { extract } from '../functions';

export function parseAdvancedSettings(
	value?: Partial< AdvancedSettings >
): AdvancedSettings {
	const def = DEFAULT_POPUP_METAS.advanced;
	if ( ! value ) {
		return def;
	} //end if

	return {
		isBodyScrollLocked: def.isBodyScrollLocked,
		closeOnEscPressed: def.closeOnEscPressed,
		closeOnOverlayClicked: def.closeOnOverlayClicked,
		...value,
		popupOpenedCookie: parseCookieSettings(
			def.popupOpenedCookie,
			value.popupOpenedCookie
		),
	};
} //end parseAdvancedSettings()

// =======
// HELPERS
// =======

function parseCookieSettings(
	def: CookieSettings,
	value: Partial< CookieSettings > | undefined
): CookieSettings {
	if ( ! value ) {
		return def;
	} //end if

	if ( ! value.isEnabled ) {
		return {
			isEnabled: false,
		};
	} //end if

	if ( value.isSession ) {
		return {
			isEnabled: true,
			name: value.name ?? '',
			isSession: true,
		};
	} //end if

	const time: TimeValue = { unit: 'days', value: 2 };
	const expiration: TimeValue =
		false === value.isSession ? value.expiration ?? time : time;

	return {
		isEnabled: true,
		name: value.name ?? '',
		isSession: false,
		expiration: {
			...extract( 'unit', time, expiration ),
			...extract( 'value', time, expiration ),
		},
	};
} //end parseCookieSettings()
