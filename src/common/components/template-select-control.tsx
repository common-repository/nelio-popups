/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { SelectControl } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';
import { _x } from '@wordpress/i18n';

export type TemplateSelectControlProps = {
	readonly postType: string;
	readonly value?: string;
	readonly onChange: ( value: string ) => void;
};

type Template = {
	readonly slug: string;
	readonly title: {
		readonly rendered: string;
	};
};

export const TemplateSelectControl = ( {
	postType,
	value,
	onChange,
}: TemplateSelectControlProps ): JSX.Element => {
	const [ templates, setTemplates ] = useState<
		ReadonlyArray< Template > | undefined
	>();

	useEffect( () => {
		void ( async () => {
			try {
				const response = await apiFetch< ReadonlyArray< Template > >( {
					path: addQueryArgs( '/wp/v2/templates', {
						post_type: postType,
					} ),
				} );
				setTemplates( response );
			} catch ( e ) {
				setTemplates( [] );
			} //end try
		} )();
	}, [ postType ] );

	if ( ! templates ) {
		return <p>{ _x( 'Loading templates…', 'text', 'nelio-popups' ) }</p>;
	} //end if

	if ( ! templates.length ) {
		return (
			<p>{ _x( 'No templates available', 'text', 'nelio-popups' ) }</p>
		);
	} //end if

	const options = templates.map( ( t ) => ( {
		label: t.title.rendered,
		value: t.slug,
	} ) );

	return (
		<SelectControl
			value={ value }
			placeholder={ _x( 'Select a template…', 'user', 'nelio-popups' ) }
			options={ options }
			onChange={ onChange }
		/>
	);
};
