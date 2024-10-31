/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { css } from '@nelio/popups/css';

export const ActiveControl = (): JSX.Element => {
	const [ isEnabled, enable ] = useActivation();
	return (
		<ToggleControl
			className={ TOGGLE_STYLE }
			label={ _x( 'Activate popup', 'command', 'nelio-popups' ) }
			checked={ isEnabled }
			onChange={ ( value ) => void enable( value ) }
		/>
	);
};

// =======
// HELPERS
// =======

const useActivation = () => {
	const name = 'nelio_popups_is_enabled';
	const isEnabled = useSelect( ( select ) =>
		select( 'core/editor' ).getEditedPostAttribute( name )
	);
	const { editPost } = useDispatch( 'core/editor' );

	return [
		!! isEnabled,
		( enabled: boolean ) =>
			editPost( { [ name ]: enabled }, { undoIgnore: true } ),
	] as const;
};

// ======
// STYLES
// ======

const TOGGLE_STYLE = css( {
	margin: '1.5em 0',
} );
