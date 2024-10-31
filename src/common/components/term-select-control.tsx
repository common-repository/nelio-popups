/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ItemSelectControl } from './internal/item-select-control';

export type TermSelectControlProps = {
	readonly taxonomy: string;
	readonly value: ReadonlyArray< number >;
	readonly disabled?: boolean;
	readonly isSingle?: boolean;
	readonly onChange: ( value: ReadonlyArray< number > ) => void;
};

export const TermSelectControl = ( {
	taxonomy,
	value,
	disabled,
	isSingle,
	onChange,
}: TermSelectControlProps ): JSX.Element => {
	return (
		<ItemSelectControl
			kind="taxonomy"
			name={ taxonomy }
			value={ value }
			disabled={ disabled }
			isSingle={ isSingle }
			onChange={ onChange }
		/>
	);
};
