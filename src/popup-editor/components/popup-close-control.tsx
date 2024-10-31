/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { BlockEditProps } from '@wordpress/blocks';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { without } from 'lodash';

const CLOSE_POPUP_CLASSNAME = 'nelio-popup-js-close';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PopupCloseControl = (
	popupCloseBlocks: ReadonlyArray< string >
) =>
	createHigherOrderComponent(
		( WrappedElement ) => ( props ) => {
			if (
				! isBlockEditElement( WrappedElement ) ||
				! areBlockEditProps< { className: string } >( props )
			) {
				return <WrappedElement { ...props } />;
			} //end if

			// Do nothing if it's not one of our specified blocks.
			if ( ! popupCloseBlocks.includes( props.name ) ) {
				return <WrappedElement { ...props } />;
			} //end if

			const { attributes, setAttributes } = props;

			const { className = '' } = attributes;
			const classes = className.split( /\s+/ );

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
							<ToggleControl
								label={ _x(
									'Close popup',
									'command',
									'nelio-popups'
								) }
								help={ _x(
									'Close the popup when clicking this block.',
									'text',
									'nelio-popups'
								) }
								checked={ classes.includes(
									CLOSE_POPUP_CLASSNAME
								) }
								onChange={ ( isChecked ) => {
									const c = without(
										classes,
										CLOSE_POPUP_CLASSNAME
									);
									setAttributes( {
										className: ( isChecked
											? [ CLOSE_POPUP_CLASSNAME, ...c ]
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
		'PopupCloseControl'
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
