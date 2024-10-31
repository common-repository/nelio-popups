/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { sprintf, _x } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { sortBy } from 'lodash';
import {
	PostSelectControl,
	TemplateSelectControl,
	TermSelectControl,
} from '@nelio/popups/components';
import { usePostTypes, useTaxonomies } from '@nelio/popups/hooks';
import { isPremium, makePremiumString } from '@nelio/popups/utils';

import type {
	TargetConditionComponentProps,
	ContentTargetCondition,
	GenericPage,
	PostType,
	PostTypeConditionValue,
	Taxonomy,
} from '@nelio/popups/types';

const GENERAL_PAGES: Record< GenericPage, string > = {
	'home-page': _x( 'Home Page', 'text', 'nelio-popups' ),
	'search-result-page': _x( 'Search Results Page', 'text', 'nelio-popups' ),
	'404-page': _x( '404 Page', 'text', 'nelio-popups' ),
	'blog-page': _x( 'Blog Index', 'text', 'nelio-popups' ),
};

const GENERAL_PAGE_OPTIONS = Object.keys( GENERAL_PAGES ).map(
	( value: GenericPage ) => ( {
		value,
		label: GENERAL_PAGES[ value ],
	} )
);

const ContentTargetConditionControl = ( {
	condition,
	onChange,
}: TargetConditionComponentProps< ContentTargetCondition > ): JSX.Element => (
	<>
		<ContentTypeControl condition={ condition } onChange={ onChange } />
		<PostTypeDetails condition={ condition } onChange={ onChange } />
	</>
);

addFilter(
	'nelio_popups.get_content_condition_component',
	'nelio_popups.get_content_condition_component',
	() => ContentTargetConditionControl
);

addFilter(
	'nelio_popups.get_excluded-content_condition_component',
	'nelio_popups.get_excluded-content_condition_component',
	() => ContentTargetConditionControl
);

// ============
// HELPER VIEWS
// ============

const ContentTypeControl = ( {
	condition,
	onChange,
}: TargetConditionComponentProps< ContentTargetCondition > ): JSX.Element => {
	const postTypes = usePostTypes();

	const postTypeOptions = sortBy(
		[
			...GENERAL_PAGE_OPTIONS,
			...postTypes.map( ( postType ) => ( {
				value: makePostTypeValue( postType.slug ),
				label: postType.labels.singular_name ?? postType.name,
			} ) ),
		],
		'label'
	);

	return (
		<SelectControl
			value={
				'post-type' === condition.value
					? makePostTypeValue( condition.postType )
					: condition.value
			}
			options={ postTypeOptions }
			onChange={ ( value ) => {
				if ( isGenericPage( value ) ) {
					onChange( {
						type: condition.type,
						value,
					} );
				} else {
					onChange( {
						type: condition.type,
						value: 'post-type',
						postType: getPostTypeFromValue( value ),
						postValue: {
							type: 'all-posts',
						},
					} );
				} //end if
			} }
		/>
	);
};

const PostTypeDetails = ( {
	condition,
	onChange,
}: TargetConditionComponentProps< ContentTargetCondition > ): JSX.Element | null => {
	const postTypes = usePostTypes();
	if ( 'post-type' !== condition.value ) {
		return null;
	} //end if

	const postType = postTypes.find( ( p ) => p.slug === condition.postType );
	if ( ! postType ) {
		return null;
	} //end if

	return (
		<PostTypeConditionValueControl
			postType={ postType }
			value={ condition.postValue }
			onValueChange={ ( postValue ) =>
				onChange( {
					...condition,
					postValue,
				} )
			}
		/>
	);
};

type PostTypeConditionValueControlProps = {
	readonly postType: PostType;
	readonly value: PostTypeConditionValue;
	readonly onValueChange: ( value: PostTypeConditionValue ) => void;
};

