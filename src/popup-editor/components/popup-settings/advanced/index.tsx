/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { Divider, SettingLabel } from '@nelio/popups/components';
import { useAdvancedSetting, useDisplaySetting } from '@nelio/popups/hooks';

/**
 * Internal dependencies
 */
import { CookieControl } from './cookie-control';
import { ImportExportControl } from './import-export-control';
import { TriggerLimitControl } from './trigger-limit-control';

export const AdvancedSettings = ( props: {
	readonly isVisible: boolean;
} ): JSX.Element | null => {
	if ( ! props.isVisible ) {
		return null;
	} //end if

	return (
		<>
			<SettingLabel
				label={ _x(
					'Tweak other settings here.',
					'user',
					'nelio-popups'
				) }
			/>
			<Divider />
			<ImportExportControl />
			<Divider />
			<DisableOtherPopupsControl />
			<DisabledIfOthersOpenedControl />
			<DisableOnMobileControl />
			<Divider />
			<TriggerLimitControl />
			<Divider />
			<CloseOnEscControl />
			<CloseOnOverlayClickControl />
			<BodyScrollControl />
			<Divider />
			<CookieControl />
		</>
	);
};

const DisableOtherPopupsControl = (): JSX.Element => {
	const [ disablesOtherPopupOpenings, setDisablesOtherPopupOpenings ] =
		useDisplaySetting( 'disablesOtherPopupOpenings' );
	return (
		<CheckboxControl
			label={ _x(
				'Prevent other popups from opening when this one is visible',
				'command',
				'nelio-popups'
			) }
			checked={ disablesOtherPopupOpenings }
			onChange={ setDisablesOtherPopupOpenings }
		/>
	);
};

const DisabledIfOthersOpenedControl = (): JSX.Element => {
	const [ isDisabledIfOpenedPopups, setIsDisabledIfOpenedPopups ] =
		useDisplaySetting( 'isDisabledIfOpenedPopups' );
	return (
		<CheckboxControl
			label={ _x(
				'Prevent this popup from opening when others are visible',
				'command',
				'nelio-popups'
			) }
			checked={ isDisabledIfOpenedPopups }
			onChange={ setIsDisabledIfOpenedPopups }
		/>
	);
};

const DisableOnMobileControl = (): JSX.Element => {
	const [ isDisabledOnMobile, setIsDisabledOnMobile ] =
		useDisplaySetting( 'isDisabledOnMobile' );
	return (
		<CheckboxControl
			label={ _x( 'Show on mobile devices', 'command', 'nelio-popups' ) }
			checked={ ! isDisabledOnMobile }
			onChange={ () => setIsDisabledOnMobile( ! isDisabledOnMobile ) }
		/>
	);
};

const CloseOnEscControl = (): JSX.Element => {
	const [ closeOnEscPressed, setCloseOnEscPressed ] =
		useAdvancedSetting( 'closeOnEscPressed' );
	return (
		<CheckboxControl
			label={ _x( 'Close on ESC', 'command', 'nelio-popups' ) }
			checked={ closeOnEscPressed }
			onChange={ setCloseOnEscPressed }
		/>
	);
};

const CloseOnOverlayClickControl = (): JSX.Element => {
	const [ closeOnOverlayClicked, setCloseOnOverlayClicked ] =
		useAdvancedSetting( 'closeOnOverlayClicked' );
	return (
		<CheckboxControl
			label={ _x( 'Close on outside click', 'command', 'nelio-popups' ) }
			checked={ closeOnOverlayClicked }
			onChange={ setCloseOnOverlayClicked }
		/>
	);
};

const BodyScrollControl = (): JSX.Element => {
	const [ isBodyScrollLocked, lockBodyScroll ] =
		useAdvancedSetting( 'isBodyScrollLocked' );
	return (
		<CheckboxControl
			label={ _x( 'Lock body scroll', 'command', 'nelio-popups' ) }
			checked={ isBodyScrollLocked }
			onChange={ lockBodyScroll }
		/>
	);
};
