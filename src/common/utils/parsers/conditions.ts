/**
 * External dependencies
 */
import type {
	Condition,
	ConditionGroup,
	FreeCondition,
	PremiumCondition,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { applyParser } from './hooks';
import { parseKeyValueMatch, parseStringMatch } from './helpers';

export function parseConditionsSettings(
	value?: Partial< ReadonlyArray< ConditionGroup > >
): ReadonlyArray< ConditionGroup > {
	return ( value ?? [] ).map( parseConditionGroup );
} //end parseConditionsSettings()

export function parseConditionGroup(
	group?: ReadonlyArray< Condition >
): ReadonlyArray< Condition > {
	if ( ! group ) {
		return [];
	} //end if

	return group.filter( isCondition ).map( parseCondition );
} //end parseTargetConditionGroup()

export const parseCondition = (
	condition: Partial< Condition > & Pick< Condition, 'type' >
): Condition =>
	parseFreeCondition( condition as FreeCondition ) ??
	parsePremiumCondition( condition as PremiumCondition );

// =======
// HELPERS
// =======

const isCondition = (
	c?: Partial< Condition >
): c is Partial< Condition > & Pick< Condition, 'type' > => !! c?.type;

function parseFreeCondition(
	condition: Partial< FreeCondition > & Pick< FreeCondition, 'type' >
): FreeCondition {
	switch ( condition.type ) {
		case 'cookie':
			return {
				type: condition.type,
				...parseKeyValueMatch( condition ),
			};
		case 'referrer':
			return {
				type: condition.type,
				...parseStringMatch( condition ),
			};
	} //end switch
} //end parseFreeCondition()

function parsePremiumCondition(
	condition: Partial< PremiumCondition > & Pick< PremiumCondition, 'type' >
): PremiumCondition {
	return (
		applyParser< PremiumCondition >(
			`${ condition.type }_condition`,
			condition
		) ?? {
			...condition,
			type: condition.type,
		}
	);
} //end parsePremiumCondition()
