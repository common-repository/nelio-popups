/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { PostSelectControl } from '@nelio/popups/components';
import { usePostMeta } from '@nelio/popups/hooks';

const DEFAULT_OPTIONS = [
	{
		value: 'none',
		label: _x( 'None', 'text (popup)', 'nelio-popups' ),
	},
	{
		value: 'auto',
		label: _x( 'Auto Selection', 'text (popup)', 'nelio-popups' ),
	},
	{
		value: 'manual',
		label: _x( 'Manual Selection', 'text (popup)', 'nelio-popups' ),
	},
];

export type PopupOpenPanelProps = {
	readonly postTypes: ReadonlyArray< string >;
};
export const PopupOpenPanel = ( {
	postTypes,
}: PopupOpenPanelProps ): JSX.Element | null => {
	const postType = useSelect< string >( ( select ) =>
		select( 'core/editor' ).getCurrentPostType()
	);
	const [ value, setValue ] = usePostMeta(
		'nelio_popups_active_popup',
		'auto'
	);

	if ( ! postTypes.includes( postType ) ) {
		return null;
	} //end if

	const isManual = 'none' !== value && 'auto' !== value;
	const popupIds = unstringify( value );

	return (
		<PluginDocumentSettingPanel
			name="nelio-popups-open-panel"
			className="nelio-popups-open-panel"
			title={ _x( 'Nelio Popups', 'text', 'nelio-popups' ) }
		>
			<SelectControl
				label={ _x( 'Active popups', 'text', 'nelio-popups' ) }
				value={ isManual ? 'manual' : value }
				options={ DEFAULT_OPTIONS }
				onChange={ setValue }
			/>
			{ isManual && (
				<PostSelectControl
					postType="nelio_popup"
					value={ popupIds }
					onChange={ ( ids: ReadonlyArray< number > ) =>
						setValue( stringify( ids ) )
					}
				/>
			) }
		</PluginDocumentSettingPanel>
	);
};

// =======
// HELPERS
// =======

const stringify = ( value: ReadonlyArray< number > ): string =>
	value.join( ',' ) || 'manual';

const unstringify = ( value: string ): ReadonlyArray< number > =>
	value
		.split( ',' )
		.map( ( x ) => parseInt( x ) || 0 )
		.filter( ( x ) => x > 0 );
