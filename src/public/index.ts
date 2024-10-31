/**
 * WordPress dependencies
 */
import { doAction } from '@wordpress/hooks';

/**
 * External dependencies
 */
import 'animate.css';
import { parsePopupMetas } from '@nelio/popups/utils';
import type { Popup } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import './style.scss';
import { closePopup } from './popup-manager';
import { filterActivePopups } from './conditions';
import { doesTargetApply } from './targets';
import { addTriggers } from './triggers';
import type { Settings } from './types';

type NelioPopupsWindow = Window &
	typeof globalThis & {
		NelioPopups: Record< string, unknown >;
	};

// Init
const win = window as NelioPopupsWindow;
win.NelioPopups = {
	...( win.NelioPopups ?? {} ),
	closePopup,
};

if ( hasSettings( win ) ) {
	void init( win.NelioPopupsFrontendSettings );
} //end if

// =======
// HELPERS
// =======

function hasSettings(
	w: unknown
): w is { NelioPopupsFrontendSettings: Settings } {
	return !! ( w as Record< string, unknown > ).NelioPopupsFrontendSettings;
} //end hasSettings()

async function init( settings: Settings ): Promise< void > {
	settings = initPopups( settings );
	doAction( `nelio_popups.add_generic_listeners`, settings );
	const popups = await loadPopups( settings );
	popups.forEach( ( popup ) => addTriggers( popup, settings ) );
} //end init()

function initPopups( settings: Settings ): Settings {
	const initPopup = ( popup: Popup ) => ( {
		...popup,
		config: parsePopupMetas( popup.config ),
	} );

	const { previewPopup } = settings.context;
	return {
		context: {
			...settings.context,
			previewPopup: previewPopup && initPopup( previewPopup ),
		},
		popups: settings.popups.map( initPopup ),
	};
} //end initPopups()

async function loadPopups(
	settings: Settings
): Promise< ReadonlyArray< Popup > > {
	const { previewPopup } = settings.context;
	if ( previewPopup ) {
		return [ makePreviewPopup( previewPopup ) ];
	} //end if

	const includedPopups = settings.popups.filter( ( popup ) =>
		doesTargetApply( popup, settings.context )
	);
	return await filterActivePopups( includedPopups, settings.context );
} //end loadPopups()

function makePreviewPopup( popup: Popup ): Popup {
	return {
		...popup,
		config: {
			...popup.config,
			advanced: {
				...popup.config.advanced,
				popupOpenedCookie: { isEnabled: false },
			},
			display: {
				...popup.config.display,
				triggerLimit: {
					type: 'unlimited',
					delay: { unit: 'minutes', value: 0 },
				},
			},
			triggers: [ { type: 'page-view' } ],
		},
	};
} //end makePreviewPopup()
