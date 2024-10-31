/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { sortBy } from 'lodash';
import { usePopupMeta } from '@nelio/popups/hooks';
import type { PopupLocation } from '@nelio/popups/types';

const LOCATION_LABELS: Record< PopupLocation, string > = {
	center: _x( 'Center', 'text', 'nelio-popups' ),
	top: _x( 'Top', 'text', 'nelio-popups' ),
	'top-left': _x( 'Top Left', 'text', 'nelio-popups' ),
	'top-right': _x( 'Top Right', 'text', 'nelio-popups' ),
	bottom: _x( 'Bottom', 'text', 'nelio-popups' ),
	'bottom-left': _x( 'Bottom Left', 'text', 'nelio-popups' ),
	'bottom-right': _x( 'Bottom Right', 'text', 'nelio-popups' ),
	left: _x( 'Left', 'text', 'nelio-popups' ),
	right: _x( 'Right', 'text', 'nelio-popups' ),
};

const LOCATION_OPTIONS = sortBy(
	Object.keys( LOCATION_LABELS ).map( ( value: PopupLocation ) => ( {
		value,
		label: LOCATION_LABELS[ value ],
	} ) ),
	'label'
);

export const LocationControl = (): JSX.Element | null => {
	const [ size ] = usePopupMeta( 'size' );
	const [ location, setLocation ] = usePopupMeta( 'location' );

	if ( 'fullscreen' === size.type ) {
		return null;
	} //end if

	return (
		<SelectControl
			label={ _x( 'Location', 'text', 'nelio-popups' ) }
			value={ location }
			options={ LOCATION_OPTIONS }
			onChange={ setLocation }
		/>
	);
};
