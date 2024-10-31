/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { useState } from '@wordpress/element';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { css } from '@nelio/popups/css';

/**
 * Internal dependencies
 */
import { AdvancedSettings } from './advanced';
import { ConditionSettings } from './conditions';
import { TargetSettings } from './targets';
import { StyleSettings } from './style';
import { TriggerSettings } from './triggers';

export const PopupSettings = (): JSX.Element => {
	const [ selectedButton, setSelectedButton ] = useState( 'style' );

	return (
		<PluginDocumentSettingPanel
			name="nelio-popups-settings-panel"
			className="nelio-popups-settings-panel"
			title={ _x( 'Settings', 'text', 'nelio-popups' ) }
		>
			<Toolbar
				label={ _x( 'Settings', 'text', 'nelio-popups' ) }
				id="nelio-popups-settings-toolbar"
				className={ TOOLBAR_STYLE }
			>
				<ToolbarButton
					icon="admin-appearance"
					title={ _x( 'Style', 'text', 'nelio-popups' ) }
					isActive={ selectedButton === 'style' }
					onClick={ () => setSelectedButton( 'style' ) }
				/>
				<ToolbarButton
					icon="admin-page"
					title={ _x( 'Locations', 'text', 'nelio-popups' ) }
					isActive={ selectedButton === 'targets' }
					onClick={ () => setSelectedButton( 'targets' ) }
				/>
				<ToolbarButton
					icon="visibility"
					title={ _x( 'Triggers', 'text', 'nelio-popups' ) }
					isActive={ selectedButton === 'triggers' }
					onClick={ () => setSelectedButton( 'triggers' ) }
				/>
				<ToolbarButton
					icon="list-view"
					title={ _x( 'Conditions', 'text', 'nelio-popups' ) }
					isActive={ selectedButton === 'conditions' }
					onClick={ () => setSelectedButton( 'conditions' ) }
				/>
				<ToolbarButton
					icon="admin-tools"
					title={ _x( 'Advanced', 'text', 'nelio-popups' ) }
					isActive={ selectedButton === 'advanced' }
					onClick={ () => setSelectedButton( 'advanced' ) }
				/>
			</Toolbar>

			<StyleSettings isVisible={ selectedButton === 'style' } />
			<TargetSettings isVisible={ selectedButton === 'targets' } />
			<TriggerSettings isVisible={ selectedButton === 'triggers' } />
			<ConditionSettings isVisible={ selectedButton === 'conditions' } />
			<AdvancedSettings isVisible={ selectedButton === 'advanced' } />
		</PluginDocumentSettingPanel>
	);
};

const TOOLBAR_STYLE = css( {
	border: '1px solid #e0e0e0',
} );
