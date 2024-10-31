/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ItemSelectControl } from './internal/item-select-control';

export type PostSelectControlProps = {
	readonly postType: string;
	readonly value: ReadonlyArray< number >;
	readonly disabled?: boolean;
	readonly isSingle?: boolean;
	readonly onChange: ( value: ReadonlyArray< number > ) => void;
};

export const PostSelectControl = ( {
	postType,
	value,
	disabled,
	isSingle,
	onChange,
}: PostSelectControlProps ): JSX.Element => {
	return (
		<ItemSelectControl
			kind="postType"
			name={ postType }
			value={ value }
			disabled={ disabled }
			isSingle={ isSingle }
			onChange={ onChange }
		/>
	);
};
