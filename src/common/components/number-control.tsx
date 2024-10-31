/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { TextControl } from '@wordpress/components';

export type NumberControlProps = {
	readonly className?: string;
	readonly label?: string;
	readonly help?: string;
	readonly min?: number;
	readonly disabled?: boolean;
	readonly value: number;
	readonly onChange: ( value: number ) => void;
};

export const NumberControl = ( {
	className,
	label,
	help,
	min = 0,
	value,
	disabled,
	onChange,
}: NumberControlProps ): JSX.Element => (
	<TextControl
		className={ className }
		label={ label }
		disabled={ disabled }
		help={ help }
		type="number"
		min={ min }
		value={ value }
		onChange={ ( newValue ) => onChange( parseInt( newValue ) ) }
	/>
);
