/**
 * External dependencies
 */
import type {
	KeyValueMatch,
	DateMatch,
	Match,
	NumberMatch,
	StringMatch,
	TimeValue,
} from '@nelio/popups/types';

export function parseKeyValueMatch(
	kvm: Partial< KeyValueMatch >
): KeyValueMatch {
	if ( ! kvm.exists ) {
		return {
			exists: false,
			key: kvm.key ?? '',
		};
	} //end if

	return {
		exists: true,
		key: kvm.key ?? '',
		...( kvm.value && { value: parseStringMatch( kvm.value ) } ),
	};
} //end parseKeyValueMatch()

export function parseMatch( sm: Partial< Match > ): Match {
	return {
		matchType: sm.matchType ?? 'is',
		matchValue: sm.matchValue ?? [],
	};
} //end parseExactMatch()

export function parseStringMatch( sm: Partial< StringMatch > ): StringMatch {
	return {
		matchType: sm.matchType ?? 'is',
		matchValue: sm.matchValue ?? '',
	};
} //end parseStringMatch()

export function parseDateMatch( sm: Partial< DateMatch > ): DateMatch {
	if ( 'between' === sm.matchType ) {
		return {
			matchType: 'between',
			minMatchValue: sm.minMatchValue ?? '',
			maxMatchValue: sm.maxMatchValue ?? '',
		};
	} //end if

	if ( 'less-than' === sm.matchType ) {
		return {
			matchType: 'less-than',
			matchValue: sm.matchValue ?? '',
		};
	} //end if

	if ( 'greater-than' === sm.matchType ) {
		return {
			matchType: 'greater-than',
			matchValue: sm.matchValue ?? '',
		};
	} //end if

	return {
		matchType: 'greater-than',
		matchValue: '',
	};
} //end parseDateMatch()

export function parseNumberMatch( sm: Partial< NumberMatch > ): NumberMatch {
	if ( 'between' === sm.matchType ) {
		return {
			matchType: 'between',
			minMatchValue: sm.minMatchValue ?? 0,
			maxMatchValue: sm.maxMatchValue ?? 0,
		};
	} //end if

	if ( 'less-than' === sm.matchType ) {
		return {
			matchType: 'less-than',
			matchValue: sm.matchValue ?? 0,
		};
	} //end if

	if ( 'greater-than' === sm.matchType ) {
		return {
			matchType: 'greater-than',
			matchValue: sm.matchValue ?? 0,
		};
	} //end if

	return {
		matchType: 'greater-than',
		matchValue: 0,
	};
} //end parseNumberMatch()

export function parseTimeValue( tv?: Partial< TimeValue > ): TimeValue {
	return {
		unit: 'seconds',
		value: 0,
		...tv,
	};
} //end parseTimeValue()
