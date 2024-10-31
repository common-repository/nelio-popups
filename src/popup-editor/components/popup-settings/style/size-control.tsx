/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl, ToggleControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { sortBy } from 'lodash';
import { CSSUnitControl } from '@nelio/popups/components';
import { usePopupMeta } from '@nelio/popups/hooks';
import type { CustomHeight, PopupSize, AutoSize } from '@nelio/popups/types';

const DEFAULT_AUTO_SIZE: PopupSize = {
	type: 'auto',
	value: 'normal',
};

const DEFAULT_CUSTOM_SIZE: PopupSize = {
	type: 'custom',
	width: {
		value: 600,
		unit: 'px',
	},
	height: {
		type: 'auto-adjust',
	},
};

const DEFAULT_CUSTOM_HEIGHT: CustomHeight = {
	type: 'custom-height',
	value: {
		value: 400,
		unit: 'px',
	},
	isContentScrollable: false,
};

const SIZE_LABELS: Record< PopupSize[ 'type' ], string > = {
	fullscreen: _x( 'Fullscreen', 'text', 'nelio-popups' ),
	auto: _x( 'Auto', 'text', 'nelio-popups' ),
	custom: _x( 'Custom Size', 'text', 'nelio-popups' ),
};

const AUTO_SIZE_LABELS: Record< AutoSize[ 'value' ], string > = {
	tiny: _x( 'Tiny', 'text (size)', 'nelio-popups' ),
	small: _x( 'Small', 'text (size)', 'nelio-popups' ),
	medium: _x( 'Medium', 'text (size)', 'nelio-popups' ),
	normal: _x( 'Normal', 'text (size)', 'nelio-popups' ),
	large: _x( 'Large', 'text (size)', 'nelio-popups' ),
};

const SIZE_OPTIONS = sortBy(
	Object.keys( SIZE_LABELS ).map( ( value: PopupSize[ 'type' ] ) => ( {
		value,
		label: SIZE_LABELS[ value ],
	} ) ),
	'label'
);

const AUTO_SIZE_OPTIONS = Object.keys( AUTO_SIZE_LABELS ).map(
	( value: AutoSize[ 'value' ] ) => ( {
		value,
		label: AUTO_SIZE_LABELS[ value ],
	} )
);

export const SizeControl = (): JSX.Element => {
	const [ size, setSize ] = usePopupMeta( 'size' );
	const onChange = ( newSize: PopupSize[ 'type' ] ) => {
		switch ( newSize ) {
			case 'auto':
				return setSize( {
					...DEFAULT_AUTO_SIZE,
					...size,
					type: newSize,
				} );

			case 'custom':
				return setSize( {
					...DEFAULT_CUSTOM_SIZE,
					...size,
					type: newSize,
				} );

			default:
				return setSize( {
					...size,
					type: newSize,
				} );
		} //end switch
	};

	return (
		<>
			<SelectControl
				label={ _x( 'Size', 'text', 'nelio-popups' ) }
				value={ size.type }
				options={ SIZE_OPTIONS }
				onChange={ onChange }
			/>

			<AutoSizeControl />
			<CustomSizeControl />
		</>
	);
};

const AutoSizeControl = (): JSX.Element | null => {
	const [ size, setSize ] = usePopupMeta( 'size' );
	if ( size.type !== 'auto' ) {
		return null;
	} //end if

	return (
		<SelectControl
			label={ _x( 'Width', 'text', 'nelio-popups' ) }
			value={ size.value }
			options={ AUTO_SIZE_OPTIONS }
			onChange={ ( newValue ) => setSize( { ...size, value: newValue } ) }
		/>
	);
};

const CustomSizeControl = (): JSX.Element | null => {
	const [ size, setSize ] = usePopupMeta( 'size' );
	if ( size.type !== 'custom' ) {
		return null;
	} //end if

	return (
		<>
			<CSSUnitControl
				label={ _x( 'Width', 'text', 'nelio-popups' ) }
				min={ 0 }
				value={ size.width }
				onChange={ ( newWidth ) =>
					setSize( { ...size, width: newWidth } )
				}
			/>
			<ToggleControl
				label={ _x( 'Set custom height', 'command', 'nelio-popups' ) }
				checked={ size.height.type === 'custom-height' }
				onChange={ ( isChecked ) =>
					setSize( {
						...size,
						height: isChecked
							? {
									...DEFAULT_CUSTOM_HEIGHT,
									...size.height,
									type: 'custom-height',
							  }
							: { type: 'auto-adjust' },
					} )
				}
			/>
			<CustomHeightControl />
		</>
	);
};

const CustomHeightControl = (): JSX.Element | null => {
	const [ size, setSize ] = usePopupMeta( 'size' );
	if ( size.type !== 'custom' || size.height.type !== 'custom-height' ) {
		return null;
	} //end if
	return (
		<>
			<CSSUnitControl
				label={ _x( 'Custom height', 'text', 'nelio-popups' ) }
				min={ 0 }
				value={ size.height.value }
				onChange={ ( newValue ) =>
					setSize( {
						...size,
						height: {
							...DEFAULT_CUSTOM_HEIGHT,
							...size.height,
							type: 'custom-height',
							value: newValue,
						},
					} )
				}
			/>
			<ToggleControl
				label={ _x(
					'Allow scroll in popup content',
					'command',
					'nelio-popups'
				) }
				checked={ size.height.isContentScrollable }
				onChange={ ( isChecked ) =>
					setSize( {
						...size,
						height: {
							...DEFAULT_CUSTOM_HEIGHT,
							...size.height,
							type: 'custom-height',
							isContentScrollable: isChecked,
						},
					} )
				}
			/>
		</>
	);
};
