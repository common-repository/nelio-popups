/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { makePremiumLabel } from '@nelio/popups/utils';
import { noop } from 'lodash';

export const SoundControl = (): JSX.Element => (
	<SelectControl
		label={ makePremiumLabel( _x( 'Sound', 'text', 'nelio-popups' ) ) }
		value={ false }
		disabled={ true }
		options={ [
			{
				value: 'none',
				label: _x( 'None', 'text (sound)', 'nelio-popups' ),
			},
		] }
		onChange={ noop }
	/>
);
