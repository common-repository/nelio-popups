/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { doAction, addAction } from '@wordpress/hooks';

/**
 * External dependencies
 */
import { throttle } from 'lodash';
import {
	OPEN_POPUP_CLASSNAME,
	cssUnitToPixels,
	isElementInSelection,
} from '@nelio/popups/utils';
import type {
	MouseTrigger,
	Popup,
	ScrollTrigger,
	TimeTrigger,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { openPopup as doOpenPopup } from './popup-manager';
import { Settings } from './types';

export function addTriggers( popup: Popup, settings: Settings ): void {
	const { triggers } = popup.config;
	const openPopup = () => doOpenPopup( popup );
	domReady( () => {
		triggers.forEach( ( trigger ) => {
			doAction(
				`nelio_popups.add_${ trigger.type }_listener`,
				trigger,
				openPopup,
				popup,
				settings
			);
		} );
		Array.from(
			document.querySelectorAll(
				`.${ OPEN_POPUP_CLASSNAME }-${ popup.id }, [href='${ popup.url }']`
			)
		).forEach( ( el: Element ) =>
			el.addEventListener( 'click', ( ev ) => {
				ev.preventDefault();
				openPopup();
			} )
		);
	} );
} //end addTriggers()

// =============
// DEFAULT HOOKS
// =============

addAction(
	'nelio_popups.add_page-view_listener',
	'nelio_popups.add_page_view_listener',
	( _, openPopup: () => void ): void => openPopup()
);

addAction(
	'nelio_popups.add_time_listener',
	'nelio_popups.add_time_listener',
	( { seconds }: TimeTrigger, openPopup: () => void ): void => {
		setTimeout( openPopup, seconds * 1000 );
	}
);

addAction(
	'nelio_popups.add_mouse_listener',
	'nelio_popups.add_mouse_listener',
	(
		{ mode, elementSelector }: MouseTrigger,
		openPopup: () => void
	): true => {
		const openIfValid = ( ev: MouseEvent ) => {
			if (
				! isElementInSelection(
					document,
					elementSelector,
					ev.target as HTMLElement
				)
			) {
				return;
			} //end if
			openPopup();
		};

		switch ( mode ) {
			case 'click':
				document.body.addEventListener( 'click', openIfValid );
				return true;

			case 'hover':
				document.body.addEventListener(
					'mousemove',
					throttle( openIfValid, 250 )
				);
				return true;
		} //end switch
	}
);

addAction(
	'nelio_popups.add_scroll_listener',
	'nelio_popups.add_scroll_listener',
	( { value }: ScrollTrigger, openPopup: () => void ): void => {
		let scroll = window.pageYOffset;
		document.addEventListener( 'scroll', () => {
			const prevScroll = scroll;
			scroll = window.pageYOffset;
			if ( prevScroll >= scroll ) {
				return;
			} //end if

			const threshold = cssUnitToPixels( document.body, value );
			if ( prevScroll < threshold && threshold <= scroll ) {
				openPopup();
			} //end if
		} );
	}
);
