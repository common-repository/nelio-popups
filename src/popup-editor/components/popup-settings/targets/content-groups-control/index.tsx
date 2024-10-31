/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { Button } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { css } from '@nelio/popups/css';
import { usePopupMeta } from '@nelio/popups/hooks';
import type { TargetConditionGroup } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { ContentGroupList } from './content-group-list';

const DEFAULT_TARGET_CONDITION_GROUP: TargetConditionGroup = [
	{ type: 'content', value: 'home-page' },
];

export const ContentGroupsControl = (): JSX.Element | null => {
	const [ target, setTarget ] = usePopupMeta( 'target' );
	if ( target.type !== 'condition-based-target' ) {
		return null;
	} //end if

	const { groups } = target;

	const isDeleteActive =
		groups.length > 1 || ( groups.length === 1 && groups[ 0 ].length > 1 );

	return (
		<>
			<p className={ LABEL }>
				{ _x( 'Show popup if:', 'command', 'nelio-popups' ) }
			</p>
			<div className="nelio-popups-condition-groups">
				{ groups.map( ( group, index ) => (
					<ContentGroupList
						key={ `nelio-popups-condition-group-${ index }` }
						group={ group }
						isDeleteActive={ isDeleteActive }
						onChange={ (
							newConditionGroup: TargetConditionGroup
						) =>
							setTarget( {
								...target,
								groups: [ ...groups ]
									.map( ( g, i ) =>
										i === index ? newConditionGroup : g
									)
									.filter( ( g ) => g.length ),
							} )
						}
					/>
				) ) }
			</div>
			<AddGroupControl
				onAdd={ () =>
					setTarget( {
						...target,
						groups: [ ...groups, DEFAULT_TARGET_CONDITION_GROUP ],
					} )
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
