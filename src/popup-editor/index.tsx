/**
 * WordPress dependencies
 */
import { dispatch, select } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { injectGlobal } from '@nelio/popups/css';
import { hasPopupSettings, getPopupSettings } from '@nelio/popups/utils';
import type { PopupSettings } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { PopupCloseControl, PopupEditorExtensions } from './components';

// Init
if ( hasPopupSettings( window ) ) {
	init( getPopupSettings() );
} //end if

// =======
// HELPERS
// =======

function init( settings: PopupSettings ) {
	registerPlugin( 'nelio-popups', {
		icon: () => null,
		render: PopupEditorExtensions,
	} );

	addFilter(
		'editor.BlockEdit',
		'nelio-popups/close-control',
		PopupCloseControl( settings.popupCloseBlocks )
	);

	openPanels();

	const buttons = {
		switchToDraft: '.editor-post-switch-to-draft',
		saveDraft:
			'.edit-post-header__settings > .components-button:first-child',
		snackbarViewLink: '.components-snackbar__content > a',
		preview: '.editor-post-preview',
		previewIcon: '.edit-post-header__settings > a[target="_blank"]',
		previewDropdown: '.block-editor-post-preview__dropdown',
	};

	const postStatus = '.edit-post-post-status';

	injectGlobal( `
		${ buttons.switchToDraft },
		${ buttons.saveDraft },
		${ buttons.previewDropdown },
		${ buttons.previewIcon },
		${ buttons.snackbarViewLink },
		${ postStatus } {
			display: none !important;
		}
		${ buttons.preview } {
			display: flex !important;
		}
	` );
} //end init()

function openPanels(): void {
	const { isEditorPanelOpened } = select( 'core/edit-post' );
	const { toggleEditorPanelOpened } = dispatch( 'core/edit-post' );
	const panels = [
		'nelio-popups/nelio-popups-status-panel',
		'nelio-popups/nelio-popups-settings-panel',
	];
	panels.forEach(
		( p ) => ! isEditorPanelOpened( p ) && void toggleEditorPanelOpened( p )
	);
} //end openPanels()
