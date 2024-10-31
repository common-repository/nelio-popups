/**
 * External dependencies
 */
import { isObject } from 'lodash';
import type {
	Match,
	DateMatch,
	NumberMatch,
	SelectControlOption,
	StringMatch,
	TimeValue,
	PopupSettings,
	PopupEditorSettings,
} from '@nelio/popups/types';

// =======
// EXPORTS
// =======

export const not =
	< A extends unknown[] >(
		fn: ( ...args: A ) => boolean
	): ( ( ...args: A ) => boolean ) =>
	( ...args ) =>
		! fn( ...args );

export const bypassDefinedFilter =
	< R, A extends unknown[] >(
		fn: ( ...args: A ) => R
	): ( ( val: R | undefined, ...args: A ) => R ) =>
	( val: R, ...args: A ): R =>
		val ?? fn( ...args );

export const bypassBooleanFilter =
	< A extends unknown[] >(
		fn: ( ...args: A ) => boolean
	): ( ( val: boolean, ...args: A ) => boolean ) =>
	( val: boolean, ...args: A ): boolean =>
		val || fn( ...args );

export const bypassBooleanPromiseFilter = <
	A extends unknown[],
	R extends boolean | Promise< boolean >,
>(
	fn: ( ...args: A ) => R
): ( ( val: Promise< boolean >, ...args: A ) => Promise< boolean > ) => {
	return async function (
		val: Promise< boolean >,
		...args: A
	): Promise< boolean > {
		const promisify = ( v: R ): Promise< boolean > =>
			'boolean' === typeof v ? Promise.resolve( v ) : v;

		try {
			return ( await val ) || ( await promisify( fn( ...args ) ) );
		} catch ( e ) {
			return await promisify( fn( ...args ) );
		}
	};
};

export function recordToSelectOptions< T extends string >(
	record: Record< T, string >
): ReadonlyArray< SelectControlOption< T > > {
	return Object.keys( record ).map( ( key: T ) => ( {
		value: key,
		label: record[ key ],
		disabled: false,
	} ) );
} //end recordToSelectOptions()

export function doesStringMatch(
	expectedMatch: StringMatch,
	actualValue = ''
): boolean {
	const { matchType: type, matchValue: expectedValue } = expectedMatch;
	switch ( type ) {
		case 'is':
			return expectedValue === actualValue;

		case 'is-not':
			return expectedValue !== actualValue;

		case 'includes':
			return actualValue.includes( expectedValue );

		case 'does-not-include':
			return ! actualValue.includes( expectedValue );

		case 'regex':
			try {
				return new RegExp( expectedValue ).test( actualValue );
			} catch ( e ) {
				return false;
			} //end try
	} //end switch
} //end doesStringMatch()

export function doesDateMatch(
	expectedMatch: DateMatch,
	actualValue = ''
): boolean {
	const { matchType: type } = expectedMatch;
	switch ( type ) {
		case 'between':
			const { minMatchValue, maxMatchValue } = expectedMatch;
			return minMatchValue <= actualValue && actualValue <= maxMatchValue;

		case 'greater-than':
			return expectedMatch.matchValue <= actualValue;

		case 'less-than':
			return actualValue <= expectedMatch.matchValue;
	} //end switch
} //end doesDateMatch()

export function doesNumberMatch(
	expectedMatch: NumberMatch,
	actualValue = 0
): boolean {
	const { matchType: type } = expectedMatch;
	switch ( type ) {
		case 'between':
			const { minMatchValue, maxMatchValue } = expectedMatch;
			return minMatchValue <= actualValue && actualValue <= maxMatchValue;

		case 'greater-than':
			return expectedMatch.matchValue < actualValue;

		case 'less-than':
			return actualValue < expectedMatch.matchValue;
	} //end switch
} //end doesNumberMatch()

export function doesMatch( expectedMatch: Match, actualValue = '' ): boolean {
	const { matchType: type, matchValue: expectedValue } = expectedMatch;
	switch ( type ) {
		case 'is':
			return expectedValue.includes( actualValue );

		case 'is-not':
			return ! expectedValue.includes( actualValue );
	} //end switch
} //end doesMatch()

export function timeValueToSeconds( { unit, value }: TimeValue ): number {
	switch ( unit ) {
		case 'seconds':
			return value;

		case 'minutes':
			return value * 60;

		case 'hours':
			return value * 60 * 60;

		case 'days':
			return value * 24 * 60 * 60;

		case 'months':
			return value * 30 * 24 * 60 * 60;
	} //end switch
} //end timeValueToSeconds()

export function hasType< T extends { readonly type: string } >(
	x: Partial< T >
): x is Partial< T > & { readonly type: T[ 'type' ] } {
	return !! x.type;
} //end hasType()

export function extract< T, K extends keyof T >(
	attr: K,
	def: T,
	val?: Partial< T >
): Pick< T, K > {
	return { [ attr ]: val ? val[ attr ] ?? def[ attr ] : def[ attr ] } as Pick<
		T,
		K
	>;
} //end extract()

export function getPopupEditorSettings(): PopupEditorSettings {
	const settings = hasPopupEditorSettings( window )
		? window.NelioPopupsEditorSettings
		: {};

	return {
		popupCloseBlocks: [],
		activePlugins: [],
		...settings,
	};
}

export function getPopupSettings(): PopupSettings {
	const settings = hasPopupSettings( window )
		? window.NelioPopupsEditorSettings
		: {};

	return {
		popupCloseBlocks: [],
		popupOpenBlocks: [],
		...settings,
	};
}

export function hasOwnProperty< Y extends PropertyKey >(
	obj: unknown,
	prop: Y
): obj is Record< Y, unknown > {
	return !! obj && typeof obj === 'object' && obj.hasOwnProperty( prop );
} //end hasOwnProperty()

export const hasPopupEditorSettings = (
	x: unknown
): x is { NelioPopupsEditorSettings: Partial< PopupEditorSettings > } =>
	hasOwnProperty( x, 'NelioPopupsEditorSettings' ) &&
	isObject( x.NelioPopupsEditorSettings );

export const hasPopupSettings = (
	w: unknown
): w is { NelioPopupsEditorSettings: PopupSettings } => {
	return !! ( w as Record< string, unknown > ).NelioPopupsEditorSettings;
}; //end hasSettings()
