/**
 * External dependencies
 */
import type { DisplaySettings, TriggerLimit } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { applyParser } from './hooks';
import { DEFAULT_POPUP_METAS } from '../defaults';
import { extract } from '../functions';

export function parseDisplaySettings(
	value?: Partial< DisplaySettings >
): DisplaySettings {
	const def = DEFAULT_POPUP_METAS.display;
	return {
		...extract( 'disablesOtherPopupOpenings', def, value ),
		...extract( 'isDisabledIfOpenedPopups', def, value ),
		...extract( 'isDisabledOnMobile', def, value ),
		...extract( 'zIndex', def, value ),
		triggerLimit: parseTriggerLimit( value?.triggerLimit ),
	};
} //end parseDisplaySettings()

// =======
// HELPERS
// =======

function parseTriggerLimit( limit?: Partial< TriggerLimit > ): TriggerLimit {
	return (
		applyParser( 'trigger_limit', limit ) ??
		DEFAULT_POPUP_METAS.display.triggerLimit
	);
} //end parseTriggerLimit()
