/**
 * External dependencies
 */
import type { PopupMetas } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { parseAdvancedSettings } from './advanced';
import { parseAnimationStyle } from './animation';
import { parseConditionsSettings } from './conditions';
import { parseDisplaySettings } from './display';
import { parseOverlaySettings } from './overlay';
import { parsePopupLocation } from './location';
import { parsePopupSize } from './size';
import { parseSoundStyle } from './sound';
import { parseSpacingStyle } from './spacing';
import { parseTarget } from './target';
import { parseTriggers } from './triggers';
import { parseWrapperSettings } from './wrapper';
import {
	parseAnalyticsViewCount,
	parseAnalyticsLastView,
	parseAnalyticsConversionCount,
	parseAnalyticsLastConversion,
	parseAnalyticsConversionRate,
	parseAnalyticsSettings,
} from './analytics';

import { DEFAULT_POPUP_METAS } from '../defaults';

export function parsePopupMetas( value?: Partial< PopupMetas > ): PopupMetas {
	if ( ! value ) {
		return DEFAULT_POPUP_METAS;
	} //end if

	return {
		advanced: parseAdvancedSettings( value.advanced ),
		animation: parseAnimationStyle( value.animation ),
		conditions: parseConditionsSettings( value.conditions ),
		display: parseDisplaySettings( value.display ),
		location: parsePopupLocation( value.location ),
		overlay: parseOverlaySettings( value.overlay ),
		size: parsePopupSize( value.size ),
		sound: parseSoundStyle( value.sound ),
		spacing: parseSpacingStyle( value.spacing ),
		target: parseTarget( value.target ),
		triggers: parseTriggers( value.triggers ),
		wrapper: parseWrapperSettings( value.wrapper ),
		analytics_view_count: parseAnalyticsViewCount(
			value.analytics_view_count
		),
		analytics_last_view: parseAnalyticsLastView(
			value.analytics_last_view
		),
		analytics_conversion_count: parseAnalyticsConversionCount(
			value.analytics_conversion_count
		),
		analytics_last_conversion: parseAnalyticsLastConversion(
			value.analytics_last_conversion
		),
		analytics_conversion_rate: parseAnalyticsConversionRate(
			value.analytics_conversion_rate
		),
		analytics_settings: parseAnalyticsSettings( value.analytics_settings ),
	};
} //end parsePopupMetas()

export { parseAdvancedSettings } from './advanced';
export { parseAnimationStyle } from './animation';
export { parseCondition, parseConditionGroup } from './conditions';
export { parseDisplaySettings } from './display';
export { parseOverlaySettings } from './overlay';
export { parsePopupLocation } from './location';
export { parsePopupSize } from './size';
export { parseSoundStyle } from './sound';
export {
	parseTarget,
	parseTargetConditionGroup,
	parseTargetCondition,
} from './target';
export { parseTriggers, parseTrigger } from './triggers';
export { parseWrapperSettings } from './wrapper';
export {
	parseAnalyticsViewCount,
	parseAnalyticsLastView,
	parseAnalyticsConversionCount,
	parseAnalyticsLastConversion,
	parseAnalyticsConversionRate,
	parseAnalyticsSettings,
} from './analytics';
