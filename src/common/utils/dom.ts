/**
 * External dependencies
 */
import type { CssSizeUnit } from '@nelio/popups/types';

export function addClass( el: Element | null );
export function addClass( className: string, el: Element | null );
export function addClass(
	className: string | Element | null,
	el?: Element | null
): void {
	if ( 'string' !== typeof className ) {
		el = className;
		className = 'nelio-popup';
	} else {
		className = `nelio-popup-${ className }`;
	} //end if

	if ( ! el ) {
		return;
	} //end if

	el.classList.add( className );
} //end addClass()

export function removeClass( el: Element | null );
export function removeClass( className: string, el: Element | null );
export function removeClass(
	className: string | Element | null,
	el?: Element | null
): void {
	if ( 'string' !== typeof className ) {
		el = className;
		className = 'nelio-popup';
	} else {
		className = `nelio-popup-${ className }`;
	} //end if

	if ( ! el ) {
		return;
	} //end if

	el.classList.remove( className );
} //end removeClass()

export function hasClass( className: string, el?: Element | null ): boolean {
	return !! el && el.classList.contains( `nelio-popup-${ className }` );
} //end hasClass()

export function isCloseButton(
	context: HTMLElement,
	el: HTMLElement
): boolean {
	return (
		el.getAttribute( 'href' ) === '#close-nelio-popup' ||
		isElementInSelection( context, '.nelio-popup-js-close', el )
	);
}

export function isElementInSelection(
	context: Document | HTMLElement,
	selector: string,
	el?: HTMLElement | null
): boolean {
	if ( ! el ) {
		return false;
	} //end if

	try {
		const els = Array.from( context.querySelectorAll( selector ) );
		let node: HTMLElement | null = el;
		while ( node ) {
			if ( els.includes( node ) ) {
				return true;
			} //end if
			node = node.parentElement;
		} //end while
		return false;
	} catch ( e ) {
		return false;
	} //end try
} // end isElementInSelection()

export function cssUnitToPixels(
	el: HTMLElement,
	{ unit, value }: CssSizeUnit
): number {
	switch ( unit ) {
		case 'px':
			return value;

		case '%':
			return Math.floor( ( value * getHeight( el ) ) / 100 );

		case 'em':
			return value * getEmInPixels( el );

		case 'rem':
			return value * getRemInPixels( el );
	} //end switch
} //end cssUnitToPixels()

export const isHTMLElement = ( el: Element | null ): el is HTMLElement => !! el;

// =======
// HELPERS
// =======

function getHeight( el: Element ): number {
	const fn = () => `${ el.clientHeight }`;
	return parseInt( getData( el, 'height', fn ) ) || 0;
} //end getHeight()

function getEmInPixels( el: Element ): number {
	const fn = () => {
		const aux = document.createElement( 'div' );
		aux.style.height = '1em';
		el.appendChild( aux );
		const height = aux.clientHeight;
		el.removeChild( aux );
		return `${ height }`;
	};
	return parseInt( getData( el, 'em-size', fn ) ) || 0;
} //end getEmInPixels()

function getRemInPixels( el: Element ): number {
	const fn = () => {
		const aux = document.createElement( 'div' );
		aux.style.height = '1rem';
		el.appendChild( aux );
		const height = aux.clientHeight;
		el.removeChild( aux );
		return `${ height }`;
	};
	return parseInt( getData( el, 'rem-size', fn ) ) || 0;
} //end getRemInPixels()

function getData( el: Element, name: string, compute: () => string ): string {
	if ( ! el.hasAttribute( `data-nelio-popups-${ name }` ) ) {
		const value = compute();
		el.setAttribute( `data-nelio-popups-${ name }`, `${ value }` );
	} //end if
	return el.getAttribute( `data-nelio-popups-${ name }` ) || '';
} //end getData()
