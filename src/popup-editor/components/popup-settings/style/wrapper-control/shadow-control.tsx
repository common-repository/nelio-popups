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
import type { ShadowSettings } from '@nelio/popups/types';

const DEFAULT_SHADOW: ShadowSettings = {
	isEnabled: true,
	blur: {
		value: 15,
		unit: 'px',
	},
	color: '#00000088',
	offsetX: {
		value: 0,
		unit: 'px',
	},
	offsetY: {
		value: 0,
		unit: 'px',
	},
};

export const ShadowControl = (): JSX.Element => (
	<>
		<ToggleShadowControl />
		<ShadowColorControl />
		<BlurControl />
		<OffsetControl />
	</>
);

// =======
// HELPERS
// =======

const ToggleShadowControl = () => {
	const [ shadow, setShadow ] = useWrapperSetting( 'shadow' );
	const { isEnabled } = shadow;

	return (
		<ToggleControl
			label={ _x( 'Add popup shadow', 'command', 'nelio-popups' ) }
			checked={ isEnabled }
			onChange={ ( isActive ) =>
				setShadow( { ...DEFAULT_SHADOW, isEnabled: isActive } )
			}
		/>
	);
};

const ShadowColorControl = () => {
	const [ shadow, setShadow ] = useWrapperSetting( 'shadow' );
	const { isEnabled } = shadow;

	if ( ! isEnabled ) {
		return null;
	} //end if

	return (
		<ColorControl
			color={ shadow.color }
			onChange={ ( newColor ) =>
				setShadow( {
					...shadow,
					color: newColor,
				} )
			}
		/>
	);
};

const BlurControl = () => {
	const [ shadow, setShadow ] = useWrapperSetting( 'shadow' );
	const { isEnabled } = shadow;

	if ( ! isEnabled ) {
		return null;
	} //end if

	return (
		<CSSUnitControl
			label={ _x( 'Shadow blur', 'text', 'nelio-popups' ) }
			min={ 0 }
			value={ shadow.blur }
			onChange={ ( newShadowBlur ) =>
				setShadow( {
					...shadow,
					blur: newShadowBlur,
				} )
			}
		/>
	);
};

const OffsetControl = () => {
	const [ shadow, setShadow ] = useWrapperSetting( 'shadow' );
	const { isEnabled } = shadow;

	if ( ! isEnabled ) {
		return null;
	} //end if

	return (
		<div className={ OFFSET_STYLE }>
			<CSSUnitControl
				label={ _x( 'Horizontal offset', 'text', 'nelio-popups' ) }
				value={ shadow.offsetX }
				onChange={ ( newHorizontalOffset ) =>
					setShadow( {
						...shadow,
						offsetX: newHorizontalOffset,
					} )
				}
			/>

			<CSSUnitControl
				label={ _x( 'Vertical offset', 'text', 'nelio-popups' ) }
				value={ shadow.offsetY }
				onChange={ ( newVerticalOffset ) =>
					setShadow( {
						...shadow,
						offsetY: newVerticalOffset,
					} )
				}
			/>
		</div>
	);
};

// ======
// STYLES
// ======

const OFFSET_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',
	gap: '0.5em',
	marginBottom: '0.5em',
} );
