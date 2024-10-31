/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';

/**
 * External dependencies
 */
import { noop } from 'lodash';
import { css } from '@nelio/popups/css';
import type { CssSizeUnit } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { ValueUnitControl, ValueUnitControlProps } from './value-unit-control';

export type CSSUnitControlProps = {
	readonly label?: string;
	readonly title?: string;
	readonly help?: string;
	readonly min?: number;
	readonly value: CssSizeUnit;
	readonly onBlur?: () => void;
	readonly onFocus?: () => void;
	readonly onChange: ( value: CssSizeUnit ) => void;
};

const UNIT_OPTIONS: ValueUnitControlProps< CssSizeUnit[ 'unit' ] >[ 'units' ] =
	{
		px: { label: 'px' },
		'%': { label: '%' },
		em: { label: 'em' },
		rem: { label: 'rem' },
	};

export const CSSUnitControl = ( {
	label,
	title,
	help,
	min,
	value,
	onBlur = noop,
	onFocus = noop,
	onChange,
}: CSSUnitControlProps ): JSX.Element => (
	<ValueUnitControl
		className={ STYLE }
		label={ label }
		title={ title }
		help={ help }
		min={ min }
		value={ value }
		units={ UNIT_OPTIONS }
		onBlur={ onBlur }
		onFocus={ onFocus }
		onChange={ onChange }
	/>
);

// ======
// STYLES
// ======

const STYLE = css( {
	'& .nelio-popups-unit': {
		maxWidth: '26px',
	},

	'& .nelio-popups-unit > span': {
		fontSize: '9px',
	},
} );
