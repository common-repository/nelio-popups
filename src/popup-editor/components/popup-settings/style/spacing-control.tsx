/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { useState } from '@wordpress/element';
import { BaseControl, Button, Tooltip } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { _x } from '@wordpress/i18n';
import { link, linkOff } from '@wordpress/icons';

/**
 * External dependencies
 */
import { isEqual } from 'lodash';
import { CSSUnitControl } from '@nelio/popups/components';
import { css, cx } from '@nelio/popups/css';
import { usePopupMeta } from '@nelio/popups/hooks';
import type { FullCssSizeUnit } from '@nelio/popups/types';

type Side = 'all' | 'none' | keyof FullCssSizeUnit;

export const SpacingControl = (): JSX.Element => {
	const [ spacing, setSpacing ] = usePopupMeta( 'spacing' );
	const { margin, padding } = spacing;

	return (
		<>
			<DimensionBoxControl
				label={ _x( 'Padding', 'command', 'nelio-popups' ) }
				dimensions={ padding }
				onChange={ ( newPadding ) =>
					setSpacing( {
						...spacing,
						padding: newPadding,
					} )
				}
			/>
			<DimensionBoxControl
				label={ _x( 'Margin', 'command', 'nelio-popups' ) }
				dimensions={ margin }
				onChange={ ( newMargin ) =>
					setSpacing( {
						...spacing,
						margin: newMargin,
					} )
				}
			/>
		</>
	);
};

type DimensionBoxControl = {
	readonly label: string;
	readonly dimensions: FullCssSizeUnit;
	readonly onChange: ( dimensions: FullCssSizeUnit ) => void;
};

const SIDE_LABELS: ReadonlyArray< {
	key: keyof FullCssSizeUnit;
	title: string;
} > = [
	{ key: 'top', title: _x( 'Top', 'text', 'nelio-popups' ) },
	{ key: 'right', title: _x( 'Right', 'text', 'nelio-popups' ) },
	{ key: 'bottom', title: _x( 'Bottom', 'text', 'nelio-popups' ) },
	{ key: 'left', title: _x( 'Left', 'text', 'nelio-popups' ) },
];

const DimensionBoxControl = ( props: DimensionBoxControl ): JSX.Element => {
	const { label, dimensions, onChange } = props;
	const instanceId = useInstanceId( DimensionBoxControl );
	const [ side, setSide ] = useState< Side >( 'none' );
	const [ isSingle, setIsSingle ] = useState( shouldBeSingle( dimensions ) );

	const toggle = () => {
		setIsSingle( ! isSingle );
		if ( ! isSingle ) {
			onChange( {
				top: dimensions.top,
				bottom: dimensions.top,
				left: dimensions.top,
				right: dimensions.top,
			} );
		} //end if
	};

	if ( isSingle ) {
		return (
			<BaseControl
				id={ `nelio-popups-dimension-control-${ instanceId }` }
				className={ FULL_WIDTH_LABEL }
				label={
					<Label
						label={ label }
						side={ side }
						toggle={ toggle }
						isSingle={ isSingle }
					/>
				}
			>
				<CSSUnitControl
					min={ 0 }
					value={ dimensions.top }
					onBlur={ () => setSide( 'none' ) }
					onFocus={ () => setSide( 'all' ) }
					onChange={ ( value ) =>
						onChange( {
							top: value,
							bottom: value,
							left: value,
							right: value,
						} )
					}
				/>
			</BaseControl>
		);
	} //end if

	return (
		<BaseControl
			id={ `nelio-popups-dimension-control-${ instanceId }` }
			className={ FULL_WIDTH_LABEL }
			label={
				<Label
					label={ label }
					side={ side }
					toggle={ toggle }
					isSingle={ isSingle }
				/>
			}
		>
			<div className={ WRAPPER_STYLE }>
				{ SIDE_LABELS.map( ( { key, title } ) => (
					<Tooltip key={ key } text={ title } position="top center">
						<div>
							<CSSUnitControl
								min={ 0 }
								value={ dimensions[ key ] }
								onBlur={ () => setSide( 'none' ) }
								onFocus={ () => setSide( key ) }
								onChange={ ( value ) =>
									onChange( {
										...dimensions,
										[ key ]: value,
									} )
								}
							/>
						</div>
					</Tooltip>
				) ) }
			</div>
		</BaseControl>
	);
};

