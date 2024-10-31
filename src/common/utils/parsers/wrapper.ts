/**
 * External dependencies
 */
import type {
	BorderSettings,
	CloseButtonSettings,
	CssSizeUnit,
	ShadowSettings,
	WrapperSettings,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';

export function parseWrapperSettings(
	value?: Partial< WrapperSettings >
): WrapperSettings {
	return {
		border: parseBorder( value?.border ),
		closeButton: parseCloseButton( value?.closeButton ),
		shadow: parseShadow( value?.shadow ),
	};
} //end parseWrapperSettings()

// =======
// HELPERS
// =======

function parseBorder( border?: Partial< BorderSettings > ): BorderSettings {
	if ( ! border ) {
		return DEFAULT_POPUP_METAS.wrapper.border;
	} //end if

	if ( ! border.isEnabled ) {
		return { isEnabled: false };
	} //end if

	const empty: CssSizeUnit = { unit: 'px', value: 0 };
	return {
		isEnabled: true,
		radius: { ...empty, ...border.radius },
		color: border.color ?? '#000000ff',
		width: { ...empty, ...border.width },
	};
} //end parseBorder()

function parseCloseButton(
	closeButton?: Partial< CloseButtonSettings >
): CloseButtonSettings {
	if ( ! closeButton ) {
		return DEFAULT_POPUP_METAS.wrapper.closeButton;
	} //end if

	if ( ! closeButton.isEnabled ) {
		return { isEnabled: false };
	} //end if

	return {
		isEnabled: true,
		icon: '',
		label: '',
		delayInMillis: 0,
		position: 'top-right',
		color: '#000000ff',
		backgroundColor: '#00000000',
		...closeButton,
	};
} //end parseCloseButton()

function parseShadow( shadow?: Partial< ShadowSettings > ): ShadowSettings {
	if ( ! shadow ) {
		return DEFAULT_POPUP_METAS.wrapper.shadow;
	} //end if

	if ( ! shadow.isEnabled ) {
		return { isEnabled: false };
	} //end if

	const empty: CssSizeUnit = { unit: 'px', value: 0 };
	return {
		isEnabled: true,
		blur: { ...empty, ...shadow.blur },
		color: shadow.color ?? '#00000066',
		offsetX: { ...empty, ...shadow.offsetX },
		offsetY: { ...empty, ...shadow.offsetY },
	};
} //end parseShadow()
