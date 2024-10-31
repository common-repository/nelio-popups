/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import {
	recordToSelectOptions,
	recordToSelectPremiumOptions,
} from '@nelio/popups/utils';

import type {
	Condition,
	TargetCondition,
	FreeAnimationStyle,
	FreeCondition,
	FreeTargetCondition,
	FreeTrigger,
	PremiumAnimationStyle,
	PremiumCondition,
	PremiumTargetCondition,
	PremiumTrigger,
	SelectControlOption,
	Trigger,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { AnimationStyle } from '../types/popups/style';

// ======
//  DATA
// ======

const FREE_ANIMATIONS: Record< FreeAnimationStyle | 'none', string > = {
	none: _x( 'None', 'text (animation type)', 'nelio-popups' ),
	fade: _x( 'Fade', 'text (animation type)', 'nelio-popups' ),
	slide: _x( 'Slide', 'text (animation type)', 'nelio-popups' ),
	'slide-and-fade': _x(
		'Slide and fade',
		'text (animation type)',
		'nelio-popups'
	),
	zoom: _x( 'Zoom', 'text (animation type)', 'nelio-popups' ),
};

const PREMIUM_ANIMATIONS: Record< PremiumAnimationStyle, string > = {
	back: _x( 'Back', 'text (animation type)', 'nelio-popups' ),
	bounce: _x( 'Bounce', 'text (animation type)', 'nelio-popups' ),
	flip: _x( 'Flip horizontally', 'text (animation type)', 'nelio-popups' ),
	'flip-y': _x( 'Flip vertically', 'text (animation type)', 'nelio-popups' ),
	roll: _x( 'Roll', 'text (animation type)', 'nelio-popups' ),
	rotate: _x( 'Rotate', 'text (animation type)', 'nelio-popups' ),
};

const FREE_CONDITIONS: Record< FreeCondition[ 'type' ], string > = {
	cookie: _x( 'Cookie', 'text', 'nelio-popups' ),
	referrer: _x( 'Referrer', 'text', 'nelio-popups' ),
};

const FREE_TARGET_CONDITIONS: Record< FreeTargetCondition[ 'type' ], string > =
	{
		content: _x( 'Content is', 'text', 'nelio-popups' ),
		'excluded-content': _x( 'Content is not', 'text', 'nelio-popups' ),
	};

const PREMIUM_CONDITIONS: Record< PremiumCondition[ 'type' ], string > = {
	'adblock-detection': _x( 'Adblock is detected', 'text', 'nelio-popups' ),
	browser: _x( 'Browser', 'text', 'nelio-popups' ),
	custom: _x( 'Custom JS function', 'text', 'nelio-popups' ),
	date: _x( 'Date', 'text', 'nelio-popups' ),
	'day-of-week': _x( 'Day of Week', 'text', 'nelio-popups' ),
	device: _x( 'Device', 'text', 'nelio-popups' ),
	geolocation: _x( 'Country', 'text', 'nelio-popups' ),
	language: _x( 'Language', 'text', 'nelio-popups' ),
	os: _x( 'Operating System', 'text', 'nelio-popups' ),
	'query-arg': _x( 'Query Parameter', 'text', 'nelio-popups' ),
	time: _x( 'Time Period', 'text', 'nelio-popups' ),
	visitor: _x( 'Visitor', 'text', 'nelio-popups' ),
	'window-width': _x( 'Window Width', 'text', 'nelio-popups' ),
	woocommerce: _x( 'WooCommerce', 'text', 'nelio-popups' ),
};

const PREMIUM_TARGET_CONDITIONS: Record<
	PremiumTargetCondition[ 'type' ],
	string
> = {
	taxonomy: _x( 'Taxonomy is', 'text', 'nelio-popups' ),
	'excluded-taxonomy': _x( 'Taxonomy is not', 'text', 'nelio-popups' ),
	url: _x( 'URL', 'text', 'nelio-popups' ),
};

const FREE_TRIGGERS: Record< FreeTrigger[ 'type' ], string > = {
	mouse: _x( 'Mouse action', 'text', 'nelio-popups' ),
	'page-view': _x( 'Page view', 'text', 'nelio-popups' ),
	scroll: _x( 'Scroll offset', 'text', 'nelio-popups' ),
	time: _x( 'Time delay', 'text', 'nelio-popups' ),
};

const PREMIUM_TRIGGERS: Record< PremiumTrigger[ 'type' ], string > = {
	'exit-intent': _x( 'Exit intent', 'text', 'nelio-popups' ),
	'html-element': _x( 'HTML Element', 'text', 'nelio-popups' ),
	inactivity: _x( 'Inactivity', 'text', 'nelio-popups' ),
	manual: _x( 'Manual', 'text', 'nelio-popups' ),
	'time-on-site': _x( 'Time on site', 'text', 'nelio-popups' ),
	woocommerce: _x( 'WooCommerce', 'text', 'nelio-popups' ),
};

// =======
// EXPORTS
// =======

type Options< T extends string > = ReadonlyArray< SelectControlOption< T > >;

export const getAllAnimations = (): Options< AnimationStyle[ 'type' ] > => [
	...getFreeAnimations(),
	...getPremiumAnimations(),
];

export const getAllConditions = (): Options< Condition[ 'type' ] > => [
	...getFreeConditions(),
	...getPremiumConditions(),
];

export const getAllTargetConditions = (): Options<
	TargetCondition[ 'type' ]
> => [ ...getFreeTargetConditions(), ...getPremiumTargetConditions() ];

export const getAllTriggers = (): Options< Trigger[ 'type' ] > => [
	...getFreeTriggers(),
	...getPremiumTriggers(),
];

export const getFreeAnimations = (): Options< FreeAnimationStyle | 'none' > =>
	recordToSelectOptions( FREE_ANIMATIONS );

export const getFreeConditions = (): Options< FreeCondition[ 'type' ] > =>
	recordToSelectOptions( FREE_CONDITIONS );

export const getFreeTargetConditions = (): Options<
	FreeTargetCondition[ 'type' ]
> => recordToSelectOptions( FREE_TARGET_CONDITIONS );

export const getFreeTriggers = (): Options< FreeTrigger[ 'type' ] > =>
	recordToSelectOptions( FREE_TRIGGERS );

export const getPremiumAnimations = (): Options< PremiumAnimationStyle > =>
	recordToSelectPremiumOptions( 'condition', PREMIUM_ANIMATIONS );

export const getPremiumConditions = (): Options< PremiumCondition[ 'type' ] > =>
	recordToSelectPremiumOptions( 'condition', PREMIUM_CONDITIONS );

export const getPremiumTargetConditions = (): Options<
	PremiumTargetCondition[ 'type' ]
> => recordToSelectPremiumOptions( 'condition', PREMIUM_TARGET_CONDITIONS );

export const getPremiumTriggers = (): Options< PremiumTrigger[ 'type' ] > =>
	recordToSelectPremiumOptions( 'condition', PREMIUM_TRIGGERS );
