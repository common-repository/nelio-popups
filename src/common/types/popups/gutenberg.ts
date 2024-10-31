/**
 * Internal dependencies
 */
import type { AdvancedSettings } from './advanced-settings';
import type { AnalyticsSettings } from './analytics-settings';
import type { DisplaySettings } from './display-settings';
import type {
	AnimationStyle,
	OverlaySettings,
	PopupLocation,
	PopupSize,
	PopupSpacing,
	SoundStyle,
	WrapperSettings,
} from './style';
import type { Target } from './targets';
import type { Trigger } from './triggers';
import type { ConditionGroup } from './conditions';

export type PopupMetas = {
	readonly advanced: AdvancedSettings;
	readonly animation: AnimationStyle;
	readonly conditions: ReadonlyArray< ConditionGroup >;
	readonly display: DisplaySettings;
	readonly location: PopupLocation;
	readonly overlay: OverlaySettings;
	readonly size: PopupSize;
	readonly sound: SoundStyle;
	readonly spacing: PopupSpacing;
	readonly target: Target;
	readonly triggers: ReadonlyArray< Trigger >;
	readonly wrapper: WrapperSettings;
	// eslint-disable-next-line camelcase
	readonly analytics_view_count: number;
	// eslint-disable-next-line camelcase
	readonly analytics_last_view: string;
	// eslint-disable-next-line camelcase
	readonly analytics_conversion_count: number;
	// eslint-disable-next-line camelcase
	readonly analytics_last_conversion: string;
	// eslint-disable-next-line camelcase
	readonly analytics_conversion_rate: number;
	// eslint-disable-next-line camelcase
	readonly analytics_settings: AnalyticsSettings;
};

export type PrefixedPopupMetas = {
	[ A in keyof PopupMetas as `nelio_popups_${ keyof PopupMetas }` ]: PopupMetas[ A ];
};
