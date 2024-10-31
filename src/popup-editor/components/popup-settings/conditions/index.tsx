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
import { ConditionGroupsControl } from './condition-groups-control';

export const ConditionSettings = ( props: {
	readonly isVisible: boolean;
} ): JSX.Element | null => {
	if ( ! props.isVisible ) {
		return null;
	} //end if

	return (
		<>
			<SettingLabel
				label={ _x(
					'Set under which conditions a visitor will see the popup.',
					'user',
					'nelio-popups'
				) }
			/>
			<Divider />
			<ConditionGroupsControl />
		</>
	);
};
