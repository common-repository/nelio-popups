/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { NumberControl } from '@nelio/popups/components';
import { useDisplaySetting } from '@nelio/popups/hooks';

export const ZIndexControl = (): JSX.Element => {
	const [ zIndex, setZIndex ] = useDisplaySetting( 'zIndex' );
	return (
		<NumberControl
			label={ _x( 'Z-Index', 'text', 'nelio-popups' ) }
			value={ zIndex }
			onChange={ setZIndex }
		/>
	);
};
