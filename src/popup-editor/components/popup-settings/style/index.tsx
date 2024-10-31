/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { Divider, SettingLabel } from '@nelio/popups/components';

/**
 * Internal dependencies
 */
import { AnimationControl } from './animation-control';
import { LocationControl } from './location-control';
import { OverlayControl } from './overlay-control';
import { SizeControl } from './size-control';
import { SoundControl } from './sound-control';
import { SpacingControl } from './spacing-control';
import { WrapperControl } from './wrapper-control';
import { ZIndexControl } from './zindex-control';

export const StyleSettings = ( props: {
	readonly isVisible: boolean;
} ): JSX.Element | null => {
	if ( ! props.isVisible ) {
		return null;
	} //end if

	const SoundControlComponent = applyFilters(
		'nelio_popups.get_sound_style_component',
		SoundControl
	) as () => JSX.Element;

	return (
		<>
			<SettingLabel
				label={ _x(
					'Customize the popup’s look and feel.',
					'user',
					'nelio-popups'
				) }
			/>
			<Divider />
			<SizeControl />
			<LocationControl />
			<SpacingControl />
			<AnimationControl />
			<Divider />
			<OverlayControl />
			<Divider />
			<WrapperControl />
			<Divider />
			<SoundControlComponent />
			<Divider />
			<ZIndexControl />
		</>
	);
};
