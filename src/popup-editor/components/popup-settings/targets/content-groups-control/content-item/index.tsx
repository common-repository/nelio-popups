/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { Button, SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';
import { sortBy } from 'lodash';

/**
 * External dependencies
 */
import { css, cx } from '@nelio/popups/css';
import {
	getFreeTargetConditions,
	getPremiumTargetConditions,
	parseTargetCondition,
} from '@nelio/popups/utils';

import type {
	TargetConditionComponentType,
	SelectControlOption,
	TargetCondition,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import './content-condition-control';

export type ContentItemProps = {
	readonly condition: TargetCondition;
	readonly usedTypes: ReadonlyArray< TargetCondition[ 'type' ] >;
	readonly isDeleteActive: boolean;
	readonly onAdd: ( newItem: TargetCondition ) => void;
	readonly onChange: ( newItem: TargetCondition ) => void;
	readonly onDelete: ( newItem: TargetCondition ) => void;
};

export const ContentItem = ( {
	condition,
	usedTypes,
	isDeleteActive,
	onChange,
	onDelete,
}: ContentItemProps ): JSX.Element => {
	const onTypeChange = ( type: TargetCondition[ 'type' ] ) =>
		onChange( parseTargetCondition( { type } ) );

	type Option = SelectControlOption< TargetCondition[ 'type' ] >;
	const disableUsedType = ( option: Option ): Option =>
		option.value !== condition.type && usedTypes.includes( option.value )
			? { ...option, disabled: true }
			: option;

	const options = sortBy(
		[ ...getFreeTargetConditions(), ...getPremiumTargetConditions() ],
		'disabled',
		'label'
	).map( disableUsedType );

	const ConditionBodyComponent = applyFilters(
		`nelio_popups.get_${ condition.type }_condition_component`,
		() => null
	) as TargetConditionComponentType< TargetCondition >;

	return (
		<div className={ cx( 'nelio-popups-condition-item', WRAPPER_STYLE ) }>
			<div
				className={ cx(
					'nelio-popups-condition-item__header',
					HEADER_STYLE
				) }
			>
				<div className="nelio-popups-condition-item__selector">
					<SelectControl
						value={ condition.type }
						options={ options }
						onChange={ onTypeChange }
					/>
				</div>
				<div className="nelio-popups-condition-item__remove">
					{ isDeleteActive && (
						<Button
							title={ _x( 'Remove', 'text', 'nelio-popups' ) }
							className={ REMOVE_STYLE }
							icon="no"
							onClick={ () => onDelete( condition ) }
						/>
					) }
				</div>
			</div>
			<div
				className={ cx(
					'nelio-popups-condition-item__body',
					BODY_STYLE
				) }
			>
				<ConditionBodyComponent
					condition={ condition }
					onChange={ onChange }
				/>
			</div>
		</div>
	);
};

// ======
// STYLES
// ======

const WRAPPER_STYLE = css( {
	borderBottom: '1px solid #e0e0e0',
	position: 'relative',

	'&:last-child': {
		borderBottom: 'none',
	},

	':hover': {
		backgroundColor: '#f3f2f2',
	},

	'&:not(:first-child)': {
		paddingTop: '0.5em',
	},

	'&:not(:last-child)': {
		paddingBottom: '0.5em',
	},

	'&:not(:last-child)::before': {
		display: 'block',
		textAlign: 'center',
		content: `"${ _x( 'AND', 'text', 'nelio-popups' ) }"`,
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
