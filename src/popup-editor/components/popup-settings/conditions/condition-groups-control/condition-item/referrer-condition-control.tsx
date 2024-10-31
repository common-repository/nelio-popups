/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';

/**
 * External dependencies
 */
import { StringMatchControl } from '@nelio/popups/components';
import type {
	ConditionComponentProps,
	ReferrerCondition,
} from '@nelio/popups/types';

const ReferrerConditionControl = ( {
	condition,
	onChange,
}: ConditionComponentProps< ReferrerCondition > ): JSX.Element => (
	<StringMatchControl
		match={ condition }
		onStringMatchChange={ ( newStringMatch ) => {
			onChange( { ...condition, ...newStringMatch } );
		} }
	/>
);

addFilter(
	'nelio_popups.get_referrer_condition_component',
	'nelio_popups.get_referrer_condition_component',
	() => ReferrerConditionControl
);
