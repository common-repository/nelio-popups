/**
 * External dependencies
 */
import type { AnimationStyle } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';
import { hasType } from '../functions';

export function parseAnimationStyle(
	value?: Partial< AnimationStyle >
): AnimationStyle {
	if ( ! value || ! hasType( value ) ) {
		return DEFAULT_POPUP_METAS.animation;
	} //end if

	if ( 'none' === value.type ) {
		return { type: 'none' };
	} //end if

	return {
		type: value.type,
		delay: value.delay ?? 'none',
		speed: value.speed ?? 'default',
	};
} //end parseAnimationStyle()
