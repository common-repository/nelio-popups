/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { sortBy } from 'lodash';
import interpolateComponents from '@automattic/interpolate-components';
import type { MouseTrigger, TriggerComponentProps } from '@nelio/popups/types';

const MOUSE_TRIGGER_MODE_LABELS: Record< MouseTrigger[ 'mode' ], string > = {
	click: _x( 'Click', 'text', 'nelio-popups' ),
	hover: _x( 'Hover', 'text', 'nelio-popups' ),
};

const MOUSE_TRIGGER_MODE_OPTIONS = sortBy(
	Object.keys( MOUSE_TRIGGER_MODE_LABELS ).map(
		( value: MouseTrigger[ 'mode' ] ) => ( {
			value,
			label: MOUSE_TRIGGER_MODE_LABELS[ value ],
		} )
	),
	'label'
);

const MouseTriggerControl = ( {
	trigger,
	onChange,
}: TriggerComponentProps< MouseTrigger > ): JSX.Element => (
	<>
		<SelectControl
			value={ trigger.mode }
			options={ MOUSE_TRIGGER_MODE_OPTIONS }
			onChange={ ( newMode: MouseTrigger[ 'mode' ] ) =>
				onChange( { ...trigger, mode: newMode } )
			}
		/>
		<TextControl
			label={ _x( 'Element', 'text', 'nelio-popups' ) }
			placeholder={ _x( 'CSS Selector', 'text', 'nelio-popups' ) }
			help={ interpolateComponents( {
				mixedString: _x(
					'Type a {{link}}valid CSS selector{{/link}}.',
					'user',
					'nelio-popups'
				),
				components: {
					link: (
						<a // eslint-disable-line
							href="https://www.w3schools.com/cssref/css_selectors.asp"
							target="_blank"
						/>
					),
				},
			} ) }
			value={ trigger.elementSelector }
			onChange={ ( newElementSelector ) =>
				onChange( {
					...trigger,
					elementSelector: newElementSelector,
				} )
			}
		/>
	</>
);

addFilter(
	'nelio_popups.get_mouse_trigger_component',
	'nelio_popups.get_mouse_trigger_component',
	() => MouseTriggerControl
);
