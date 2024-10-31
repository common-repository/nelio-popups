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
import type { ColorControlProps } from './color-control';

export type TwoColorControlProps = {
	readonly label?: string;
	readonly background: Omit< ColorControlProps, 'label' >;
	readonly foreground: Omit< ColorControlProps, 'label' >;
};

export const TwoColorControl = ( {
	label,
	foreground,
	background,
}: TwoColorControlProps ): JSX.Element => {
	const instanceId = useInstanceId( TwoColorControl );

	return (
		<BaseControl id={ `nelio-popups-color-control-${ instanceId }` }>
			<Label
				label={ label ?? _x( 'Color', 'text', 'nelio-popups' ) }
				foreground={ foreground.color }
				background={ background.color }
			/>
			<div className={ ACTIONS_STYLE }>
				<ColorPicker
					label={
						foreground.setLabel ||
						_x( 'Select Color', 'command', 'nelio-popups' )
					}
					color={ foreground.color }
					onChange={ foreground.onChange }
				/>

				<ColorPicker
					label={
						background.setLabel ||
						_x( 'Select Background', 'command', 'nelio-popups' )
					}
					color={ background.color }
					onChange={ background.onChange }
				/>
			</div>
		</BaseControl>
	);
};

const Label = ( {
	label,
	foreground,
	background,
}: {
	label: string;
	foreground?: Color;
	background?: Color;
} ): JSX.Element => {
	return (
		<div>
			<span>{ label }</span>
			{ foreground && (
				<span
					title={ _x( 'Foreground color', 'text', 'nelio-popups' ) }
				>
					<ColorIndicator colorValue={ foreground } />
				</span>
			) }
			{ background && (
				<span
					title={ _x( 'Background color', 'text', 'nelio-popups' ) }
				>
					<ColorIndicator colorValue={ background } />
				</span>
			) }
		</div>
	);
};

// ======
// STYLES
// ======

const ACTIONS_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',
	gap: '1em',
	justifyContent: 'flex-end',
	marginTop: '0.5em',
} );
