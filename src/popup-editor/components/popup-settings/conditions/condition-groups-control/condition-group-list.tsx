/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { Button } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { map } from 'lodash';
import { css, cx } from '@nelio/popups/css';
import {
	isMultiCondition,
	getAllConditions,
	parseCondition,
} from '@nelio/popups/utils';
import type { Condition, ConditionGroup } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { ConditionItem } from './condition-item';

export type ConditionGroupProps = {
	readonly group: ConditionGroup;
	readonly onChange: ( group: ConditionGroup ) => void;
};

export const ConditionGroupList = (
	props: ConditionGroupProps
): JSX.Element => {
	const { group, onChange } = props;
	const disabledTypes = map( group, 'type' ).filter(
		( t ) => ! isMultiCondition( t )
	);

	const availableTypes = getAllConditions()
		.filter( ( { disabled } ) => ! disabled )
		.filter( ( { value } ) => ! disabledTypes.includes( value ) );
	const newCondition =
		!! availableTypes.length &&
		parseCondition( { type: availableTypes[ 0 ].value } );

	return (
		<div
			className={ cx(
				'nelio-popups-condition-group-wrapper',
				GROUP_WRAPPER
			) }
		>
			<div className={ cx( 'nelio-popups-condition-group' ) }>
				{ group.map( ( condition, index ) => (
					<ConditionItem
						key={ `nelio-popups-condition-item-${ index }` }
						condition={ condition }
						disabledTypes={ disabledTypes }
						onAdd={ ( newItem: Condition ) =>
							onChange( [ ...group, newItem ] )
						}
						onChange={ ( changedItem: Condition ) =>
							onChange(
								[ ...group ].map( ( c, i ) =>
									i === index ? changedItem : c
								)
							)
						}
						onDelete={ ( removedItem: Condition ) =>
							onChange(
								[ ...group ].filter(
									( c ) => removedItem !== c
								)
							)
						}
					/>
				) ) }
			</div>
			{ newCondition && (
				<AddConditionControl
					onAdd={ () => onChange( [ ...group, newCondition ] ) }
				/>
			) }
		</div>
	);
};

type AddConditionControlProps = {
	onAdd: () => void;
};
const AddConditionControl = (
	props: AddConditionControlProps
): JSX.Element => (
	<div className={ ADD_BUTTON_WRAPPER }>
		<Button isSecondary={ true } onClick={ props.onAdd }>
			{ _x( 'Add Condition', 'command', 'nelio-popups' ) }
		</Button>
	</div>
);

// ======
// STYLES
// ======

const GROUP_WRAPPER = css( {
	border: '1px solid #e0e0e0',
	position: 'relative',

	'&:not(:last-child)': {
		marginBottom: '3em',
	},

	'&:not(:last-child)::before': {
		display: 'block',
		content: '""',
		borderTop: '2px dashed #e0e0e0',
		position: 'absolute',
		bottom: 'calc(-1.5em - 3px)',
		width: '100%',
	},

	'&:not(:last-child)::after': {
		display: 'block',
		textAlign: 'center',
		content: `"${ _x( 'OR', 'text', 'nelio-popups' ) }"`,
		background: '#fff',
		borderRadius: '10px',
		padding: '2px 10px',
		position: 'absolute',
		bottom: 'calc(-1.5em - 1px)',
		left: '50%',
		transform: 'translate(-50%, 50%)',
	},
} );

const ADD_BUTTON_WRAPPER = css( {
	borderTop: '1px solid #e0e0e0',
	padding: '1em',
	textAlign: 'center',
} );
