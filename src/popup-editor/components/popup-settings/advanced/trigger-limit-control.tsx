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

export const TriggerLimitControl = (): JSX.Element => {
	const Component = applyFilters(
		'nelio_popups.get_trigger_limit_control_component',
		DefaultComponent
	) as () => JSX.Element;
	return <Component />;
};

// ======
// HELPERS
// ======

const DefaultComponent = (): JSX.Element => (
	<>
		<ToggleTriggerLimitControl />
		<DelayControl />
	</>
);

const ToggleTriggerLimitControl = (): JSX.Element => (
	<ToggleControl
		{ ...{ disabled: true } }
		label={ makePremiumLabel(
			_x(
				'Limit the number of times a visitor will see this popup',
				'command',
				'nelio-popups'
			)
		) }
		checked={ false }
		onChange={ noop }
	/>
);

const DelayControl = (): JSX.Element => (
	<ToggleControl
		{ ...{ disabled: true } }
		label={ makePremiumLabel(
			_x( 'Delay consecutive displays', 'command', 'nelio-popups' )
		) }
		checked={ false }
		onChange={ noop }
	/>
);
