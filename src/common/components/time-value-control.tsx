/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import type { TimeValue } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { ValueUnitControl, ValueUnitControlProps } from './value-unit-control';

const UNIT_OPTIONS: ValueUnitControlProps< TimeValue[ 'unit' ] >[ 'units' ] = {
	seconds: {
		label: _x( 'secs', 'text (short seconds)', 'nelio-popups' ),
		dropdownLabel: _x( 'seconds', 'text', 'nelio-popups' ),
	},
	minutes: {
		label: _x( 'mins', 'text (short minutes)', 'nelio-popups' ),
		dropdownLabel: _x( 'minutes', 'text', 'nelio-popups' ),
	},
	hours: {
		label: _x( 'hours', 'text (short hours)', 'nelio-popups' ),
		dropdownLabel: _x( 'hours', 'text', 'nelio-popups' ),
	},
	days: {
		label: _x( 'days', 'text (short days)', 'nelio-popups' ),
		dropdownLabel: _x( 'days', 'text', 'nelio-popups' ),
	},
	months: {
		label: _x( 'months', 'text (short months)', 'nelio-popups' ),
		dropdownLabel: _x( 'months', 'text', 'nelio-popups' ),
	},
};

export type TimeValueControlProps = {
	readonly label?: string;
	readonly help?: string;
	readonly min?: number;
	readonly value: TimeValue;
	readonly onChange: ( value: TimeValue ) => void;
};

export const TimeValueControl = ( {
	label,
	help,
	min,
	value,
	onChange,
}: TimeValueControlProps ): JSX.Element => (
	<ValueUnitControl
		label={ label }
		help={ help }
		min={ min }
		value={ value }
		units={ UNIT_OPTIONS }
		onChange={ onChange }
	/>
);
