/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { Divider, SettingLabel } from '@nelio/popups/components';

/**
 * Internal dependencies
 */
import { TriggerListControl } from './trigger-list-control';

export const TriggerSettings = ( props: {
	readonly isVisible: boolean;
} ): JSX.Element | null => {
	if ( ! props.isVisible ) {
		return null;
	} //end if

	return (
		<>
			<SettingLabel
				label={ _x(
					'Define which triggers will open the popup.',
					'user',
					'nelio-popups'
				) }
			/>
			<Divider />
			<TriggerListControl />
		</>
	);
};
