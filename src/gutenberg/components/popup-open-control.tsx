/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { BlockEditProps } from '@wordpress/blocks';
import { PanelBody, PanelRow } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { ItemSelectControl } from '@nelio/popups/components/internal/item-select-control';
import { OPEN_POPUP_CLASSNAME } from '@nelio/popups/utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PopupOpenControl = ( popupOpenBlocks: ReadonlyArray< string > ) =>
	createHigherOrderComponent(
		( WrappedElement ) => ( props ) => {
			if (
				! isBlockEditElement( WrappedElement ) ||
				! areBlockEditProps< { className: string } >( props )
			) {
				return <WrappedElement { ...props } />;
			} //end if

			// Do nothing if it's not one of our specified blocks.
			if ( ! popupOpenBlocks.includes( props.name ) ) {
				return <WrappedElement { ...props } />;
			} //end if

			const { attributes, setAttributes } = props;

			const { className = '' } = attributes;
			const classes = className.split( /\s+/ );
			const values = classes
				.filter( ( cl ) => cl.startsWith( OPEN_POPUP_CLASSNAME ) )
				.map( ( cl ) => parseInt( cl.replace( /^\D+/g, '' ) ) );

			return (
				<>
					<WrappedElement { ...props } />
					<InspectorControls>
						<PanelBody
							title={ _x(
								'Popup Controls',
								'text',
								'nelio-popups'
							) }
							initialOpen={ true }
						>
							<PanelRow>
								{ _x(
									'Opens a popup when clicking this block.',
									'text',
									'nelio-popups'
								) }
							</PanelRow>
							<ItemSelectControl
								kind="postType"
								name="nelio_popup"
								placeholder={ _x(
									'Select a popup…',
									'command',
									'nelio-popups'
								) }
								value={ values.length ? [ values[ 0 ] ] : [] }
								isSingle={ true }
								onChange={ ( value ) => {
									const c = classes.filter(
										( cl ) =>
											! cl.startsWith(
												OPEN_POPUP_CLASSNAME
											)
									);
									setAttributes( {
										className: ( value.length
											? [
													`${ OPEN_POPUP_CLASSNAME }-${ value[ 0 ] }`,
													...c,
											  ]
											: c
										).join( ' ' ),
									} );
								} }
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		},
		'PopupOpenControl'
	);

type BE = ( props: BEP< Record< string, unknown > > ) => JSX.Element;
type BEP< T extends Record< string, unknown > > = BlockEditProps< T > & {
	name: string;
};

const isBlockEditElement = ( el: unknown ): el is BE => !! el;

function areBlockEditProps< T extends Record< string, unknown > >(
	props: unknown
): props is BEP< T > {
	return !! props;
} //end areBlockEditProps()
