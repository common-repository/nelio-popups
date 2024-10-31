/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { ExternalLink } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { applyFilters } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

/**
 * External dependencies
 */
import interpolateComponents from '@automattic/interpolate-components';
import { isPremium } from '@nelio/popups/utils';

export const PopupAnalytics = (): JSX.Element => {
	const AnalyticsComponent = applyFilters(
		'nelio_popups.get_analytics_component',
		() => null
	) as () => JSX.Element;

	return (
		<PluginDocumentSettingPanel
			name="nelio-popups-analytics-panel"
			className="nelio-popups-analytics-panel"
			opened="false"
			title={ _x( 'Analytics', 'text', 'nelio-popups' ) }
		>
			{ isPremium() ? (
				<AnalyticsComponent />
			) : (
				<p>
					{ interpolateComponents( {
						mixedString: _x(
							'To unlock analytics, purchase {{premium}}the premium version{{/premium}} of Nelio Popups.',
							'user',
							'nelio-popups-premium'
						),
						components: {
							premium: (
								<ExternalLink
									href={ addQueryArgs(
										_x(
											'https://neliosoftware.com/popups/',
											'text',
											'nelio-popups-premium'
										),
										{
											utm_source: 'nelio-popups',
											utm_medium: 'plugin',
											utm_campaign: 'premium',
											utm_content: 'plugin-analytics',
										}
									) }
								/>
							),
						},
					} ) }
				</p>
			) }
		</PluginDocumentSettingPanel>
	);
};
