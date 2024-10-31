/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { KeyValueMatchControl } from '@nelio/popups/components';
import type {
	ConditionComponentProps,
	CookieCondition,
} from '@nelio/popups/types';

const CookieConditionControl = ( {
	condition,
	onChange,
}: ConditionComponentProps< CookieCondition > ): JSX.Element => (
	<KeyValueMatchControl
		keyPlaceholder={ _x( 'Cookie name', 'text', 'nelio-popups' ) }
		keyValueMatch={ condition }
		onKeyValueMatchChange={ ( newKeyValueMatch ) => {
			onChange( { ...condition, ...newKeyValueMatch } );
		} }
	/>
);

addFilter(
	'nelio_popups.get_cookie_condition_component',
	'nelio_popups.get_cookie_condition_component',
	() => CookieConditionControl
);
