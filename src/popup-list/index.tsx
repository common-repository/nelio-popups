/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import { ActiveControl } from './components';

// Init
init();

// =======
// HELPERS
// =======

function init() {
	domReady( renderColumns );
} //end init()

function renderColumns() {
	const nodes = document.querySelectorAll( '.nelio-popups-active-wrapper' );
	nodes.forEach( ( node ) => {
		const id = Number.parseInt( node.getAttribute( 'data-id' ) || '' );
		if ( isNaN( id ) ) {
			return;
		} //end if

		const enabled = node.getAttribute( 'data-enabled' ) === 'true';

		render(
			<ActiveControl popupId={ id } initialValue={ enabled } />,
			node
		);
	} );
} //end renderColumns()
