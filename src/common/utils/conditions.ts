/**
 * External dependencies
 */
import type { Condition } from '@nelio/popups/types';

const MULTI_CONDITIONS: ReadonlyArray< Condition[ 'type' ] > = [
	'cookie',
	'woocommerce',
];

export const isMultiCondition = ( c: Condition[ 'type' ] ): boolean =>
	MULTI_CONDITIONS.includes( c );
