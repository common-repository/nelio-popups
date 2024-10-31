/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { css } from '@nelio/popups/css';
import { ColorControl, CSSUnitControl } from '@nelio/popups/components';
import { useWrapperSetting } from '@nelio/popups/hooks';
import type { BorderSettings } from '@nelio/popups/types';

const DEFAULT_BORDER: BorderSettings = {
	isEnabled: true,
	radius: {
		value: 0,
		unit: 'px',
	},
	color: '#FFFFFF',
	width: {
		value: 0,
		unit: 'px',
	},
};

export const BorderControl = (): JSX.Element => {
	const [ border, setBorder ] = useWrapperSetting( 'border' );
	const { isEnabled } = border;
	const onChange = ( isActive: boolean ) =>
		setBorder( { ...DEFAULT_BORDER, isEnabled: isActive } );

	return (
		<>
			<ToggleControl
				label={ _x( 'Add popup border', 'command', 'nelio-popups' ) }
				checked={ isEnabled }
				onChange={ onChange }
			/>
			{ isEnabled && (
				<>
					<ColorControl
						color={ border.color }
						onChange={ ( color ) =>
							setBorder( { ...border, color } )
						}
					/>

					<div className={ SIZE_STYLE }>
						<CSSUnitControl
							label={ _x( 'Radius', 'text', 'nelio-popups' ) }
							min={ 0 }
							value={ border.radius }
							onChange={ ( radius ) =>
								setBorder( { ...border, radius } )
							}
						/>

						<CSSUnitControl
							label={ _x( 'Width', 'text', 'nelio-popups' ) }
							min={ 0 }
							value={ border.width }
							onChange={ ( width ) =>
								setBorder( { ...border, width } )
							}
						/>
					</div>
				</>
			) }
		</>
	);
};

// ======
// STYLES
// ======

const SIZE_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',
	gap: '0.5em',
	marginTop: '1em',
	'> *': {
		width: 'calc(50% - 0.25em)',
	},
} );
