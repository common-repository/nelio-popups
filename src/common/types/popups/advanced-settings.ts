/**
 * Internal dependencies
 */
import type { TimeValue } from '../helpers';

export type AdvancedSettings = {
	readonly isBodyScrollLocked: boolean;
	readonly closeOnEscPressed: boolean;
	readonly closeOnOverlayClicked: boolean;
	readonly popupOpenedCookie: CookieSettings;
};

export type CookieSettings =
	| {
			readonly isEnabled: false;
	  }
	| {
			readonly isEnabled: true;
			readonly name: string;
			readonly isSession: true;
	  }
	| {
			readonly isEnabled: true;
			readonly name: string;
			readonly isSession: false;
			readonly expiration: TimeValue;
	  };
