/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { noop } from 'lodash';
import { makePremiumLabel } from '@nelio/popups/utils';

export const CookieControl = (): JSX.Element => {
	const Component = applyFilters(
		'nelio_popups.get_custom_open_cookie_control_component',
		DefaultComponent
	) as () => JSX.Element;
	return <Component />;
};

// =======
// HELPERS
// =======

const DefaultComponent = (): JSX.Element => (
	<ToggleControl
		{ ...{ disabled: true } }
		label={ makePremiumLabel(
			_x(
				'Create custom cookie when popup opens',
				'command',
				'nelio-popups'
			)
		) }
		checked={ false }
		onChange={ noop }
	/>
);
