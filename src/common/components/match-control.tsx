/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import type { Match } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { MultipleSelectControl } from './multiple-select-control';

const MATCH_LABELS: Record< Match[ 'matchType' ], string > = {
	is: _x( 'is', 'text', 'nelio-popups' ),
	'is-not': _x( 'is not', 'text', 'nelio-popups' ),
};
const MATCH_OPTIONS = Object.keys( MATCH_LABELS ).map(
	( value: Match[ 'matchType' ] ) => ( {
		value,
		label: MATCH_LABELS[ value ],
	} )
);

type Item = {
	readonly value: string;
	readonly label: string;
};

export type MatchControlProps = {
	readonly match: Match;
	readonly options: ReadonlyArray< Item >;
	readonly onChange: ( newMatch: Match ) => void;
};

export const MatchControl = ( props: MatchControlProps ): JSX.Element => {
	const {
		match: { matchType, matchValue },
		options,
		onChange,
	} = props;
	return (
		<>
			<SelectControl
				value={ matchType }
				options={ MATCH_OPTIONS }
				onChange={ ( newMatchType ) =>
					onChange( {
						matchType: newMatchType,
						matchValue,
					} )
				}
			/>
			<MultipleSelectControl
				options={ options }
				values={ matchValue }
				onChange={ ( newMatchValue ) => {
					onChange( {
						matchType,
						matchValue: newMatchValue,
					} );
				} }
			/>
		</>
	);
};
