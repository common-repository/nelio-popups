/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { sortBy } from 'lodash';
import { css } from '@nelio/popups/css';
import { usePopupMeta } from '@nelio/popups/hooks';

import type {
	AnimationDelay,
	AnimationSpeed,
	AnimationStyle,
} from '@nelio/popups/types';

import { getFreeAnimations, getPremiumAnimations } from '@nelio/popups/utils';

const ANIMATION_OPTIONS = sortBy(
	[ ...getFreeAnimations(), ...getPremiumAnimations() ],
	'disabled',
	'label'
);

const DEFAULT_ANIMATION: AnimationStyle = {
	type: 'fade',
	delay: 'none',
	speed: 'default',
};

const ANIMATION_DELAY_LABELS: Record< AnimationDelay, string > = {
	none: _x( 'None', 'text (animation delay)', 'nelio-popups' ),
	short: _x( 'Short', 'text (animation delay)', 'nelio-popups' ),
	medium: _x( 'Medium', 'text (animation delay)', 'nelio-popups' ),
	long: _x( 'Long', 'text (animation delay)', 'nelio-popups' ),
};

const ANIMATION_SPEED_LABELS: Record< AnimationSpeed, string > = {
	default: _x( 'Default', 'text (animation speed)', 'nelio-popups' ),
	slower: _x( 'Slower', 'text (animation speed)', 'nelio-popups' ),
	slow: _x( 'Slow', 'text (animation speed)', 'nelio-popups' ),
	fast: _x( 'Fast', 'text (animation speed)', 'nelio-popups' ),
	faster: _x( 'Faster', 'text (animation speed)', 'nelio-popups' ),
};

const ANIMATION_DELAY_OPTIONS = Object.keys( ANIMATION_DELAY_LABELS ).map(
	( value: AnimationDelay ) => ( {
		value,
		label: ANIMATION_DELAY_LABELS[ value ],
	} )
);

const ANIMATION_SPEED_OPTIONS = Object.keys( ANIMATION_SPEED_LABELS ).map(
	( value: AnimationSpeed ) => ( {
		value,
		label: ANIMATION_SPEED_LABELS[ value ],
	} )
);

export const AnimationControl = (): JSX.Element => {
	const [ animation, setAnimation ] = usePopupMeta( 'animation' );
	return (
		<>
			<SelectControl
				label={ _x( 'Animation', 'text', 'nelio-popups' ) }
				value={ animation.type }
				options={ ANIMATION_OPTIONS }
				onChange={ ( newAnimationType ) =>
					setAnimation( {
						...DEFAULT_ANIMATION,
						...animation,
						type: newAnimationType,
					} )
				}
			/>
			{ animation.type !== 'none' && (
				<div className={ ANIMATION_OPTIONS_STYLE }>
					<SelectControl
						label={ _x( 'Delay', 'text', 'nelio-popups' ) }
						value={ animation.delay }
						options={ ANIMATION_DELAY_OPTIONS }
						onChange={ ( newAnimationDelay ) =>
							setAnimation( {
								...animation,
								delay: newAnimationDelay,
							} )
						}
					/>
					<SelectControl
						label={ _x( 'Speed', 'text', 'nelio-popups' ) }
						value={ animation.speed }
						options={ ANIMATION_SPEED_OPTIONS }
						onChange={ ( newAnimationSpeed ) =>
							setAnimation( {
								...animation,
								speed: newAnimationSpeed,
							} )
						}
					/>
				</div>
			) }
		</>
	);
};

// ======
// STYLES
// ======

const ANIMATION_OPTIONS_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',
	gap: '0.5em',

	'> *': {
		width: 'calc(50% - 0.25em)',
	},
} );
