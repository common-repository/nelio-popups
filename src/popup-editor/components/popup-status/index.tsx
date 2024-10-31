/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ActiveControl } from './active-control';
import { TitleControl } from './title-control';
import { TrashControl } from './trash-control';

export const PopupStatus = (): JSX.Element => (
	<PluginDocumentSettingPanel
		name="nelio-popups-status-panel"
		className="nelio-popups-status-panel"
		title={ _x( 'Status', 'text', 'nelio-popups' ) }
	>
		<TitleControl />
		<ActiveControl />
		<TrashControl />
	</PluginDocumentSettingPanel>
);
