/**
 * External dependencies
 */
import { parsePopupMetas } from '@nelio/popups/utils';
import type {
	AdvancedSettings,
	AttrSetter,
	DisplaySettings,
	PopupMetas,
	WrapperSettings,
} from '@nelio/popups/types';

/**
 * Internal dependencies
 */
import { usePostMeta } from './wordpress';

// NOTE This cache is not ideal and needs some improvement.
let parsedPopupMetas: Partial< PopupMetas > = {};
export function usePopupMeta< A extends keyof PopupMetas >(
	name: A
): AttrSetter< PopupMetas[ A ] > {
	const [ editorValue, setEditorValue ] = usePostMeta<
		Partial< PopupMetas[ A ] > | undefined
	>( `nelio_popups_${ name }`, undefined );

	const setValue = ( newValue: PopupMetas[ A ] ) => {
		setEditorValue( newValue );
		parsedPopupMetas[ name ] = newValue;
	};

	if ( ! ( name in parsedPopupMetas ) ) {
		const value = parsePopupMetas( { [ name ]: editorValue } )[ name ];
		parsedPopupMetas = { ...parsedPopupMetas, [ name ]: value };
		return [ value, setValue ];
	} //end if

	// NOTE Previous `if` should be a sufficient safeguard...
	// See https://github.com/microsoft/TypeScript/issues/21732
	return [ parsedPopupMetas[ name ] as PopupMetas[ A ], setValue ];
} //end usePopupMeta()

export function useAdvancedSetting< A extends keyof AdvancedSettings >(
	name: A
): AttrSetter< AdvancedSettings[ A ] > {
	const [ advancedSettings, setAdvancedSettings ] =
		usePopupMeta( 'advanced' );
	const attribute = advancedSettings[ name ];

	return [
		attribute,
		( newValue: AdvancedSettings[ A ] ) =>
			setAdvancedSettings( { ...advancedSettings, [ name ]: newValue } ),
	] as const;
} //end useAdvancedSetting()

export function useDisplaySetting< A extends keyof DisplaySettings >(
	name: A
): AttrSetter< DisplaySettings[ A ] > {
	const [ displaySettings, setDisplaySettings ] = usePopupMeta( 'display' );
	const attribute = displaySettings[ name ];

	return [
		attribute,
		( newValue: DisplaySettings[ A ] ) =>
			setDisplaySettings( { ...displaySettings, [ name ]: newValue } ),
	] as const;
} //end useDisplaySetting()

export function useWrapperSetting< A extends keyof WrapperSettings >(
	name: A
): AttrSetter< WrapperSettings[ A ] > {
	const [ wrapperSettings, setWrapperSettings ] = usePopupMeta( 'wrapper' );
	const attribute = wrapperSettings[ name ];

	return [
		attribute,
		( newValue: WrapperSettings[ A ] ) =>
			setWrapperSettings( { ...wrapperSettings, [ name ]: newValue } ),
	] as const;
} //end useWrapperSetting()
