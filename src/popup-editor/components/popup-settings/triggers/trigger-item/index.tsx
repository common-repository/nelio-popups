/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { Button, SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { sortBy } from 'lodash';
import { css, cx } from '@nelio/popups/css';

import {
	getFreeTriggers,
	getPremiumTriggers,
	parseTrigger,
} from '@nelio/popups/utils';

import type { Trigger, TriggerComponentType } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import './mouse-trigger-control';
import './scroll-trigger-control';
import './time-trigger-control';

export type TriggerItemProps = {
	readonly trigger: Trigger;
	readonly onChange: ( trigger: Trigger ) => void;
	readonly onRemove: ( trigger: Trigger ) => void;
};

export const TriggerItem = ( {
	trigger,
	onChange,
	onRemove,
}: TriggerItemProps ): JSX.Element => {
	const onTypeChange = ( type: Trigger[ 'type' ] ) =>
		onChange( parseTrigger( { type } ) );

	const options = sortBy(
		[ ...getFreeTriggers(), ...getPremiumTriggers() ],
		'disabled',
		'label'
	);

	const TriggerComponent = applyFilters(
		`nelio_popups.get_${ trigger.type }_trigger_component`,
		() => null
	) as TriggerComponentType< Trigger >;

	return (
		<div className={ cx( 'nelio-popups-trigger-item', WRAPPER_STYLE ) }>
			<div
				className={ cx(
					'nelio-popups-trigger-item__header',
					HEADER_STYLE
				) }
			>
				<div className="nelio-popups-trigger-item__selector">
					<SelectControl
						value={ trigger.type }
						options={ options }
						onChange={ onTypeChange }
					/>
				</div>
				<div className="nelio-popups-trigger-item__remove">
					<Button
						title={ _x( 'Remove', 'text', 'nelio-popups' ) }
						className={ REMOVE_STYLE }
						icon="no"
						onClick={ () => onRemove( trigger ) }
					/>
				</div>
			</div>
			<div
				className={ cx(
					'nelio-popups-trigger-item__body',
					BODY_STYLE
				) }
			>
				<TriggerComponent trigger={ trigger } onChange={ onChange } />
			</div>
		</div>
	);
};

// ======
// STYLES
// ======

const WRAPPER_STYLE = css( {
	border: '1px solid #e0e0e0',
	position: 'relative',

	':hover': {
		backgroundColor: '#f3f2f2',
	},

	'&:not(:first-child)': {
		borderTop: 'none',
		paddingTop: '0.5em',
	},

	'&:not(:last-child)': {
		paddingBottom: '0.5em',
	},

	'&:not(:last-child)::before': {
		display: 'block',
		textAlign: 'center',
		content: `"${ _x( 'OR', 'text', 'nelio-popups' ) }"`,
		background: '#fff',
		borderRadius: '10px',
		border: '1px solid #e0e0e0',
		padding: '1px 5px',
		position: 'absolute',
		bottom: '0',
		zIndex: 1,
		left: '50%',
		transform: 'translate(-50%, 50%)',
	},
} );

const HEADER_STYLE = css( {
	display: 'flex',
	flexDirection: 'row',

	' > :first-child': {
		flexGrow: 1,
		padding: '1em',
		paddingBottom: '5px',
	},

	' > :last-child': {
		flexGrow: 0,
		flexShrink: 0,
		paddingTop: '1px',
	},
} );

const BODY_STYLE = css( {
	padding: '0 1em 5px 1em',
} );

const REMOVE_STYLE = css( {
	':hover': {
		color: '#cc1818',
	},
} );
