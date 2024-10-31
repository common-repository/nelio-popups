/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import type { KeyValueMatch, StringMatch } from '@nelio/popups/types';

type SelectValue = 'exists' | 'does-not-exist' | StringMatch[ 'matchType' ];

const DEFAULT_STRING_MATCH: StringMatch = {
	matchType: 'is',
	matchValue: '',
};

const VALUE_LABELS: Record< StringMatch[ 'matchType' ], string > = {
	is: _x( 'has value equal to', 'text', 'nelio-popups' ),
	'is-not': _x( 'has value different from', 'text', 'nelio-popups' ),
	includes: _x( 'has value that includes', 'text', 'nelio-popups' ),
	'does-not-include': _x(
		'has value that does not include',
		'text',
		'nelio-popups'
	),
	regex: _x( 'has value that matches', 'text', 'nelio-popups' ),
};
const MATCH_OPTIONS = [
	{ value: 'exists', label: _x( 'exists', 'text', 'nelio-popups' ) },
	{
		value: 'does-not-exist',
		label: _x( 'does not exist', 'text', 'nelio-popups' ),
	},
	...Object.keys( VALUE_LABELS ).map(
		( value: StringMatch[ 'matchType' ] ) => ( {
			value,
			label: VALUE_LABELS[ value ],
		} )
	),
];

export type KeyValueMatchControlProps = {
	readonly keyPlaceholder?: string;
	readonly keyHelp?: string;
	readonly keyValueMatch: KeyValueMatch;
	readonly onKeyValueMatchChange: ( newKeyValueMatch: KeyValueMatch ) => void;
};
export const KeyValueMatchControl = (
	props: KeyValueMatchControlProps
): JSX.Element => {
	const { keyValueMatch, keyHelp, keyPlaceholder, onKeyValueMatchChange } =
		props;

	const selectedValue = getSelectValue( keyValueMatch );
	const onSelectChange = ( value: SelectValue ) => {
		if ( value === 'exists' ) {
			return onKeyValueMatchChange( {
				exists: true,
				key: keyValueMatch.key,
				value: undefined,
			} );
		} //end if

		if ( value === 'does-not-exist' ) {
			return onKeyValueMatchChange( {
				exists: false,
				key: keyValueMatch.key,
			} );
		} //end if

		return onKeyValueMatchChange( {
			exists: true,
			key: keyValueMatch.key,
			value: {
				matchType: value,
				matchValue: getMatchValue( keyValueMatch ),
			},
		} );
	};

	const textValue = keyValueMatch.exists
		? keyValueMatch.value?.matchValue ?? ''
		: '';
	const onTextChange = ( newText: string ) =>
		onKeyValueMatchChange( {
			exists: true,
			key: keyValueMatch.key,
			value: {
				matchType: getMatchType( keyValueMatch ),
				matchValue: newText,
			},
		} );

	return (
		<>
			<TextControl
				placeholder={ keyPlaceholder }
				help={ keyHelp }
				value={ keyValueMatch.key }
				onChange={ ( newKey ) => {
					onKeyValueMatchChange( {
						...keyValueMatch,
						key: newKey,
					} );
				} }
			/>
			<SelectControl
				value={ selectedValue }
				options={ MATCH_OPTIONS }
				onChange={ onSelectChange }
			/>
			{ selectedValue !== 'exists' &&
				selectedValue !== 'does-not-exist' && (
					<TextControl
						placeholder={
							selectedValue === 'regex'
								? _x(
										'Regular expression',
										'text',
										'nelio-popups'
								  )
								: _x( 'Value', 'text', 'nelio-popups' )
						}
						value={ textValue }
						onChange={ onTextChange }
					/>
				) }
		</>
	);
};

function getSelectValue( value: KeyValueMatch ): SelectValue {
	if ( ! value.exists ) {
		return 'does-not-exist';
	} //end if

	if ( ! value.value ) {
		return 'exists';
	} //end if

	return getMatchType( value );
} //end getSelectValue()

function getMatchType( value: KeyValueMatch ): StringMatch[ 'matchType' ] {
	return value.exists && value.value
		? value.value.matchType
		: DEFAULT_STRING_MATCH.matchType;
} //end getMatchType()

function getMatchValue( value: KeyValueMatch ): string {
	return value.exists && value.value
		? value.value.matchValue
		: DEFAULT_STRING_MATCH.matchValue;
} //end getMatchValue()
