/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import {
	Dropdown,
	Button,
	ColorPicker as WpColorPicker,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

// =====
// TYPES
// =====

export type ColorPickerProps = {
	readonly label: string;
	readonly color?: string;
	readonly defaultValue?: string;
	readonly enabledAlpha?: boolean;
	readonly onChange: ( color: string ) => void;
};

type Color = string | Colord | LegacyColor;
type Colord = { readonly hex: string };
type LegacyColor = {
	readonly color: {
		readonly toHex8String: () => string;
	};
};

// ======
// EXPORT
// ======

export const ColorPicker = ( {
	label,
	color,
	defaultValue = '#000000',
	onChange,
}: ColorPickerProps ): JSX.Element => {
	const [ currentColor, setCurrentColor ] = useState( color || defaultValue );
	const onColorChange = ( newColor: Color ) =>
		setCurrentColor( hex( newColor ) );

	useEffect( () => {
		if ( currentColor === color ) {
			return;
		} //end if
		onChange( currentColor );
	}, [ currentColor, color, onChange ] );

	return (
		<Dropdown
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button isLink onClick={ onToggle } aria-expanded={ isOpen }>
					{ label }
				</Button>
			) }
			renderContent={ () => (
				<WpColorPicker
					// NOTE Only use new ColorPicker props instead of legacy ones.
					color={ currentColor }
					onChangeComplete={ onColorChange }
					{ ...{
						enableAlpha: true,
						onChange: onColorChange,
					} }
				/>
			) }
		/>
	);
};

// =======
// HELPERS
// =======

function hex( color: Color ): string {
	if ( isString( color ) ) {
		return color;
	} //end if

	if ( isLegacy( color ) ) {
		return color.color.toHex8String();
	} //end if

	return color.hex;
} //end hex()

const isString = ( color: Color ): color is string => 'string' === typeof color;
const isLegacy = ( color: Color ): color is LegacyColor =>
	! isString( color ) && Object.keys( color ).includes( 'color' );
