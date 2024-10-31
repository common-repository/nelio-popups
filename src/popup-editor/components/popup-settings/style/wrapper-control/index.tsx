/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';

/**
 * External dependencies
 */
import { Divider } from '@nelio/popups/components';

/**
 * Internal dependencies
 */
import { BorderControl } from './border-control';
import { CloseButtonControl } from './close-button-control';
import { ShadowControl } from './shadow-control';

export const WrapperControl = (): JSX.Element => (
	<>
		<CloseButtonControl />
		<Divider />
		<BorderControl />
		<Divider />
		<ShadowControl />
	</>
);
