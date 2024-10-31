/**
 * WordPress dependencies
 */
import { registerBlockStyle } from '@wordpress/blocks';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

registerBlockStyle( 'core/media-text', {
	name: 'nelio-popups-cover-image',
	label: _x( 'Cover Image (Nelio Popups)', 'text', 'nelio-popups' ),
} );
