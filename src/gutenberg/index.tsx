/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { EditorExtensions, PopupOpenControl } from './components';
import type { Settings } from './types';

// Init
if ( hasSettings( window ) ) {
	init( window.NelioPopupsSettings );
} //end if

// =======
// HELPERS
// =======

function hasSettings( w: unknown ): w is { NelioPopupsSettings: Settings } {
	return !! ( w as Record< string, unknown > ).NelioPopupsSettings;
} //end hasSettings()

function init( settings: Settings ) {
	registerPlugin( 'nelio-popups-external', {
		icon: () => null,
		render: () => <EditorExtensions settings={ settings } />,
	} );

	addFilter(
		'editor.BlockEdit',
		'nelio-popups/trigger-open-control',
		PopupOpenControl( settings.popupOpenBlocks )
	);
} //end init()
