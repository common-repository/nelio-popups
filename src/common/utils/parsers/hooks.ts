/**
 * WordPress dependencies
 */
import { addFilter, applyFilters } from '@wordpress/hooks';

export function applyParser< T >(
	hookName: string,
	value?: Partial< T >
): T | undefined {
	return applyFilters(
		`nelio_popups.parse_${ hookName }`,
		undefined,
		value
	) as T | undefined;
} //end applyParser()

export function setParser< T >(
	hookName: string,
	nameSpace: string,
	parse: ( value: Partial< T > ) => T
): void {
	addFilter(
		`nelio_popups.parse_${ hookName }`,
		`nelio_popups.parse_${ nameSpace }`,
		( undef: T | undefined, value: Partial< T > ) => undef ?? parse( value )
	);
} //end setParser()
