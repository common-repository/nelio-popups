/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { _x } from '@wordpress/i18n';

export const TitleControl = (): JSX.Element => {
	const [ title, setTitle ] = usePopupTitle();

	return (
		<TextControl
			label={ _x( 'Title', 'text', 'nelio-popups' ) }
			value={ title }
			onChange={ ( newTitle ) => void setTitle( newTitle ) }
		/>
	);
};

const usePopupTitle = () => {
	const title = useSelect( ( select ) =>
		select( 'core/editor' ).getEditedPostAttribute( 'title' )
	);
	const { editPost } = useDispatch( 'core/editor' );

	return [
		( title as string ) || '',
		( newTitle: string ) =>
			editPost( { title: newTitle }, { undoIgnore: true } ),
	] as const;
};
