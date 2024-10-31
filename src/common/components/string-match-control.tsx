/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import type { StringMatch } from '@nelio/popups/types';

const MATCH_LABELS: Record< StringMatch[ 'matchType' ], string > = {
	is: _x( 'is equal to', 'text', 'nelio-popups' ),
	'is-not': _x( 'is not equal to', 'text', 'nelio-popups' ),
	includes: _x( 'includes', 'text', 'nelio-popups' ),
	'does-not-include': _x( 'does not include', 'text', 'nelio-popups' ),
	regex: _x( 'matches regular expression', 'text', 'nelio-popups' ),
};
const MATCH_OPTIONS = Object.keys( MATCH_LABELS ).map(
	( value: StringMatch[ 'matchType' ] ) => ( {
		value,
		label: MATCH_LABELS[ value ],
	} )
);

export type StringMatchControlProps = {
	readonly match: StringMatch;
	readonly valueHelp?: string;
	readonly onStringMatchChange: ( newStringMatch: StringMatch ) => void;
};

export const StringMatchControl = (
	props: StringMatchControlProps
): JSX.Element => {
	const {
		match: { matchType, matchValue },
		valueHelp,
		onStringMatchChange,
	} = props;
	return (
		<>
			<SelectControl
				value={ matchType }
				options={ MATCH_OPTIONS }
				onChange={ ( newMatchType ) =>
					onStringMatchChange( {
						matchType: newMatchType,
						matchValue,
					} )
				}
			/>
			<TextControl
				placeholder={
					matchType === 'regex'
						? _x( 'Regular expression', 'text', 'nelio-popups' )
						: _x( 'Value', 'text', 'nelio-popups' )
				}
				help={ valueHelp }
				value={ matchValue }
				onChange={ ( newMatchValue ) => {
					onStringMatchChange( {
						matchType,
						matchValue: newMatchValue,
					} );
				} }
			/>
		</>
	);
};
