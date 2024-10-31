/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * External dependencies
 */
import { every, filter, find } from 'lodash';
import type {
	AttrSetter,
	Post,
	PostType,
	QueryResult,
	SearchQuery,
	SelectResult,
	Taxonomy,
	Term,
} from '@nelio/popups/types';

export function usePostMeta< A >(
	name: string,
	defaultValue: A
): AttrSetter< A > {
	// NOTE Careful with the default value
	const meta =
		useSelect( ( select ) =>
			select( 'core/editor' ).getEditedPostAttribute( name )
		) || defaultValue;
	const { editPost } = useDispatch( 'core/editor' );
	return [
		meta as A,
		( value: A ): Promise< void > =>
			editPost(
				{
					[ name ]: value,
				},
				{
					undoIgnore: true,
				}
			),
	] as const;
} //end usePostMeta()

export function usePostTypes(): ReadonlyArray< PostType > {
	const postTypes = useAllPostTypes();
	return filter( postTypes, ( p ) => p.viewable && 'nelio_popup' !== p.slug );
} //end usePostTypes()

export function useTaxonomies( postType?: string ): ReadonlyArray< Taxonomy > {
	const taxonomies = useAllTaxonomies();
	return filter(
		taxonomies,
		( t ) => ! postType || t.types.includes( postType )
	);
} //end useTaxonomies()

export function useEntityKind(
	kind: 'postType' | 'taxonomy',
	name: string
): PostType | Taxonomy | undefined {
	const postTypes = useAllPostTypes();
	const taxonomies = useAllTaxonomies();
	const types: ReadonlyArray< PostType | Taxonomy > =
		'postType' === kind ? postTypes : taxonomies;
	return find( types, { slug: name } );
} //end useEntityKind()

export function useEntityRecordSearch(
	kind: 'postType' | 'taxonomy',
	name: string,
	query: SearchQuery
): QueryResult< Post | Term > {
	query = { per_page: 10, ...query };

	const records = useSelect( ( select ) =>
		select( 'core' ).getEntityRecords( kind, name, query )
	);

	const hasFinished = useSelect( ( select ) =>
		select( 'core' ).hasFinishedResolution( 'getEntityRecords', [
			kind,
			name,
			query,
		] )
	);

	if ( ! hasFinished ) {
		return { finished: false };
	} //end if

	const items: ReadonlyArray< Post | Term > =
		'postType' === kind
			? filter( records, isPost )
			: filter( records, isTerm );
	return {
		finished: true,
		items,
		more: query.per_page === items.length,
	};
} //end useEntityRecordSearch()

export function useEntityRecords(
	kind: 'postType' | 'taxonomy',
	name: string,
	itemIds: ReadonlyArray< number >
): SelectResult< Post | Term > {
	itemIds = itemIds ?? [];

	const records = useSelect( ( select ) => {
		const { getEntityRecord } = select( 'core' );
		return itemIds.map( ( itemId ) =>
			getEntityRecord( kind, name, itemId )
		);
	} );

	const finishedStatuses = useSelect( ( select ) => {
		const { hasFinishedResolution } = select( 'core' );
		return itemIds.map( ( itemId ) =>
			hasFinishedResolution( 'getEntityRecord', [ kind, name, itemId ] )
		);
	} );

	const hasFinished = every( finishedStatuses );
	const items: ReadonlyArray< Post | Term > =
		'postType' === kind
			? filter( records, isPost )
			: filter( records, isTerm );
	const loadedItemIds = items.map( ( { id } ) => id );
	const pendingItems = itemIds.filter(
		( id ) => ! loadedItemIds.includes( id )
	);
	return ! hasFinished
		? { finished: false, items, pendingItems }
		: { finished: true, items, missingItems: pendingItems };
} // end useEntityRecords()

// =======
// HELPERS
// =======

const useAllPostTypes = (): ReadonlyArray< PostType > =>
	useSelect( ( select ) =>
		select( 'core' ).getPostTypes( { per_page: -1 } )
	) || [];

const useAllTaxonomies = (): ReadonlyArray< Taxonomy > =>
	filter(
		useSelect( ( select ) =>
			select( 'core' ).getTaxonomies( { per_page: -1 } )
		),
		( t ) => t.visibility.public
	);

const isPost = ( p?: Partial< Post > ): p is Post =>
	!! p && !! p.id && !! p.slug && !! p.type && !! p.title?.raw;

const isTerm = ( t: Partial< Term > ): t is Term =>
	!! t && !! t.id && !! t.slug && !! t.name;
