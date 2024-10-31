/**
 * External dependencies
 */
import type { Popup } from '@nelio/popups/types';

export type Settings = {
	readonly context: WordPressContext;
	readonly popups: ReadonlyArray< Popup >;
};

export type WordPressContext = {
	readonly isSingular: boolean;
	readonly postId: number;
	readonly postPopups: 'auto' | ReadonlyArray< number >;
	readonly postType: string;
	readonly parents: ReadonlyArray< number >;
	readonly specialPage: SpecialPage;
	readonly previewPopup: Popup | false;
	readonly template: string;
};

export type VisiblePopup = {
	readonly el: HTMLElement;
	readonly popup: Popup;
};

export type SpecialPage =
	| 'none'
	| '404-page'
	| 'blog-page'
	| 'home-page'
	| 'search-result-page';
