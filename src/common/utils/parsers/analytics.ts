/**
 * External dependencies
 */
import type { AnalyticsSettings } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { DEFAULT_POPUP_METAS } from '../defaults';

export function parseAnalyticsViewCount( value?: number ): number {
	return value ?? DEFAULT_POPUP_METAS.analytics_view_count;
} //end parseAnalyticsViewCount()

export function parseAnalyticsLastView( value?: string ): string {
	return value ?? DEFAULT_POPUP_METAS.analytics_last_view;
} //end parseAnalyticsLastView()

export function parseAnalyticsConversionCount( value?: number ): number {
	return value ?? DEFAULT_POPUP_METAS.analytics_conversion_count;
} //end parseAnalyticsConversionCount()

export function parseAnalyticsLastConversion( value?: string ): string {
	return value ?? DEFAULT_POPUP_METAS.analytics_last_conversion;
} //end parseAnalyticsLastConversion()

export function parseAnalyticsConversionRate( value?: number ): number {
	return value ?? DEFAULT_POPUP_METAS.analytics_conversion_rate;
} //end parseAnalyticsConversionRate()

export function parseAnalyticsSettings(
	value?: Partial< AnalyticsSettings >
): AnalyticsSettings {
	if ( ! value ) {
		return DEFAULT_POPUP_METAS.analytics_settings;
	} //end if

	return {
		trackClicksOnButtons:
			value.trackClicksOnButtons === undefined
				? DEFAULT_POPUP_METAS.analytics_settings.trackClicksOnButtons
				: value.trackClicksOnButtons,
		trackClicksOnLinks:
			value.trackClicksOnLinks === undefined
				? DEFAULT_POPUP_METAS.analytics_settings.trackClicksOnLinks
				: value.trackClicksOnLinks,
		trackFormSubmissions:
			value.trackFormSubmissions === undefined
				? DEFAULT_POPUP_METAS.analytics_settings.trackFormSubmissions
				: value.trackFormSubmissions,
	};
} //end parseAnalyticsConversionRate()
