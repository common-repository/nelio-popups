/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { css } from '@nelio/popups/css';
import type { DateMatch } from '@nelio/popups/types';

const MATCH_LABELS: Record< DateMatch[ 'matchType' ], string > = {
	'greater-than': _x( 'greater than', 'text', 'nelio-popups' ),
	'less-than': _x( 'less than', 'text', 'nelio-popups' ),
	between: _x( 'between', 'text', 'nelio-popups' ),
};
const MATCH_OPTIONS = Object.keys( MATCH_LABELS ).map(
	( value: DateMatch[ 'matchType' ] ) => ( {
		value,
		label: MATCH_LABELS[ value ],
	} )
);

export type DateMatchControlProps = {
	readonly match: DateMatch;
	readonly onChange: ( newMatch: DateMatch ) => void;
};

export const DateMatchControl = (
	props: DateMatchControlProps
): JSX.Element => {
	const { match, onChange } = props;
	const { matchType, ...other } = match;

	const onSelectChange = ( value: DateMatch[ 'matchType' ] ) => {
		if ( value === 'between' ) {
			return onChange( {
				matchType: 'between',
				minMatchValue: '',
				maxMatchValue: '',
				...other,
			} );
		} //end if

		if ( value === 'greater-than' ) {
			return onChange( {
				matchType: 'greater-than',
				matchValue: '',
				...other,
			} );
		} //end if

		return onChange( {
			matchType: value,
			matchValue: '',
			...other,
		} );
	};

	return (
		<>
			<SelectControl
				value={ matchType }
				options={ MATCH_OPTIONS }
				onChange={ onSelectChange }
			/>
			<RangeDateControl match={ match } onChange={ onChange } />
			<SingleDateControl match={ match } onChange={ onChange } />
		</>
	);
};

type RangeDateControlProps = {
	readonly match: DateMatch;
	readonly onChange: ( newMatch: DateMatch ) => void;
};
const RangeDateControl = (
	props: RangeDateControlProps
): JSX.Element | null => {
	const { match, onChange } = props;
	if ( match.matchType !== 'between' ) {
		return null;
	} //end if

	return (
		<>
			<TextControl
				className={ STYLE }
				type="date"
				value={ match.minMatchValue }
				max={ match.maxMatchValue }
				label={ _x( 'Start date', 'text', 'nelio-popups' ) }
				onChange={ ( newMin ) =>
					onChange( {
						...match,
						minMatchValue: newMin,
					} )
				}
			/>
			<TextControl
				className={ STYLE }
				type="date"
				value={ match.maxMatchValue }
				min={ match.minMatchValue }
				label={ _x( 'End date', 'text', 'nelio-popups' ) }
				onChange={ ( newMax ) =>
					onChange( {
						...match,
						maxMatchValue: newMax,
					} )
				}
			/>
		</>
	);
};

type SingleDateControlProps = {
	readonly match: DateMatch;
	readonly onChange: ( newMatch: DateMatch ) => void;
};
const SingleDateControl = (
	props: SingleDateControlProps
): JSX.Element | null => {
	const { match, onChange } = props;
	if ( match.matchType === 'between' ) {
		return null;
	} //end if

	return (
		<TextControl
			className={ STYLE }
			type="date"
			value={ match.matchValue }
			onChange={ ( newValue ) =>
				onChange( {
					...match,
					matchValue: newValue,
				} )
			}
		/>
	);
};

// ======
// STYLES
// ======

const STYLE = css( {
	'input[type="date"]': {
		paddingTop: 0,
		paddingBottom: 0,
	},
} );