const SideIcon = ( { side }: { side: Side } ): JSX.Element => {
	const isSide = ( s: Side ) => 'all' === side || side === s;
	const setOpacity = ( className: string, isFocused: boolean ) =>
		cx( className, css( { opacity: isFocused ? 1 : 0.3 } ) );

	return (
		<div>
			<span className={ ROOT }>
				<span className={ VIEWBOX }>
					<span
						className={ setOpacity( TOP_SIDE, isSide( 'top' ) ) }
					></span>
					<span
						className={ setOpacity(
							RIGHT_SIDE,
							isSide( 'right' )
						) }
					></span>
					<span
						className={ setOpacity(
							BOTTOM_SIDE,
							isSide( 'bottom' )
						) }
					></span>
					<span
						className={ setOpacity( LEFT_SIDE, isSide( 'left' ) ) }
					></span>
				</span>
			</span>
		</div>
	);
};

const Label = ( {
	label,
	side,
	isSingle,
	toggle,
}: {
	label: string;
	side: Side;
	isSingle: boolean;
	toggle: () => void;
} ): JSX.Element => {
	const buttonLabel = isSingle
		? _x( 'Unlink Sides', 'command (dims setting)', 'nelio-popups' )
		: _x( 'Link Sides', 'command (dims setting)', 'nelio-popups' );

	return (
		<div className={ LABEL_STYLE }>
			<span>{ label }</span>
			<SideIcon side={ side } />
			<div className={ css( { flexGrow: 1 } ) }></div>
			<Tooltip text={ buttonLabel }>
				<div>
					<Button
						isPrimary={ isSingle }
						isSecondary={ ! isSingle }
						isSmall
						icon={ isSingle ? link : linkOff }
						iconSize={ 16 }
						aria-label={ buttonLabel }
						onClick={ toggle }
					/>
				</div>
			</Tooltip>
		</div>
	);
};

// =======
// HELPERS
// =======

const shouldBeSingle = ( dims: FullCssSizeUnit ) =>
	isEqual( dims.top, dims.bottom ) &&
	isEqual( dims.top, dims.left ) &&
	isEqual( dims.top, dims.right );

// ======
// STYLES
// ======

const FULL_WIDTH_LABEL = css( {
	'& label': {
		width: '100%',
	},
} );

const LABEL_STYLE = css( {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'row',
	alignContent: 'space-between',
} );

const WRAPPER_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',
} );

const ROOT = css( {
	boxSizing: 'border-box',
	display: 'block',
	width: '24px',
	height: '24px',
	position: 'relative',
	padding: '4px',
} );

const VIEWBOX = css( {
	boxSizing: 'border-box',
	display: 'block',
	position: 'relative',
	width: '100%',
	height: '100%',
} );

const SIDE = css( {
	backgroundColor: 'currentColor',
	boxSizing: 'border-box',
	display: 'block',
	pointerEvents: 'none',
	position: 'absolute',
} );

const VERTICAL_SIDE = cx(
	SIDE,
	css( {
		bottom: '3px',
		top: '3px',
		width: '2px',
	} )
);

const HORIZONTAL_SIDE = cx(
	SIDE,
	css( {
		height: '2px',
		left: '3px',
		right: '3px',
	} )
);

const TOP_SIDE = cx( HORIZONTAL_SIDE, css( { top: '0' } ) );

const RIGHT_SIDE = cx( VERTICAL_SIDE, css( { right: '0' } ) );

const BOTTOM_SIDE = cx( HORIZONTAL_SIDE, css( { bottom: '0' } ) );

const LEFT_SIDE = cx( VERTICAL_SIDE, css( { left: '0' } ) );
