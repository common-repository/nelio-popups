/**
 * External dependencies
 */
import type { Trigger, FreeTrigger, PremiumTrigger } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { applyParser } from './hooks';
import { DEFAULT_POPUP_METAS } from '../defaults';

export function parseTriggers(
	triggers?: ReadonlyArray< Partial< Trigger > >
): ReadonlyArray< Trigger > {
	triggers = triggers ?? DEFAULT_POPUP_METAS.triggers;
	return triggers.filter( isTrigger ).map( parseTrigger );
} //end parseTriggers()

export const parseTrigger = (
	trigger: Partial< Trigger > & Pick< Trigger, 'type' >
): Trigger =>
	parseFreeTrigger( trigger as FreeTrigger ) ??
	parsePremiumTrigger( trigger as PremiumTrigger );

// =======
// HELPERS
// =======

const isTrigger = (
	t?: Partial< Trigger >
): t is Partial< Trigger > & Pick< Trigger, 'type' > => !! t?.type;

function parseFreeTrigger(
	trigger: Partial< FreeTrigger > & Pick< FreeTrigger, 'type' >
): FreeTrigger {
	switch ( trigger.type ) {
		case 'mouse':
			return {
				type: trigger.type,
				mode: trigger.mode ?? 'click',
				elementSelector: trigger.elementSelector ?? '',
			};

		case 'page-view':
			return {
				type: trigger.type,
			};

		case 'scroll':
			return {
				type: trigger.type,
				value: {
					unit: '%',
					value: 50,
					...trigger.value,
				},
			};

		case 'time':
			return {
				type: trigger.type,
				seconds: trigger.seconds ?? 60,
			};
	} //end switch
} //end parseFreeTrigger()

function parsePremiumTrigger(
	trigger: Partial< PremiumTrigger > & Pick< PremiumTrigger, 'type' >
): PremiumTrigger {
	return (
		applyParser< PremiumTrigger >(
			`${ trigger.type }_trigger`,
			trigger
		) ?? {
			...trigger,
			type: trigger.type,
		}
	);
} //end parsePremiumTrigger()
