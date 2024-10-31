/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PopupAnalytics } from './popup-analytics';
import { PopupPatterns } from './popup-patterns';
import { PopupSettings } from './popup-settings';
import { PopupStatus } from './popup-status';

export * from './popup-close-control';

export const PopupEditorExtensions = (): JSX.Element => (
	<>
		<PopupStatus />
		<PopupAnalytics />
		<PopupPatterns />
		<PopupSettings />
	</>
);
