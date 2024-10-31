/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { trim } from 'lodash';
import type { SelectControlOption } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { recordToSelectOptions } from './functions';

export const isPremium = (): boolean =>
	!! applyFilters( 'nelio_popups.is_premium', false );

export const makePremiumLabel = ( label: string ): string =>
	trim( `${ label } ${ premium() }` );

export const makePremiumString = ( label: string ): string =>
	trim( `${ label } ${ premium() }` );

export function recordToSelectPremiumOptions< T extends string >(
	select: string,
	record: Record< T, string >
): ReadonlyArray< SelectControlOption< T > > {
	return recordToSelectOptions( record ).map( ( { value, label } ) => ( {
		value,
		label: isPremium()
			? maybeComingSoon( select, value, label )
			: makePremiumString( label ),
		disabled: isPremium() ? isComingSoon( select, value ) : true,
	} ) );
} //end recordToSelectPremiumOptions()

// =======
// HELPERS
// =======

const premium = () =>
	isPremium() ? '' : _x( '(premium)', 'text', 'nelio-popups' );

const isComingSoon = ( select: string, value: string ) =>
	!! applyFilters(
		`nelio_popups.is_${ value }_${ select }_option_coming_soon`,
		false
	);

const maybeComingSoon = ( select: string, value: string, label: string ) =>
	isComingSoon( select, value )
		? label + ' ' + _x( '(coming soon)', 'text', 'nelio-popups' )
		: label;
