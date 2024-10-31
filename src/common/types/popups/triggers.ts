/**
 * Internal dependencies
 */
import type { CssSizeUnit, PremiumType } from '../helpers';

export type Trigger = FreeTrigger | PremiumTrigger;

export type FreeTrigger =
	| MouseTrigger
	| PageViewTrigger
	| ScrollTrigger
	| TimeTrigger;

export type PremiumTrigger =
	| PremiumType< 'exit-intent' >
	| PremiumType< 'html-element' >
	| PremiumType< 'inactivity' >
	| PremiumType< 'manual' >
	| PremiumType< 'time-on-site' >
	| PremiumType< 'woocommerce' >;

export type MouseTrigger = {
	readonly type: 'mouse';
	readonly mode: 'click' | 'hover';
	readonly elementSelector: string;
};

export type PageViewTrigger = {
	readonly type: 'page-view';
};

export type ScrollTrigger = {
	readonly type: 'scroll';
	readonly value: CssSizeUnit;
};

export type TimeTrigger = {
	readonly type: 'time';
	readonly seconds: number;
};
