/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import {
	BaseControl,
	Dashicon,
	DropdownMenu,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { sortBy } from 'lodash';
import { TwoColorControl, NumberControl } from '@nelio/popups/components';
import { css } from '@nelio/popups/css';
import { useWrapperSetting } from '@nelio/popups/hooks';
import type {
	CloseButtonPosition,
	CloseButtonSettings,
} from '@nelio/popups/types';

const DEFAULT_CLOSE_BUTTON: CloseButtonSettings = {
	isEnabled: true,
	icon: 'dashicons-no',
	label: '',
	delayInMillis: 0,
	position: 'top-right',
	color: '#000000',
	backgroundColor: '#ffffff00',
};

export const CloseButtonControl = (): JSX.Element => (
	<>
		<ToggleCloseButtonControl />
		<IconLabelControl />
		<PositionDelayControl />
		<CloseButtonColors />
	</>
);
// =======
// HELPERS
// =======

const ToggleCloseButtonControl = () => {
	const [ closeButton, setCloseButton ] = useWrapperSetting( 'closeButton' );
	const { isEnabled } = closeButton;

	return (
		<ToggleControl
			label={ _x( 'Add close button', 'command', 'nelio-popups' ) }
			checked={ isEnabled }
			onChange={ ( isActive: boolean ) =>
				setCloseButton( {
					...DEFAULT_CLOSE_BUTTON,
					isEnabled: isActive,
				} )
			}
		/>
	);
};

const IconLabelControl = () => {
	const [ closeButton ] = useWrapperSetting( 'closeButton' );
	const { isEnabled } = closeButton;

	if ( ! isEnabled ) {
		return null;
	} //end if

	return (
		<div className={ ICON_LABEL_STYLE }>
			<IconControl />
			<LabelControl />
		</div>
	);
};

const PositionDelayControl = () => {
	const [ closeButton ] = useWrapperSetting( 'closeButton' );
	const { isEnabled } = closeButton;

	if ( ! isEnabled ) {
		return null;
	} //end if

	return (
		<div className={ POSITION_DELAY_STYLE }>
			<PositionControl />
			<DelayControl />
		</div>
	);
};

const ICON_OPTIONS = [
	{
		icon: 'nelio-none',
		title: _x( 'None', 'text (dashicon)', 'nelio-popups' ),
	},
	{
		icon: 'dismiss',
		title: _x( 'Dismiss', 'text (dashicon)', 'nelio-popups' ),
	},
	{
		icon: 'no',
		title: _x( 'No', 'text (dashicon)', 'nelio-popups' ),
	},
	{
		icon: 'no-alt',
		title: _x( 'No (alt)', 'text (dashicon)', 'nelio-popups' ),
	},
	{
		icon: 'remove',
		title: _x( 'Remove', 'text (dashicon)', 'nelio-popups' ),
	},
	{
		icon: 'minus',
		title: _x( 'Minus', 'text (dashicon)', 'nelio-popups' ),
	},
];

const IconControl = () => {
	const instanceId = useInstanceId( IconControl );
	const [ closeButton, setCloseButton ] = useWrapperSetting( 'closeButton' );
	if ( ! closeButton.isEnabled ) {
		return null;
	} //end if

	const value = closeButton.icon.replace( 'dashicons-', '' );
	return (
		<BaseControl
			id={ `nelio-popups-icon-control-${ instanceId }` }
			label={ _x( 'Icon', 'text', 'nelio-popups' ) }
		>
			<DropdownMenu
				className={ ICON_CONTROL_STYLE }
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				icon={ value as any as Dashicon.Icon }
				label={ _x( 'Icon', 'text', 'nelio-popups' ) }
				controls={ ICON_OPTIONS.map( ( { icon, title } ) => ( {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					icon: icon as any as Dashicon.Icon,
					title,
					onClick: () =>
						setCloseButton( {
							...closeButton,
							icon:
								'nelio-none' === icon
									? ''
									: `dashicons-${ icon }`,
						} ),
				} ) ) }
			/>
		</BaseControl>
	);
};

const LabelControl = () => {
	const [ closeButton, setCloseButton ] = useWrapperSetting( 'closeButton' );
	if ( ! closeButton.isEnabled ) {
		return null;
	} //end if

	return (
		<TextControl
			label={ _x( 'Label', 'text', 'nelio-popups' ) }
			value={ closeButton.label }
			onChange={ ( newLabel ) =>
				setCloseButton( {
					...closeButton,
					label: newLabel,
				} )
			}
		/>
	);
};

const CloseButtonColors = () => {
	const [ closeButton, setCloseButton ] = useWrapperSetting( 'closeButton' );
	if ( ! closeButton.isEnabled ) {
		return null;
	} //end if

	return (
		<TwoColorControl
			label={ _x( 'Button color', 'text', 'nelio-popups' ) }
			foreground={ {
				color: closeButton.color,
				onChange: ( color ) =>
					setCloseButton( {
						...closeButton,
						color,
					} ),
			} }
			background={ {
				color: closeButton.backgroundColor,
				onChange: ( backgroundColor ) =>
					setCloseButton( {
						...closeButton,
						backgroundColor,
					} ),
			} }
		/>
	);
};

const DelayControl = () => {
	const [ closeButton, setCloseButton ] = useWrapperSetting( 'closeButton' );
	if ( ! closeButton.isEnabled ) {
		return null;
	} //end if

	return (
		<NumberControl
			label={ _x( 'Delay (ms)', 'text', 'nelio-popups' ) }
			min={ 0 }
			value={ closeButton.delayInMillis }
			onChange={ ( newDelay ) =>
				setCloseButton( {
					...closeButton,
					delayInMillis: newDelay,
				} )
			}
		/>
	);
};

const POSITION_LABELS: Record< CloseButtonPosition, string > = {
	'top-left': _x( 'Top Left', 'text', 'nelio-popups' ),
	'top-right': _x( 'Top Right', 'text', 'nelio-popups' ),
	'bottom-left': _x( 'Bottom Left', 'text', 'nelio-popups' ),
	'bottom-right': _x( 'Bottom Right', 'text', 'nelio-popups' ),
};

const POSITION_OPTIONS = sortBy(
	Object.keys( POSITION_LABELS ).map( ( value: CloseButtonPosition ) => ( {
		value,
		label: POSITION_LABELS[ value ],
	} ) ),
	'label'
);

const PositionControl = () => {
	const [ closeButton, setCloseButton ] = useWrapperSetting( 'closeButton' );
	if ( ! closeButton.isEnabled ) {
		return null;
	} //end if

	return (
		<SelectControl
			label={ _x( 'Position', 'text', 'nelio-popups' ) }
			value={ closeButton.position }
			options={ POSITION_OPTIONS }
			onChange={ ( newPosition ) =>
				setCloseButton( {
					...closeButton,
					position: newPosition,
				} )
			}
		/>
	);
};

// ======
// STYLES
// ======

const ICON_CONTROL_STYLE = css( {
	'> button, > button.components-button.has-icon': {
		border: '1px solid #757575',
		display: 'flex',
		height: 30,
		justifyContent: 'flex-end',
		padding: '0 4px',
		width: 48,
	},
	'> button::after, > button.components-button.has-icon::after': {
		content: '"\\f140"',
		display: 'block',
		fontFamily: 'dashicons',
	},
} );

const ICON_LABEL_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',
	gap: '0.5em',
	marginBottom: '0.5em',
	'> :first-child': {
		width: 'min-content',
	},
	'& label': {
		marginBottom: '8px !important',
		padding: '0 !important',
	},
} );

const POSITION_DELAY_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',
	gap: '0.5em',
	marginBottom: '0.5em',
	'> *': {
		width: 'calc(50% - 0.25em)',
	},
} );
