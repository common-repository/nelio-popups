/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';

/**
 * External dependencies
 */
import { cx, css } from '@nelio/popups/css';

export type SettingLabelProps = {
	readonly className?: string;
	readonly label?: string;
};

export const SettingLabel = ( {
	className,
	label,
}: SettingLabelProps ): JSX.Element => (
	<p className={ cx( className, LABEL_STYLE ) }>{ label }</p>
);

// ======
// STYLES
// ======

const LABEL_STYLE = css( {
	color: '#757575',
	paddingTop: '1em',
} );
