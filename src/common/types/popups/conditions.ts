/**
 * Internal dependencies
 */
import type {
	KeyValueMatch,
	PremiumType,
	StringMatch,
	TypeAs,
} from '../helpers';

// ==========
// CONDITIONS
// ==========

export type ConditionGroup = ReadonlyArray< Condition >;

export type Condition = FreeCondition | PremiumCondition;

export type FreeCondition = CookieCondition | ReferrerCondition;

export type PremiumCondition =
	| PremiumType< 'adblock-detection' >
	| PremiumType< 'browser' >
	| PremiumType< 'custom' >
	| PremiumType< 'date' >
	| PremiumType< 'day-of-week' >
	| PremiumType< 'device' >
	| PremiumType< 'geolocation' >
	| PremiumType< 'language' >
	| PremiumType< 'os' >
	| PremiumType< 'query-arg' >
	| PremiumType< 'time' >
	| PremiumType< 'visitor' >
	| PremiumType< 'window-width' >
	| PremiumType< 'woocommerce' >;

export type CookieCondition = TypeAs< 'cookie', KeyValueMatch >;

export type ReferrerCondition = TypeAs< 'referrer', StringMatch >;
