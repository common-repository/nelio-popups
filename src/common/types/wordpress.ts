import type { ComponentType } from 'react';

/**
 * Internal dependencies
 */
import type { AttrSetter } from './helpers';
import type { Notice } from '@wordpress/notices';
import type { BlockInstance } from '@wordpress/blocks';

declare module '@wordpress/core-data' {
	export function useEntityProp< T >(
		context: 'postType',
		type: string,
		attr: string
	): AttrSetter< T >;
}

declare module '@wordpress/core-data/selectors' {
	export function getPostTypes(
		q?: SearchQuery
	): null | ReadonlyArray< PostType >;
	export function getTaxonomies(
		q?: SearchQuery
	): null | ReadonlyArray< Taxonomy >;
	export function hasFinishedResolution(
		selector: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		args: any[]
	): boolean;
}

declare module '@wordpress/data' {
	function select( key: 'core/notices' ): {
		getNotices: ( context?: string ) => Notice[];
	};
	function select( key: 'core/block-editor' ): {
		getBlocks: () => BlockInstance[];
	};
}

declare module '@wordpress/block-editor' {
	type BlockPreviewProps = {
		readonly viewportWidth: number;
		readonly blocks: ReadonlyArray< unknown >;
	};
	export const BlockPreview: ComponentType< BlockPreviewProps >;
}

export type PostType = {
	readonly name: string;
	readonly slug: string;
	readonly viewable: boolean;
	readonly hierarchical: boolean;
	readonly labels: PostTypeLabels;
};

export type PostTypeLabels = {
	// eslint-disable-next-line camelcase
	readonly all_items: string;
	// eslint-disable-next-line camelcase
	readonly search_items: string;
	// eslint-disable-next-line camelcase
	readonly singular_name?: string;
};

export type Post = {
	readonly id: number;
	readonly slug: string;
	readonly type: string;
	readonly title: {
		readonly raw: string;
	};
};

export type Taxonomy = {
	readonly name: string;
	readonly slug: string;
	readonly types: string[];
	readonly labels: TaxonomyLabels;
	readonly visibility: TaxonomyVisibility;
};

export type TaxonomyLabels = {
	readonly name: string;
	// eslint-disable-next-line camelcase
	readonly all_items: string;
	// eslint-disable-next-line camelcase
	readonly search_items: string;
};

export type TaxonomyVisibility = {
	readonly public: boolean;
};

export type Term = {
	readonly id: number;
	readonly slug: string;
	readonly name: string;
};

export type SelectResult< T > =
	| {
			readonly finished: false;
			readonly items: ReadonlyArray< T >;
			readonly pendingItems: ReadonlyArray< number >;
	  }
	| {
			readonly finished: true;
			readonly items: ReadonlyArray< T >;
			readonly missingItems: ReadonlyArray< number >;
	  };

export type SearchQuery = {
	readonly search?: string;
	readonly exclude?: ReadonlyArray< number >;
	readonly page?: number;
	// eslint-disable-next-line camelcase
	readonly per_page?: number;
	// eslint-disable-next-line camelcase
	readonly nelio_popups_search_by_title?: boolean;
};

export type QueryResult< T > =
	| {
			readonly finished: false;
	  }
	| {
			readonly finished: true;
			readonly items: ReadonlyArray< T >;
			readonly more: boolean;
	  };
