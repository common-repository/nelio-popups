/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export const TrashControl = (): JSX.Element | null => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { isNew, popupId } = useSelect( ( select ) => {
		const { isEditedPostNew, getCurrentPostId } = select( 'core/editor' );
		return {
			isNew: !! isEditedPostNew(),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			popupId: getCurrentPostId(),
		};
	} );

	const { trashPost } = useDispatch( 'core/editor' );

	if ( isNew || ! popupId ) {
		return null;
	} //end if

	const onClick = () => void trashPost( popupId, 'nelio_popup' );

	return (
		<Button
			className="editor-post-trash"
			isDestructive
			isSecondary
			onClick={ onClick }
		>
			{ __( 'Move to trash' ) }
		</Button>
	);
};
