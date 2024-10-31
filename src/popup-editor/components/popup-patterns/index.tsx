/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { cloneBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import '@wordpress/block-editor';
import { _x, sprintf } from '@wordpress/i18n';
import type { BlockInstance } from '@wordpress/blocks';

/**
 * External dependencies
 */
import { map } from 'lodash';
import type { PopupPattern } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import BlockPatternList from './block-pattern-list';
import { getPopupPatterns } from './get-popup-patterns';

export const PopupPatterns = (): JSX.Element => {
	const { createSuccessNotice } = useDispatch( 'core/notices' );
	const { replaceBlocks } = useDispatch( 'core/block-editor' );

	const clientIds = useSelect( ( select ) =>
		map(
			select( 'core/block-editor' ).getBlocks(),
			( block ) => block.clientId
		)
	);

	const onClickPattern = (
		pattern: PopupPattern,
		blocks: ReadonlyArray< BlockInstance >
	) => {
		void replaceBlocks(
			clientIds,
			map( blocks, ( block ) => cloneBlock( block ) )
		);
		void createSuccessNotice(
			sprintf(
				/* translators: %s: block pattern title. */
				_x( 'Popup pattern "%s" inserted.', 'text', 'nelio-popups' ),
				pattern.title
			),
			{ type: 'snackbar' }
		);
	};

	return (
		<PluginDocumentSettingPanel
			name="nelio-popups-patterns-panel"
			className="nelio-popups-patterns-panel"
			opened="false"
			title={ _x( 'Patterns', 'text', 'nelio-popups' ) }
		>
			<BlockPatternList
				blockPatterns={ getPopupPatterns() }
				onClickPattern={ onClickPattern }
			/>
		</PluginDocumentSettingPanel>
	);
};
