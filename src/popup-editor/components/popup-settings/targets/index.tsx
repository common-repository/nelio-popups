/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { Divider, SettingLabel } from '@nelio/popups/components';
import { usePopupMeta } from '@nelio/popups/hooks';
import type { ConditionBasedTarget, Target } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { ContentGroupsControl } from './content-groups-control';

export const TargetSettings = ( props: {
	readonly isVisible: boolean;
} ): JSX.Element | null => {
	if ( ! props.isVisible ) {
		return null;
	} //end if

	return (
		<>
			<SettingLabel
				label={ _x(
					'Select the locations where the popup can show up.',
					'user',
					'nelio-popups'
				) }
			/>
			<Divider />
			<TargetTypeControl />
			<ContentGroupsControl />
		</>
	);
};

const DEFAULT_CONDITION_BASED_TARGET: ConditionBasedTarget = {
	type: 'condition-based-target',
	groups: [ [ { type: 'content', value: 'home-page' } ] ],
};
const TARGET_LABELS: Record< Target[ 'type' ], string > = {
	'full-site-target': _x( 'Show Everywhere', 'command', 'nelio-popups' ),
	'condition-based-target': _x(
		'Show on Selected Groups',
		'comand',
		'nelio-popups'
	),
	'manual-target': _x(
		'Let Each Page Decide',
		'command (if popup is visible)',
		'nelio-popups'
	),
};
const TARGET_OPTIONS = Object.keys( TARGET_LABELS ).map(
	( value: Target[ 'type' ] ) => ( {
		value,
		label: TARGET_LABELS[ value ],
	} )
);
const TargetTypeControl = (): JSX.Element => {
	const [ target, setTarget ] = usePopupMeta( 'target' );
	const onChange = ( newTargetType: Target[ 'type' ] ) => {
		switch ( newTargetType ) {
			case 'full-site-target':
			case 'manual-target':
				return setTarget( { ...target, type: newTargetType } );

			default:
				return setTarget( {
					...DEFAULT_CONDITION_BASED_TARGET,
					...target,
					type: newTargetType,
				} );
		}
	};
	return (
		<SelectControl
			value={ target.type }
			options={ TARGET_OPTIONS }
			onChange={ onChange }
		/>
	);
};
