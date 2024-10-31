/**
 * External dependencies
 */
import type { PopupMetas, FullCssSizeUnit } from '@nelio/popups/types';

const DEFAULT_FULL_CSS_UNIT: FullCssSizeUnit = {
	top: { value: 1, unit: 'em' },
	bottom: { value: 1, unit: 'em' },
	left: { value: 1, unit: 'em' },
	right: { value: 1, unit: 'em' },
};

export const DEFAULT_POPUP_METAS: PopupMetas = {
	advanced: {
		closeOnEscPressed: true,
		closeOnOverlayClicked: true,
		isBodyScrollLocked: false,
		popupOpenedCookie: {
			isEnabled: false,
		},
	},
	animation: {
		type: 'none',
	},
	conditions: [],
	display: {
		disablesOtherPopupOpenings: true,
		isDisabledIfOpenedPopups: false,
		isDisabledOnMobile: false,
		triggerLimit: {
			type: 'unlimited',
			delay: {
				value: 0,
				unit: 'days',
			},
		},
		zIndex: 99999,
	},
	location: 'center',
	overlay: {
		isEnabled: true,
		color: '#00000080',
	},
	size: {
		type: 'auto',
		value: 'normal',
	},
	spacing: {
		margin: DEFAULT_FULL_CSS_UNIT,
		padding: DEFAULT_FULL_CSS_UNIT,
	},
	sound: {
		type: 'none',
	},
	target: {
		type: 'full-site-target',
	},
	triggers: [
		{
			type: 'page-view',
		},
	],
	wrapper: {
		border: {
			isEnabled: false,
		},
		closeButton: {
			isEnabled: false,
		},
		shadow: {
			isEnabled: true,
			blur: {
				value: 15,
				unit: 'px',
			},
			color: '#00000088',
			offsetX: {
				value: 0,
				unit: 'px',
			},
			offsetY: {
				value: 0,
				unit: 'px',
			},
		},
	},
	analytics_view_count: 0,
	analytics_last_view: '',
	analytics_conversion_count: 0,
	analytics_last_conversion: '',
	analytics_conversion_rate: 0,
	analytics_settings: {
		trackClicksOnLinks: true,
		trackClicksOnButtons: true,
		trackFormSubmissions: true,
	},
};