const PostTypeConditionValueControl = (
	props: PostTypeConditionValueControlProps
): JSX.Element => {
	const { postType, value, onValueChange } = props;
	const taxonomies = useTaxonomies( postType.slug );

	const onTypeChange = ( newType: string ) => {
		const type = isSelectedTermType( newType ) ? 'selected-terms' : newType;
		switch ( type ) {
			case 'all-posts':
				return onValueChange( { type } );

			case 'selected-posts':
			case 'children':
				return onValueChange( { type, postIds: [] } );

			case 'template':
				return onValueChange( { type } );

			case 'selected-terms':
				return onValueChange( {
					type,
					taxonomyName: getTaxonomyFromValue( newType ) ?? '',
					termIds: [],
				} );
		} //end switch
	};

	const options = getPostTypeConditionValueOptions( postType, taxonomies );

	return (
		<>
			<SelectControl
				value={
					'selected-terms' === value.type
						? makeTaxonomyValue( value.taxonomyName )
						: value.type
				}
				options={ options }
				onChange={ onTypeChange }
			/>
			{ ( value.type === 'selected-posts' ||
				value.type === 'children' ) && (
				<PostSelectControl
					postType={ postType.slug }
					value={ value.postIds }
					onChange={ ( postIds ) =>
						onValueChange( { ...value, postIds } )
					}
				/>
			) }
			{ value.type === 'template' && (
				<TemplateSelectControl
					postType={ postType.slug }
					value={ value.template }
					onChange={ ( template ) =>
						onValueChange( { ...value, template } )
					}
				/>
			) }
			{ value.type === 'selected-terms' && (
				<TermSelectControl
					taxonomy={ value.taxonomyName }
					value={ value.termIds }
					onChange={ ( termIds ) =>
						onValueChange( { ...value, termIds } )
					}
				/>
			) }
		</>
	);
};

// =======
// HELPERS
// =======

const isGenericPage = ( value: string ): value is GenericPage =>
	'404-page' === value ||
	'blog-page' === value ||
	'home-page' === value ||
	'search-result-page' === value;

const makePostTypeValue = ( value: string ) => `nelio_popups__${ value }`;

const getPostTypeFromValue = ( value: string ) =>
	value.replace( 'nelio_popups__', '' );

function getPostTypeConditionValueOptions(
	postType: PostType,
	taxonomies: ReadonlyArray< Taxonomy >
): { value: string; label: string }[] {
	type GeneralKey = Exclude<
		PostTypeConditionValue[ 'type' ],
		'selected-terms' | 'children' | 'template'
	>;
	const general: Record< GeneralKey, string > = {
		'all-posts': getAllLabel( postType ),
		'selected-posts': getSelectedLabel( postType ),
	};

	const generalOptions = Object.keys( general ).map(
		( key: GeneralKey ) => ( {
			value: key,
			label: general[ key ],
		} )
	);

	const hierarchicalOptions = postType.hierarchical
		? [
				{
					value: 'children',
					label: sprintf(
						/* translators: post type name in plural */
						_x( '%s that are children of', 'text', 'nelio-popups' ),
						postType.name
					),
				},
		  ]
		: [];

	const templateOptions = [
		{
			value: 'template',
			label: sprintf(
				/* translators: post type name in plural */
				_x( '%s with selected template', 'text', 'nelio-popups' ),
				postType.name
			),
		},
	];

	const taxonomyOptions = taxonomies.map( ( taxonomy ) => ( {
		value: makeTaxonomyValue( taxonomy.slug ),
		label: makePremiumString(
			sprintf(
				/* translators: 1 => post type name in plural, 2 => taxonomy name in plural */
				_x( '%1$s with selected %2$s', 'text', 'nelio-popups' ),
				postType.name,
				taxonomy.name
			)
		),
		disabled: ! isPremium(),
	} ) );

	return [
		...generalOptions,
		...hierarchicalOptions,
		...templateOptions,
		...taxonomyOptions,
	];
} //end getPostTypeConditionValueOptions()

const isSelectedTermType = ( value: string ): boolean =>
	value.startsWith( 'selected-terms-' );

const makeTaxonomyValue = ( value: string ): string =>
	`selected-terms-${ value }`;

const getTaxonomyFromValue = ( value: string ): string | undefined =>
	isSelectedTermType( value )
		? value.replace( 'selected-terms-', '' )
		: undefined;

function getAllLabel( postType: PostType ): string {
	switch ( postType.slug ) {
		case 'page':
		case 'post':
			return postType.labels.all_items;

		default:
			return _x( 'All Items', 'text', 'nelio-popups' );
	} //end switch
} //end getAllLabel()

function getSelectedLabel( postType: PostType ): string {
	switch ( postType.slug ) {
		case 'page':
			return _x( 'Selected Pages', 'text', 'nelio-popups' );

		case 'post':
			return _x( 'Selected Posts', 'text', 'nelio-popups' );

		default:
			return _x( 'Selected Items', 'text', 'nelio-popups' );
	} //end switch
} //end getSelectedLabel()
