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
import type { Trigger, PageViewTrigger } from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { TriggerItem } from './trigger-item';

const DEFAULT_TRIGGER: PageViewTrigger = {
	type: 'page-view',
};

export const TriggerListControl = (): JSX.Element => {
	const [ triggers, setTriggers ] = usePopupMeta( 'triggers' );

	const onRemove = ( trigger: Trigger ) =>
		setTriggers( [ ...triggers ].filter( ( t ) => t !== trigger ) );
	const onAdd = () => setTriggers( [ ...triggers, { ...DEFAULT_TRIGGER } ] );

	if ( triggers.length === 0 ) {
		return (
			<>
				<p className={ LABEL }>
					{ _x(
						'This popup does not define triggers to open it. If you wish to open it, add a trigger here or from the pages where you want it to appear.',
						'text',
						'nelio-popups'
					) }
				</p>
				<AddTriggerControl onAdd={ onAdd } />
			</>
		);
	}

	return (
		<>
			<p className={ LABEL }>
				{ _x(
					'Any of the following triggers may open the popup:',
					'text',
					'nelio-popups'
				) }
			</p>
			<div className="nelio-popups-trigger-list">
				{ triggers.map( ( trigger, index ) => (
					<TriggerItem
						key={ index }
						trigger={ trigger }
						onRemove={ onRemove }
						onChange={ ( newTrigger: Trigger ) =>
							setTriggers(
								[ ...triggers ].map( ( t, i ) =>
									i === index ? newTrigger : t
								)
							)
						}
					/>
				) ) }
			</div>
			<AddTriggerControl onAdd={ onAdd } />
		</>
	);
};

type AddTriggerControlProps = {
	onAdd: () => void;
};
const AddTriggerControl = ( props: AddTriggerControlProps ): JSX.Element => (
	<div className={ ADD_BUTTON_WRAPPER }>
		<Button isPrimary={ true } onClick={ props.onAdd }>
			{ _x( 'Add Trigger', 'command', 'nelio-popups' ) }
		</Button>
	</div>
);

// ======
// STYLES
// ======

const LABEL = css( {
	marginTop: '1em',
} );

const ADD_BUTTON_WRAPPER = css( {
	marginTop: '1em',
	textAlign: 'center',
} );
