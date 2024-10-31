/**
 * WordPress dependencies
 */
import { applyFilters, addFilter } from '@wordpress/hooks';

/**
 * External dependencies
 */
import {
	OPEN_POPUP_CLASSNAME,
	bypassBooleanFilter,
	not,
} from '@nelio/popups/utils';
import type { ContentTargetCondition, Popup } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import type { WordPressContext } from './types';

export function doesTargetApply(
	popup: Popup,
	context: WordPressContext
): boolean {
	const { target } = popup.config;

	if (
		document.querySelector( `.${ OPEN_POPUP_CLASSNAME }-${ popup.id }` ) ||
		document.querySelector( `[href='${ popup.url }']` )
	) {
		return true;
	} //end if

	if ( 'auto' !== context.postPopups ) {
		return context.postPopups.includes( popup.id );
	} //end if

	if ( 'full-site-target' === target.type ) {
		return true;
	} //end if

	if ( 'manual-target' === target.type ) {
		return false;
	} //end if

	return target.groups.some( ( conditions ) =>
		conditions.every( ( condition ) =>
			applyFilters(
				`nelio_popups.does_${ condition.type }_target_apply`,
				false,
				condition,
				context
			)
		)
	);
} //end doesTargetApply()

// =============
// DEFAULT HOOKS
// =============

addFilter(
	'nelio_popups.does_content_target_apply',
	'nelio_popups.does_content_target_apply',
	bypassBooleanFilter( doesContentTargetConditionApply )
);

addFilter(
	'nelio_popups.does_excluded-content_target_apply',
	'nelio_popups.does_excluded-content_target_apply',
	bypassBooleanFilter( not( doesContentTargetConditionApply ) )
);

// =======
// HELPERS
// =======

function doesContentTargetConditionApply(
	condition: ContentTargetCondition,
	context: WordPressContext
): boolean {
	switch ( condition.value ) {
		case '404-page':
		case 'blog-page':
		case 'home-page':
		case 'search-result-page':
			return context.specialPage === condition.value;
	} //end switch

	const { postType } = condition;
	if ( context.postType !== postType ) {
		return false;
	} //end if

	const { postValue } = condition;
	switch ( postValue.type ) {
		case 'all-posts':
			return context.isSingular;

		case 'selected-posts':
			return (
				context.isSingular &&
				postValue.postIds.includes( context.postId )
			);

		case 'children':
			return (
				context.isSingular &&
				context.parents.some( ( p ) => postValue.postIds.includes( p ) )
			);

		case 'template':
			return (
				context.isSingular && context.template === postValue.template
			);

		case 'selected-terms':
			return !! applyFilters(
				'nelio_popups.does_taxonomy_target_apply',
				false,
				condition,
				context
			);
	} //end switch
} //end doesContentTargetConditionApply()
