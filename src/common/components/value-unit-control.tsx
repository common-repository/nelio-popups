/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { BaseControl, SelectControl, TextControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

/**
 * External dependencies
 */
import { noop } from 'lodash';
import { css, cx } from '@nelio/popups/css';

export type ValueUnitControlProps< T extends string > = {
	readonly className?: string;
	readonly label?: string;
	readonly title?: string;
	readonly help?: string;
	readonly min?: number;
	readonly value: Value< T >;
	readonly units: Record< T, UnitLabel >;
	readonly onBlur?: () => void;
	readonly onFocus?: () => void;
	readonly onChange: ( value: Value< T > ) => void;
};

type Value< T > = {
	readonly unit: T;
	readonly value: number;
};

type UnitLabel = {
	readonly label: string;
	readonly dropdownLabel?: string;
};

export function ValueUnitControl< T extends string >( {
	className,
	label,
	title,
	help,
	min,
	units,
	value: { value, unit },
	onBlur = noop,
	onFocus = noop,
	onChange,
}: ValueUnitControlProps< T > ): JSX.Element {
	const instanceId = useInstanceId( ValueUnitControl );

	const unitOptions = Object.keys( units ).map( ( key: T ) => ( {
		value: key,
		label: units[ key ].dropdownLabel || units[ key ].label,
	} ) );

	return (
		<BaseControl
			id={ `css-unit-value-control-${ instanceId }` }
			label={ label }
			help={ help }
		>
			<div className={ cx( WRAPPER_STYLE, className ) }>
				<TextControl
					title={ title }
					value={ value }
					onBlur={ onBlur }
					onFocus={ onFocus }
					onChange={ ( newValue ) =>
						onChange( { value: num( newValue, min ), unit } )
					}
				/>
				<div className={ cx( UNIT_STYLE, 'nelio-popups-unit' ) }>
					<span>{ units[ unit ].label }</span>
					<SelectControl< string >
						value={ unit }
						options={ unitOptions }
						onBlur={ onBlur }
						onFocus={ onFocus }
						onChange={ ( newUnit: T ) =>
							onChange( { value, unit: newUnit } )
						}
					/>
				</div>
			</div>
		</BaseControl>
	);
} //end ValueUnitControl()

// =======
// HELPERS
// =======

function num( s: string, min = 0 ): number {
	const r = parseInt( s );
	return isNaN( r ) ? min : Math.max( r, min ); //TODO fix this
} //end num()

// ======
// STYLES
// ======

const WRAPPER_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',

	'& > :first-child': {
		flexGrow: 1,
	},

	'& input[type="text"]': {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},

	'& .components-input-control__backdrop': {
		borderTopLeftRadius: '0 !important',
		borderBottomLeftRadius: '0 !important',
	},

	'& > :last-child': {
		flexGrow: 1,
	},
} );

const UNIT_STYLE = css( {
	position: 'relative',

	'& > :first-child': {
		color: '#777',
		fontSize: 'max(10px, 0.8em)',
		left: '50%',
		pointerEvents: 'none',
		position: 'absolute',
		textTransform: 'uppercase',
		top: 6,
		transform: 'translate(-50%, 0px)',
		userSelect: 'none',
		zIndex: 3,
	},

	'& select': {
		opacity: 0,
	},

	'& svg': {
		opacity: 0,
	},
} );
