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
	getAllTargetConditions,
	parseTargetCondition,
} from '@nelio/popups/utils';
import type {
	TargetCondition,
	TargetConditionGroup,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { ContentItem } from './content-item';

export type ContentGroupProps = {
	readonly group: TargetConditionGroup;
	readonly isDeleteActive: boolean;
	readonly onChange: ( group: TargetConditionGroup ) => void;
};

export const ContentGroupList = ( props: ContentGroupProps ): JSX.Element => {
	const { group, isDeleteActive, onChange } = props;
	const usedTypes = map( group, 'type' );

	const availableTypes = getAllTargetConditions()
		.filter( ( { disabled } ) => ! disabled )
		.filter( ( { value } ) => ! usedTypes.includes( value ) );
	const newCondition =
		!! availableTypes.length &&
		parseTargetCondition( { type: availableTypes[ 0 ].value } );

	return (
		<div
			className={ cx(
				'nelio-popups-condition-group-wrapper',
				GROUP_WRAPPER
			) }
		>
			<div className={ cx( 'nelio-popups-content-group' ) }>
				{ group.map( ( condition, index ) => (
					<ContentItem
						key={ `nelio-popups-content-item-${ index }` }
						condition={ condition }
						isDeleteActive={ isDeleteActive }
						usedTypes={ usedTypes }
						onAdd={ ( newItem: TargetCondition ) =>
							onChange( [ ...group, newItem ] )
						}
						onChange={ ( changedItem: TargetCondition ) =>
							onChange(
								[ ...group ].map( ( c, i ) =>
									i === index
										? maybeInheritAttrs( c, changedItem )
										: c
								)
							)
						}
						onDelete={ ( removedItem: TargetCondition ) =>
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
				<AddContentTargetConditionControl
					onAdd={ () => onChange( [ ...group, newCondition ] ) }
				/>
			) }
		</div>
	);
};

type AddContentTargetConditionControlProps = {
	onAdd: () => void;
};
const AddContentTargetConditionControl = (
	props: AddContentTargetConditionControlProps
): JSX.Element => (
	<div className={ ADD_BUTTON_WRAPPER }>
		<Button isSecondary={ true } onClick={ props.onAdd }>
			{ _x( 'Add Condition', 'command', 'nelio-popups' ) }
		</Button>
	</div>
);

// =======
// HELPERS
// =======

function maybeInheritAttrs(
	oldCon: TargetCondition,
	newCon: TargetCondition
): TargetCondition {
	if ( oldCon.type === newCon.type ) {
		return newCon;
	} //end if

	if (
		( oldCon.type === 'content' && newCon.type === 'excluded-content' ) ||
		( oldCon.type === 'excluded-content' && newCon.type === 'content' )
	) {
		return { ...oldCon, type: newCon.type };
	} //end if

	if (
		( oldCon.type === 'taxonomy' && newCon.type === 'excluded-taxonomy' ) ||
		( oldCon.type === 'excluded-taxonomy' && newCon.type === 'taxonomy' )
	) {
		return { ...oldCon, type: newCon.type };
	} //end if

	return newCon;
} //end maybeInheritAttrs()

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
