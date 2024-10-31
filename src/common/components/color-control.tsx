/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { css } from '@nelio/popups/css';
import type { Color } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { ColorIndicator } from './color-indicator';
import { ColorPicker } from './color-picker';

export type ColorControlProps = {
	readonly label?: string;
	readonly setLabel?: string;
	readonly color?: Color;
	readonly onChange: ( color: Color ) => void;
};

export const ColorControl = ( props: ColorControlProps ): JSX.Element => {
	const { label, setLabel, color, onChange } = props;
	const instanceId = useInstanceId( ColorControl );

	if ( ! label ) {
		return (
			<div className={ WRAPPER_STYLE }>
				<ColorPicker
					label={
						setLabel ||
						_x( 'Select Color', 'command', 'nelio-popups' )
					}
					color={ color }
					onChange={ onChange }
				/>
				{ color && <ColorIndicator colorValue={ color } /> }
			</div>
		);
	} //end if

	return (
		<BaseControl
			id={ `nelio-popups-color-control-${ instanceId }` }
			label={ <Label label={ label } color={ color } /> }
		>
			<div>
				<ColorPicker
					label={
						setLabel ||
						_x( 'Select Color', 'command', 'nelio-popups' )
					}
					color={ color }
					onChange={ onChange }
				/>
			</div>
		</BaseControl>
	);
};

const Label = ( {
	label,
	color,
}: {
	label: string;
	color?: Color;
} ): JSX.Element => {
	if ( ! color ) {
		return <span>{ label }</span>;
	} //end if

	return (
		<div className={ WRAPPER_STYLE }>
			<span>{ label }</span>
			<ColorIndicator colorValue={ color } />
		</div>
	);
};

// ======
// STYLES
// ======

const WRAPPER_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-end',
} );
