/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { NumberControl } from '@nelio/popups/components';

import type { TimeTrigger, TriggerComponentProps } from '@nelio/popups/types';

const TimeTriggerControl = ( {
	trigger,
	onChange,
}: TriggerComponentProps< TimeTrigger > ): JSX.Element => (
	<NumberControl
		label={ _x( 'Delay in seconds', 'text', 'nelio-popups' ) }
		min={ 0 }
		value={ trigger.seconds }
		onChange={ ( newSeconds ) =>
			onChange( {
				...trigger,
				seconds: newSeconds,
			} )
		}
	/>
);

addFilter(
	'nelio_popups.get_time_trigger_component',
	'nelio_popups.get_time_trigger_component',
	() => TimeTriggerControl
);
