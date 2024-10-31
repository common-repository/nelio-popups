/**
 * WordPress dependencies
 */
import { addFilter, applyFilters } from '@wordpress/hooks';

/**
 * External dependencies
 */
import {
	bypassBooleanPromiseFilter,
	doesCookieExist,
	doesStringMatch,
	getCookie,
} from '@nelio/popups/utils';
import type {
	CookieCondition,
	ReferrerCondition,
	Popup,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import type { WordPressContext } from './types';
import { ConditionGroup } from '../common/types/popups/conditions';

export async function filterActivePopups(
	popups: ReadonlyArray< Popup >,
	context: WordPressContext
): Promise< ReadonlyArray< Popup > > {
	const results = popups.map( ( popup ) => isPopupActive( popup, context ) );
	return allBooleanSettled( results, ( values ) =>
		popups.filter( ( _, i ) => values[ i ] )
	);
}

async function isPopupActive(
	popup: Popup,
	context: WordPressContext
): Promise< boolean > {
	if ( ! popup.config.conditions.length ) {
		return true;
	} //end if

	const results = popup.config.conditions.map( ( group ) =>
		doesConditionGroupApply( group, context )
	);
	return allBooleanSettled( results, ( values ) =>
		values.some( ( x ) => !! x )
	);
} //end isPopupActive()

async function doesConditionGroupApply(
	conditionGroup: ConditionGroup,
	context: WordPressContext
): Promise< boolean > {
	const results = conditionGroup.map(
		( condition ) =>
			applyFilters(
				`nelio_popups.does_${ condition.type }_condition_apply`,
				Promise.resolve( false ),
				condition,
				context
			) as Promise< boolean >
	);
	return allBooleanSettled( results, ( values ) =>
		values.every( ( x ) => x )
	);
} //end doesConditionGroupApply()

function allBooleanSettled< T >(
	promises: ReadonlyArray< Promise< boolean > >,
	fn: ( values: ReadonlyArray< boolean > ) => T
): Promise< T > {
	return Promise.allSettled( promises ).then( ( values ) =>
		fn( values.map( ( v ) => v.status === 'fulfilled' && v.value ) )
	);
} //end allBooleanSettled()

// =============
// DEFAULT HOOKS
// =============

addFilter(
	'nelio_popups.does_referrer_condition_apply',
	'nelio_popups.does_referrer_condition_apply',
	bypassBooleanPromiseFilter( ( condition: ReferrerCondition ): boolean =>
		doesStringMatch( condition, document.referrer )
	)
);

addFilter(
	'nelio_popups.does_cookie_condition_apply',
	'nelio_popups.does_cookie_condition_apply',
	bypassBooleanPromiseFilter( ( condition: CookieCondition ): boolean => {
		if ( ! condition.exists ) {
			return ! doesCookieExist( condition.key );
		} //end if

		if ( ! condition.value ) {
			return doesCookieExist( condition.key );
		} //end if

		const value = getCookie( condition.key );
		return (
			doesCookieExist( condition.key ) &&
			doesStringMatch( condition.value, value )
		);
	} )
);
