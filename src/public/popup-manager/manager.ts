/**
 * WordPress dependencies
 */
import { applyFilters, doAction } from '@wordpress/hooks';

/**
 * External dependencies
 */
import without from 'lodash/without';
import MobileDetect from 'mobile-detect';
import {
	addClass,
	hasClass,
	isCloseButton,
	isElementInSelection,
	removeClass,
} from '@nelio/popups/utils';
import type { Popup } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { animateIn, animateOut } from './animation';
import { renderPopup } from './render';
import { canPopupBeOpened, doesPopupLockBodyScroll } from './pure-functions';
import type { VisiblePopup } from '../types';

const md = new MobileDetect( window.navigator.userAgent );

let visiblePopups: ReadonlyArray< VisiblePopup > = [];
let openingPopups: ReadonlyArray< VisiblePopup > = [];
export const openPopup = ( popup: Popup ): void => {
	if (
		! canPopupBeOpened( popup, isMobile(), visiblePopups ) ||
		isPopupTemporarilyDisabled( popup )
	) {
		return;
	} //end if

	const el = renderPopup( popup );
	const visiblePopup = { el, popup };
	visiblePopups = [ visiblePopup, ...visiblePopups ];
	openingPopups = [ visiblePopup, ...openingPopups ];

	document.body.appendChild( el );
	el.classList.add( 'nelio-invisible-popup-wrapper' );
	delay( () => {
		openingPopups = without( openingPopups, visiblePopup );
		const container = document.querySelector( '.nelio-popup-content' );
		if ( container ) {
			markPopupAsReady( popup.id );
		} //end if
	} );
};

export const closePopup = ( popupId: number ): void =>
	close( getVisiblePopup( popupId ) );

document.addEventListener( 'click', ( ev ) =>
	maybeClosePopupOnClick( ev.target as HTMLElement )
);

document.addEventListener(
	'keyup',
	( ev ) => [ 'Esc', 'Escape' ].includes( ev.key ) && maybeClosePopupOnEsc()
);

// =======
// HELPERS
// =======

const delay = ( fn: () => void, ms = 0 ): void => {
	setTimeout( fn, ms );
};

const markPopupAsReady = ( popupId: number ): void => {
	const visiblePopup = getVisiblePopup( popupId );
	if ( ! visiblePopup ) {
		return;
	} //end if

	const { el, popup } = visiblePopup;
	el.classList.remove( 'nelio-invisible-popup-wrapper' );
	animateIn( visiblePopup );
	addCloseButtonListener( visiblePopup );

	doAction( 'nelio_popups.open_popup', popup );
	doAction( 'nelio_popups.update_cookies', popup );
	updateBodyClasses();
};

const isInPopupWrapper = ( el: HTMLElement ): boolean =>
	isElementInSelection( document.body, '.nelio-popup-js-popup', el );

const getVisiblePopup = ( popupId: number ): VisiblePopup | undefined =>
	visiblePopups.find( ( vp ) => vp.popup.id === popupId );

function updateBodyClasses(): void {
	if ( visiblePopups.length ) {
		addClass( 'body--has-visible-popups', document.body );
	} else {
		removeClass( 'body--has-visible-popups', document.body );
	} //end if

	const popups = visiblePopups.map( ( { popup } ) => popup );
	if ( popups.some( doesPopupLockBodyScroll ) ) {
		addClass( 'body--is-scroll-disabled', document.body );
	} else {
		removeClass( 'body--is-scroll-disabled', document.body );
	} //end if
} //end updateBodyClasses()

function close( visiblePopup?: VisiblePopup ): void {
	if ( ! visiblePopup ) {
		return;
	} //end if

	if ( hasClass( 'js-animation--is-running', visiblePopup.el ) ) {
		return;
	} //end if

	animateOut( visiblePopup, () =>
		delay( () => {
			visiblePopups = without( visiblePopups, visiblePopup );
			const { el, popup } = visiblePopup;
			const popupContent = document.getElementById(
				`nelio-popup-content-${ popup.id }`
			);
			const popupStore = document.getElementById(
				`nelio-popup-store-${ popup.id }`
			);
			if ( popupContent && popupStore ) {
				popupStore.appendChild( popupContent );
			} //end if
			el.parentElement?.removeChild( el );
			updateBodyClasses();
		} )
	);
} //end close()

function addCloseButtonListener( visiblePopup: VisiblePopup ): void {
	const { el: wrapper } = visiblePopup;
	wrapper.addEventListener(
		'click',
		( ev ) =>
			isCloseButton( wrapper, ev.target as HTMLElement ) &&
			close( visiblePopup )
	);
} //end addCloseButtonListener()

function maybeClosePopupOnClick( clickedElement: HTMLElement ): void {
	if ( isInPopupWrapper( clickedElement ) ) {
		return;
	} //end if

	const topVisiblePopup = getTopPopupWithOverlayClicked( clickedElement );
	if ( topVisiblePopup ) {
		if ( topVisiblePopup.popup.config.advanced.closeOnOverlayClicked ) {
			close( topVisiblePopup );
		} //end if
		return;
	} //end if

	visiblePopups
		.filter( ( vp ) => ! openingPopups.includes( vp ) )
		.filter( ( { popup } ) => popup.config.advanced.closeOnOverlayClicked )
		.forEach( close );
} //end maybeClosePopupOnClick()

function getTopPopupWithOverlayClicked(
	el: HTMLElement
): VisiblePopup | false {
	return (
		visiblePopups.find( ( { popup } ) =>
			isElementInSelection(
				document.body,
				`.nelio-popup-wrapper-${ popup.id }`,
				el
			)
		) || false
	);
} //end getTopPopupWithOverlayClicked()

function maybeClosePopupOnEsc( popupId?: number ): void {
	if ( popupId ) {
		const vp = getVisiblePopup( popupId );
		if ( vp?.popup.config.advanced.closeOnEscPressed ) {
			close( vp );
		} //end if
		return;
	} //end if

	close(
		visiblePopups.find(
			( { popup } ) => popup.config.advanced.closeOnEscPressed
		)
	);
} //end maybeClosePopupOnEsc()

function isPopupTemporarilyDisabled( popup: Popup ): boolean {
	return !! applyFilters(
		'nelio_popups.is_popup_temporarily_disabled',
		false,
		popup
	);
} //end isPopupTemporarilyDisabled()

function isMobile(): boolean {
	const value = md.mobile();
	return !! applyFilters( 'nelio_popups.is_mobile', !! value );
} //end isMobile()
