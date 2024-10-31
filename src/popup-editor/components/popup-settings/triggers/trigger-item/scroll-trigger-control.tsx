/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';

/**
 * External dependencies
 */
import { CSSUnitControl } from '@nelio/popups/components';

import type { ScrollTrigger, TriggerComponentProps } from '@nelio/popups/types';

const ScrollTriggerControl = ( {
	trigger,
	onChange,
}: TriggerComponentProps< ScrollTrigger > ): JSX.Element => (
	<CSSUnitControl
		min={ 0 }
		value={ trigger.value }
		onChange={ ( newValue ) =>
			onChange( {
				...trigger,
				value: newValue,
			} )
		}
	/>
);

addFilter(
	'nelio_popups.get_scroll_trigger_component',
	'nelio_popups.get_scroll_trigger_component',
	() => ScrollTriggerControl
);
