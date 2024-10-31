/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { Button } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { css } from '@nelio/popups/css';
import { usePopupMeta } from '@nelio/popups/hooks';
import type { ConditionGroup } from '@nelio/popups/types';

/**
 * External dependencies
 */
import { ConditionGroupList } from './condition-group-list';

const DEFAULT_CONDITION_GROUP: ConditionGroup = [
	{ type: 'referrer', matchType: 'is', matchValue: '' },
];

export const ConditionGroupsControl = (): JSX.Element | null => {
	const [ groups, setGroups ] = usePopupMeta( 'conditions' );

	return (
		<>
			<p className={ LABEL }>
				{ _x( 'Show popup if:', 'command', 'nelio-popups' ) }
			</p>
			<div className="nelio-popups-condition-groups">
				{ groups.map( ( group, index ) => (
					<ConditionGroupList
						key={ `nelio-popups-condition-group-${ index }` }
						group={ group }
						onChange={ ( newConditionGroup: ConditionGroup ) =>
							setGroups(
								[ ...groups ]
									.map( ( g, i ) =>
										i === index ? newConditionGroup : g
									)
									.filter( ( g ) => g.length )
							)
						}
					/>
				) ) }
			</div>
			<AddGroupControl
				onAdd={ () =>
					setGroups( [ ...groups, DEFAULT_CONDITION_GROUP ] )
				}
			/>
		</>
	);
};

type AddGroupControlProps = {
	onAdd: () => void;
};
const AddGroupControl = ( props: AddGroupControlProps ): JSX.Element => (
	<div className={ ADD_BUTTON_WRAPPER }>
		<Button isPrimary={ true } onClick={ props.onAdd }>
			{ _x( 'Add Condition Group', 'command', 'nelio-popups' ) }
		</Button>
	</div>
);

// ======
// STYLES
// ======

const LABEL = css( {
	marginTop: '2em',
} );

const ADD_BUTTON_WRAPPER = css( {
	marginTop: '1em',
	textAlign: 'center',
} );
