/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { _x } from '@wordpress/i18n';

export type ActiveControlProps = {
	readonly popupId: number;
	readonly initialValue: boolean;
};

export const ActiveControl = ( {
	popupId,
	initialValue,
}: ActiveControlProps ): JSX.Element => {
	const { enabled, enable, isSynching } = useEnabled( popupId, initialValue );
	return (
		<ToggleControl
			{ ...{ disabled: isSynching } }
			label={
				<span className="screen-reader-text">
					{ _x( 'Activate popup', 'command', 'nelio-popups' ) }
				</span>
			}
			checked={ enabled }
			onChange={ ( value ) => void enable( value ) }
		/>
	);
};

// =======
// HELPERS
// =======

const useEnabled = ( popupId: number, initialValue: boolean ) => {
	const [ enabled, setEnabled ] = useState( initialValue );
	const [ isSynching, setSynching ] = useState( false );

	const enable = async ( value: boolean ) => {
		setSynching( true );
		setEnabled( value );
		try {
			await apiFetch( {
				path: `/wp/v2/nelio_popup/${ popupId }`,
				method: 'POST',
				data: { nelio_popups_is_enabled: value },
			} );
		} catch ( error ) {
			setEnabled( enabled );
		}
		setSynching( false );
	};

	return { enabled, enable, isSynching };
};
