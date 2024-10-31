/**
 * WordPress dependencies
 */
import { addFilter, applyFilters } from '@wordpress/hooks';

/**
 * External dependencies
 */
import {
	addClass,
	bypassDefinedFilter,
	isHTMLElement,
	removeClass,
} from '@nelio/popups/utils';
import type { AnimationDelay, Popup } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { renderCloseButton } from './render';
import { isCloseButtonDelayed } from './pure-functions';
import type { VisiblePopup } from '../types';

export function animateIn( vp: VisiblePopup ): void {
	showOverlay( vp );
	if ( ! isCloseButtonDelayed( vp.popup ) ) {
		renderCloseButton( vp );
	} //end if
	void animatePopup( vp, 'in' ).then( () => {
		if ( isCloseButtonDelayed( vp.popup ) ) {
			renderCloseButton( vp );
		} //end if
	} );
} //end animateIn()

export function animateOut(
	popup: VisiblePopup,
	onAnimationEnd: () => void
): void {
	void animatePopup( popup, 'out' ).then( () => {
		hideOverlay( popup );
		setTimeout( onAnimationEnd, 100 );
	} );
} //end animateOut()

export function getAnimationDuration( el: HTMLElement | null ): number {
	if ( ! el ) {
		return 0;
	} //end if

	const style = getComputedStyle( el );
	const duration = style[ 'transition-duration' ] as string;
	const delay = style[ 'transition-delay' ] as string;
	const ms = ( v: string ): number =>
		v.endsWith( 'ms' )
			? Number.parseFloat( v.replace( 'ms', '' ) )
			: 1000 * Number.parseFloat( v.replace( 's', '' ) );
	return ms( duration ) + ms( delay );
} //end getAnimationDuration()

// =====
// HOOKS
// =====

addFilter(
	'nelio_popups.get_fade_animation',
	'nelio_popups.get_fade_animation',
	bypassDefinedFilter( ( mode: 'in' | 'out' ) => {
		return 'in' === mode ? 'fadeIn' : 'fadeOut';
	} )
);

addFilter(
	'nelio_popups.get_slide_animation',
	'nelio_popups.get_slide_animation',
	bypassDefinedFilter( getSlideAnimation )
);

addFilter(
	'nelio_popups.get_slide-and-fade_animation',
	'nelio_popups.get_slide_and_fade_animation',
	bypassDefinedFilter( ( mode: 'in' | 'out', popup: Popup ) =>
		getSlideAnimation( mode, popup ).replace( 'Big', '' )
	)
);

addFilter(
	'nelio_popups.get_zoom_animation',
	'nelio_popups.get_zoom_animation',
	bypassDefinedFilter( ( mode: 'in' | 'out' ) => {
		return 'in' === mode ? 'zoomIn' : 'zoomOut';
	} )
);

// =======
// HELPERS
// =======

function showOverlay( { el: wrapper }: VisiblePopup ): void {
	const overlay = wrapper.querySelector( '.nelio-popup-js-overlay' );
	if ( isHTMLElement( overlay ) ) {
		setTimeout(
			() => overlay.classList.add( 'nelio-popup-overlay--is-visible' ),
			0
		);
	} //end if
} //end showOverlay()

function hideOverlay( { el: wrapper }: VisiblePopup ): void {
	const overlay = wrapper.querySelector( '.nelio-popup-js-overlay' );
	if ( isHTMLElement( overlay ) ) {
		overlay.classList.remove( 'nelio-popup-overlay--is-visible' );
	} //end if
} //end hideOverlay()

function animatePopup(
	{ popup, el: wrapper }: VisiblePopup,
	mode: 'in' | 'out'
): Promise< void > {
	return new Promise( ( resolve ) => {
		const { type } = popup.config.animation;
		if ( 'none' === type ) {
			return resolve();
		} //end if

		const filter = `nelio_popups.get_${ type }_animation`;
		const animation = applyFilters( filter, undefined, mode, popup );
		if ( ! isValidAnimation( animation ) ) {
			return resolve();
		} //end if

		const el = wrapper.querySelector( '.nelio-popup-js-popup' );
		if ( ! isHTMLElement( el ) ) {
			return resolve();
		} //end if

		// Add animation classes
		const { speed, delay } = popup.config.animation;
		const classes = [
			'nelio-popups-animate__animated',
			`nelio-popups-animate__${ animation }`,
			`nelio-popups-animate__${ speed }`,
			`nelio-popups-animate__delay-${ delayToSeconds( delay ) }`,
		];
		el.classList.add( ...classes );
		addClass( 'js-animation--is-running', wrapper );

		// Remove animation classes on end
		el.addEventListener(
			'animationend',
			( ev ) => {
				ev.stopPropagation();
				if ( 'in' === mode ) {
					el.classList.remove( ...classes );
					removeClass( 'js-animation--is-running', wrapper );
				} //end if
				resolve();
			},
			{ once: true }
		);
	} );
} //end animatePopup()

function getSlideAnimation( mode: 'in' | 'out', popup: Popup ): string {
	const { location } = popup.config;
	switch ( location ) {
		case 'top-left':
		case 'top':
		case 'top-right':
		case 'center':
			return 'in' === mode ? 'fadeInDownBig' : 'fadeOutUpBig';

		case 'left':
			return 'in' === mode ? 'fadeInLeftBig' : 'fadeOutLeftBig';

		case 'right':
			return 'in' === mode ? 'fadeInRightBig' : 'fadeOutRightBig';

		case 'bottom-left':
		case 'bottom':
		case 'bottom-right':
			return 'in' === mode ? 'fadeInUpBig' : 'fadeOutDownBig';
	} //end switch
} //end getSlideAnimation()

const isValidAnimation = ( animation?: unknown ): animation is string =>
	'string' === typeof animation && 0 < animation.length;

const delayToSeconds = ( delay: AnimationDelay ): string => {
	switch ( delay ) {
		case 'none':
			return '0s';
		case 'short':
			return '1s';
		case 'medium':
			return '2s';
		case 'long':
			return '4s';
	} //end switch
};
