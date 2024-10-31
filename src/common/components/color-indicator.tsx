/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';

/**
 * External dependencies
 */
import { css } from '@nelio/popups/css';

export type ColorIndicatorProps = {
	readonly colorValue?: string;
};

export const ColorIndicator = ( {
	colorValue,
}: ColorIndicatorProps ): JSX.Element => (
	<span
		className={ INDICATOR_STYLE }
		style={ { background: colorValue ?? 'transparent' } }
	/>
);

const INDICATOR_STYLE = css( {
	border: '1px solid #dadada',
	display: 'inline-block',
	height: 16,
	marginLeft: '0.8rem',
	position: 'relative',
	width: 25,

	'&::before': {
		backgroundImage:
			'linear-gradient(45deg, #ddd 25%, transparent 0),linear-gradient(-45deg, #ddd 25%, transparent 0),linear-gradient(45deg, transparent 75%, #ddd 0),linear-gradient(-45deg, transparent 75%, #ddd 0)',
		backgroundSize: '10px 10px',
		backgroundPosition: '0 0,0 5px,5px -5px,-5px 0',
		content: '""',
		display: 'block',
		height: '100%',
		left: 0,
		position: 'absolute',
		top: 0,
		width: '100%',
		zIndex: -1,
	},
} );
