/**
 * WordPress dependencies
 */
import type { BlockInstance } from '@wordpress/blocks';

export type AttrSetter< T > = readonly [ T, ( val: T ) => void ];

export type CssSizeUnit = {
	readonly value: number;
	readonly unit: 'px' | '%' | 'em' | 'rem';
};

export type FullCssSizeUnit = {
	readonly top: CssSizeUnit;
	readonly bottom: CssSizeUnit;
	readonly left: CssSizeUnit;
	readonly right: CssSizeUnit;
};

export type PremiumType< T extends string > = { readonly type: T };

export type TypeAs< T extends string, A > = { readonly type: T } & A;

export type Match = {
	readonly matchType: 'is' | 'is-not';
	readonly matchValue: ReadonlyArray< string >;
};

export type StringMatch = {
	readonly matchType:
		| 'is'
		| 'is-not'
		| 'includes'
		| 'does-not-include'
		| 'regex';
	readonly matchValue: string;
};

export type DateMatch =
	| {
			readonly matchType: 'greater-than' | 'less-than';
			readonly matchValue: string;
	  }
	| {
			readonly matchType: 'between';
			readonly minMatchValue: string;
			readonly maxMatchValue: string;
	  };

export type NumberMatch =
	| {
			readonly matchType: 'greater-than' | 'less-than';
			readonly matchValue: number;
	  }
	| {
			readonly matchType: 'between';
			readonly minMatchValue: number;
			readonly maxMatchValue: number;
	  };

export type TimeValue = {
	readonly value: number;
	readonly unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months';
};

export type KeyValueMatch =
	| {
			readonly exists: true;
			readonly key: string;
			readonly value?: StringMatch;
	  }
	| {
			readonly exists: false;
			readonly key: string;
	  };

export type PopupEditorSettings = {
	readonly popupCloseBlocks: ReadonlyArray< string >;
	readonly activePlugins: ReadonlyArray< string >;
};

export type PopupSettings = {
	readonly popupCloseBlocks: ReadonlyArray< string >;
	readonly popupOpenBlocks: ReadonlyArray< string >;
};

export type PopupPattern = {
	readonly name: string;
	readonly title: string;
	readonly description: string;
	readonly content: string;
	readonly viewportWidth: number;
	readonly blocks: ReadonlyArray< BlockInstance >;
};
