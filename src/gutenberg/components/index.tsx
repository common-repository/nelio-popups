/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PopupOpenPanel } from './popup-open-panel';
import type { Settings } from '../types';

export * from './popup-open-control';

export type EditorExtensionsProps = {
	readonly settings: Settings;
};
export const EditorExtensions = ( {
	settings,
}: EditorExtensionsProps ): JSX.Element => (
	<PopupOpenPanel postTypes={ settings.postTypes } />
);
