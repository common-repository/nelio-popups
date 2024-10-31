/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { ColorControl } from '@nelio/popups/components';
import { usePopupMeta } from '@nelio/popups/hooks';

export const OverlayControl = (): JSX.Element => {
	const [ overlay, setOverlay ] = usePopupMeta( 'overlay' );
	const { isEnabled } = overlay;
	const onChange = ( isChecked: boolean ) =>
		setOverlay( { color: '#000000cc', isEnabled: isChecked } );

	return (
		<>
			<ToggleControl
				label={ _x(
					'Add overlay behind popup',
					'command',
					'nelio-popups'
				) }
				checked={ isEnabled }
				onChange={ onChange }
			/>
			{ isEnabled && (
				<ColorControl
					color={ overlay.color }
					onChange={ ( newColor ) =>
						setOverlay( {
							...overlay,
							color: newColor,
						} )
					}
				/>
			) }
		</>
	);
};
