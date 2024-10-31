/**
 * External dependencies
 */
import type {
	TargetCondition,
	FreeTargetCondition,
	PremiumTargetCondition,
	PostTypeConditionValue,
	Target,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { applyParser } from './hooks';
import { DEFAULT_POPUP_METAS } from '../defaults';
import { hasType } from '../functions';

export function parseTarget( value?: Partial< Target > ): Target {
	if ( ! value || ! hasType( value ) ) {
		return DEFAULT_POPUP_METAS.target;
	} //end if

	switch ( value.type ) {
		case 'full-site-target':
			return {
				type: 'full-site-target',
			};

		case 'manual-target':
			return {
				type: 'manual-target',
			};

		case 'condition-based-target':
			return {
				type: 'condition-based-target',
				groups: ( value.groups ?? [] ).map( parseTargetConditionGroup ),
			};
	} //end switch
} //end parseTarget()

export function parseTargetConditionGroup(
	group?: ReadonlyArray< TargetCondition >
): ReadonlyArray< TargetCondition > {
	if ( ! group ) {
		return [];
	} //end if

	return group.filter( isTargetCondition ).map( parseTargetCondition );
} //end parseTargetConditionGroup()

export const parseTargetCondition = (
	condition: Partial< TargetCondition > & Pick< TargetCondition, 'type' >
): TargetCondition =>
	parseFreeTargetCondition( condition as FreeTargetCondition ) ??
	parsePremiumTargetCondition( condition as PremiumTargetCondition );

// =======
// HELPERS
// =======

const isTargetCondition = (
	c?: Partial< TargetCondition >
): c is Partial< TargetCondition > & Pick< TargetCondition, 'type' > =>
	!! c?.type;

function parseFreeTargetCondition(
	condition: Partial< FreeTargetCondition > &
		Pick< FreeTargetCondition, 'type' >
): FreeTargetCondition {
	switch ( condition.type ) {
		case 'content':
		case 'excluded-content':
			if ( condition.value === 'post-type' ) {
				return {
					type: condition.type,
					value: 'post-type',
					postType: condition.postType ?? 'page',
					postValue: parsePostValue( condition.postValue ),
				};
			}
			return {
				type: condition.type,
				value: condition.value ?? 'home-page',
			};
		//end if
	} //end switch
} //end parseFreeTargetCondition()

function parsePremiumTargetCondition(
	condition: Partial< PremiumTargetCondition > &
		Pick< PremiumTargetCondition, 'type' >
): PremiumTargetCondition {
	return (
		applyParser< PremiumTargetCondition >(
			`${ condition.type }_condition`,
			condition
		) ?? {
			...condition,
			type: condition.type,
		}
	);
} //end parsePremiumTargetCondition()

function parsePostValue(
	value?: Partial< PostTypeConditionValue >
): PostTypeConditionValue {
	if ( ! value || ! hasType( value ) ) {
		return { type: 'all-posts' };
	} //end if

	switch ( value.type ) {
		case 'all-posts':
			return {
				type: value.type,
			};

		case 'selected-posts':
		case 'children':
			return {
				type: value.type,
				postIds: ( value.postIds ?? [] ).filter( ( x ) => !! x ),
			};

		case 'template':
			return {
				type: value.type,
				...( value.template && { template: value.template } ),
			};

		case 'selected-terms':
			return {
				type: value.type,
				taxonomyName: value.taxonomyName ?? '',
				termIds: ( value.termIds ?? [] ).filter( ( x ) => !! x ),
			};
	} //end if
} //end parsePostValue()
