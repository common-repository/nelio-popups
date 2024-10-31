/**
 * External dependencies
 */
import type { CssSizeUnit, Popup } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import type { VisiblePopup } from '../types';

export const vw = ( { value, unit }: CssSizeUnit ): string =>
	`${ value }${ unit === '%' ? 'vw' : unit }`;

export const vh = ( { value, unit }: CssSizeUnit ): string =>
	`${ value }${ unit === '%' ? 'vh' : unit }`;

export const isCloseButtonDelayed = ( popup: Popup ): boolean =>
	popup.config.wrapper.closeButton.isEnabled &&
	0 < popup.config.wrapper.closeButton.delayInMillis;

export function canPopupBeOpened(
	popup: Popup,
	isMobile: boolean,
	visiblePopups: ReadonlyArray< VisiblePopup >
): boolean {
	if ( isMobile && popup.config.display.isDisabledOnMobile ) {
		return false;
	} //end if

	const vp = visiblePopups.map( ( { popup: p } ) => p );
	if ( vp.includes( popup ) ) {
		return false;
	} //end if

	if ( vp.length && isDisabledIfOpenedPopups( popup ) ) {
		return false;
	} //end if

	if ( vp.some( disablesOtherPopupOpenings ) ) {
		return false;
	} //end if

	return true;
} //end canPopupBeOpened()

export function doesPopupLockBodyScroll( popup: Popup ): boolean {
	return (
		popup.config.advanced.isBodyScrollLocked ||
		popup.config.size.type === 'fullscreen'
	);
} //end doesPopupLockBodyScroll()

// =======
// HELPERS
// =======

function isDisabledIfOpenedPopups( popup: Popup ): boolean {
	return popup.config.display.isDisabledIfOpenedPopups;
} //end isDisabledIfOpenedPopups()

function disablesOtherPopupOpenings( popup: Popup ): boolean {
	return popup.config.display.disablesOtherPopupOpenings;
} //end disablesOtherPopupOpenings()
