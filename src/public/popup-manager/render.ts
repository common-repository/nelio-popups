/**
 * External dependencies
 */
import { css } from '@nelio/popups/css';
import { addClass, isHTMLElement } from '@nelio/popups/utils';
import type {
	BorderSettings,
	Popup,
	ShadowSettings,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { VisiblePopup } from '../types';
import { vh, vw } from './pure-functions';

export function renderPopup( popup: Popup ): HTMLElement {
	const overlay = makePopupOverlay( popup );
	const popupBox = makePopupBox( popup );

	const wrapper = document.createElement( 'div' );
	addClass( 'wrapper', wrapper );
	addClass( `wrapper-${ popup.id }`, wrapper );
	wrapper.appendChild( overlay );
	wrapper.appendChild( popupBox );

	return wrapper;
} //end renderPopup()

export function renderCloseButton( vp: VisiblePopup ): void {
	const { el, popup } = vp;
	const box = el.querySelector( '.nelio-popup-js-popup' );
	if ( ! isHTMLElement( box ) ) {
		return;
	} //end if
	addCloseButton( popup, box );
} //end renderCloseButton()

// =======
// HELPERS
// =======

function makePopupBox( popup: Popup ): HTMLElement {
	const positioner = document.createElement( 'div' );
	positioner.style.zIndex = `${ popup.config.display.zIndex }`;
	addClass( 'positioner', positioner );
	addClass( 'js-positioner', positioner );

	const box = document.createElement( 'div' );
	addClass( box );
	addClass( 'js-popup', box );
	addClass( `${ popup.id }`, box );

	const content = getPopupContent( popup.id );

	// Connect elements.
	positioner.appendChild( box );
	box.appendChild( content );

	// Style box
	setPopupLocation( popup, positioner );
	setPopupSize( popup, box );
	setPopupStyle( popup, box );
	setPopupMargin( popup, box );
	setPopupPadding( popup, box );

	return positioner;
} //end makePopupBox()

function getPopupContent( id: number ): HTMLElement {
	const container =
		document.getElementById( `nelio-popup-content-${ id }` ) ||
		document.createElement( 'div' );
	addClass( 'content', container );
	container.classList.remove( 'nelio-invisible-popup-wrapper' );
	return container;
} //end getPopupContent()

function makePopupOverlay( popup: Popup ): HTMLElement {
	const settings = popup.config.overlay;
	const overlay = document.createElement( 'div' );
	if ( ! settings.isEnabled ) {
		return overlay;
	} //end if

	addClass( 'overlay', overlay );
	addClass( 'js-overlay', overlay );
	overlay.style.backgroundColor = settings.color;
	overlay.style.zIndex = `${ popup.config.display.zIndex }`;
	return overlay;
} //end makePopupOverlay()

function setPopupLocation( popup: Popup, box: HTMLElement ): void {
	const location = getLocation( popup );
	box.classList.add( css( location ) );
} //end setPopupLocation()

function setPopupSize( popup: Popup, box: HTMLElement ): void {
	const { size } = popup.config;

	if ( 'auto' === size.type ) {
		addClass( `size--is-${ size.type }-${ size.value }`, box );
	} else {
		addClass( `size--is-${ size.type }`, box );
	} //end if

	if ( 'custom' !== size.type ) {
		return;
	} //end if

	const { width, height: heightSettings } = size;
	box.style.width = vw( width );

	if ( 'custom-height' === heightSettings.type ) {
		const { isContentScrollable, value: height } = heightSettings;
		box.style.height = vh( height );
		box.style.overflowY = isContentScrollable ? 'auto' : 'hidden';
	} //end if
} //end setPopupSize()

function setPopupMargin( popup: Popup, box: HTMLElement ): void {
	const { margin: m, padding: p } = popup.config.spacing;
	const { border: b } = popup.config.wrapper;
	const border = b.isEnabled ? vw( b.width ) : '0px';

	const hm = `${ vw( m.left ) } - ${ vw( m.right ) }`;
	const vm = `${ vh( m.top ) } - ${ vh( m.bottom ) }`;
	const hp = `${ vw( p.left ) } - ${ vw( p.right ) }`;
	const vp = `${ vh( p.top ) } - ${ vh( p.bottom ) }`;
	const bw = `calc(2 * ${ border })`;

	box.style.maxWidth = `calc(100vw - ${ hm } - ${ hp } - ${ bw })`;
	box.style.maxHeight = `calc(100vh - ${ vm } - ${ vp } - ${ bw })`;

	box.style.marginTop = vh( m.top );
	box.style.marginBottom = vh( m.bottom );
	box.style.marginLeft = vw( m.left );
	box.style.marginRight = vw( m.right );
} //end setPopupMargin()

function setPopupPadding( popup: Popup, el: HTMLElement ) {
	const { padding } = popup.config.spacing;
	const { top: t, bottom: b, left: l, right: r } = padding;
	el.style.paddingTop = vh( t );
	el.style.paddingBottom = vh( b );
	el.style.paddingLeft = vw( l );
	el.style.paddingRight = vw( r );
} //end setPopupPadding()

function setPopupStyle( popup: Popup, box: HTMLElement ): void {
	const { wrapper: settings } = popup.config;
	setBorderStyle( settings.border, box );
	addShadow( settings.shadow, box );
} //end setPopupStyle()

function setBorderStyle( settings: BorderSettings, box: HTMLElement ): void {
	if ( ! settings.isEnabled ) {
		return;
	} //end if

	const color = settings.color;
	const radius = vw( settings.radius );
	const width = vw( settings.width );
	box.style.border = `${ width } solid ${ color }`;
	box.style.borderRadius = radius;
} //end setBorderStyle()

function addCloseButton( popup: Popup, box: HTMLElement ): void {
	const { closeButton: settings } = popup.config.wrapper;
	if ( ! settings.isEnabled ) {
		return;
	} //end if

	const button = document.createElement( 'button' );
	addClass( 'close-button', button );
	addClass( `close-button--is-${ settings.position }`, button );
	addClass( 'js-close', button );

	if ( settings.icon.startsWith( 'dashicons' ) ) {
		const icon = document.createElement( 'span' );
		icon.innerHTML = getIcon( settings.icon );
		icon.style.display = 'flex';
		addClass( 'close-button-icon', icon );
		button.appendChild( icon );
	} //end if

	if ( settings.label ) {
		const label = document.createElement( 'span' );
		label.textContent = settings.label;
		addClass( 'close-button-label', label );
		button.appendChild( label );
	} //end if

	button.style.background = settings.backgroundColor;
	button.style.color = settings.color;
	button.style.opacity = '0';
	button.style.transition = 'opacity 100ms ease-in-out';

	box.appendChild( button );
	setTimeout( () => {
		button.style.opacity = '1';
	}, settings.delayInMillis );
} //end addCloseButton()

function getIcon( icon: string ): string {
	switch ( icon ) {
		case 'dashicons-dismiss':
			return '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8m5 11l-3-3l3-3l-2-2l-3 3l-3-3l-2 2l3 3l-3 3l2 2l3-3l3 3z"/></svg>';
		case 'dashicons-no':
			return '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m12.12 10l3.53 3.53l-2.12 2.12L10 12.12l-3.54 3.54l-2.12-2.12L7.88 10L4.34 6.46l2.12-2.12L10 7.88l3.54-3.53l2.12 2.12z"/></svg>';
		case 'dashicons-no-alt':
			return '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M14.95 6.46L11.41 10l3.54 3.54l-1.41 1.41L10 11.42l-3.53 3.53l-1.42-1.42L8.58 10L5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"/></svg>';
		case 'dashicons-remove':
			return '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 1c-5 0-9 4-9 9s4 9 9 9s9-4 9-9s-4-9-9-9m0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7s7 3.1 7 7s-3.1 7-7 7M6 9v2h8V9z" class="st0"/></svg>';
		case 'dashicons-minus':
			return '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M4 9h12v2H4z"/></svg>';
	} //end switch()

	return '';
}

function addShadow( settings: ShadowSettings, box: HTMLElement ): void {
	if ( ! settings.isEnabled ) {
		return;
	} //end if

	const color = settings.color;
	const offsetX = vw( settings.offsetX );
	const offsetY = vh( settings.offsetY );
	const blur = vw( settings.blur );

	box.style.boxShadow = `${ offsetX } ${ offsetY } ${ blur } ${ color }`;
} //end addShadow()

function getLocation( popup: Popup ) {
	const { location } = popup.config;

	switch ( location ) {
		case 'top-left':
			return {
				top: '0',
				left: '0',
				transform: 'scale(1)',
			};

		case 'top':
			return {
				top: '0',
				left: '50vw',
				transform: 'translate(-50%, 0) scale(1)',
			};

		case 'top-right':
			return {
				top: '0',
				right: '0',
				transform: 'scale(1)',
			};

		case 'left':
			return {
				top: '50vh',
				left: '0',
				transform: 'translate(0, -50%) scale(1)',
			};

		case 'center':
			return {
				top: '50vh',
				left: '50vw',
				transform: 'translate(-50%, -50%) scale(1)',
			};

		case 'right':
			return {
				top: '50vh',
				right: '0',
				transform: 'translate(0, -50%) scale(1)',
			};

		case 'bottom-left':
			return {
				bottom: '0',
				left: '0',
				transform: 'scale(1)',
			};

		case 'bottom':
			return {
				bottom: '0',
				left: '50vw',
				transform: 'translate(-50%, 0) scale(1)',
			};

		case 'bottom-right':
			return {
				bottom: '0',
				right: '0',
				transform: 'scale(1)',
			};
	} //end switch
} //end getLocation()
