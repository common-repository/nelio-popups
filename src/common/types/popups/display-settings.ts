/**
 * Internal dependencies
 */
import type { TimeValue } from '../helpers';

export type DisplaySettings = {
	readonly disablesOtherPopupOpenings: boolean;
	readonly isDisabledIfOpenedPopups: boolean;
	readonly isDisabledOnMobile: boolean;
	readonly triggerLimit: TriggerLimit;
	readonly zIndex: number;
};

export type TriggerLimit = {
	readonly type: 'unlimited';
	readonly delay: TimeValue;
};
