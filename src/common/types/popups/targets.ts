/**
 * Internal dependencies
 */
import type { PremiumType } from '../helpers';

export type Target = FullSiteTarget | ManualTarget | ConditionBasedTarget;

export type FullSiteTarget = {
	readonly type: 'full-site-target';
};

export type ManualTarget = {
	readonly type: 'manual-target';
};

export type ConditionBasedTarget = {
	readonly type: 'condition-based-target';
	readonly groups: ReadonlyArray< TargetConditionGroup >;
};

// ==========
// CONDITIONS
// ==========

export type TargetConditionGroup = ReadonlyArray< TargetCondition >;

export type TargetCondition = FreeTargetCondition | PremiumTargetCondition;

export type FreeTargetCondition = ContentTargetCondition;

export type PremiumTargetCondition =
	| PremiumType< 'taxonomy' | 'excluded-taxonomy' >
	| PremiumType< 'url' >;

export type ContentTargetCondition =
	| {
			readonly type: 'content' | 'excluded-content';
			readonly value:
				| '404-page'
				| 'blog-page'
				| 'home-page'
				| 'search-result-page';
	  }
	| {
			readonly type: 'content' | 'excluded-content';
			readonly value: 'post-type';
			readonly postType: string;
			readonly postValue: PostTypeConditionValue;
	  };

export type GenericPage = Exclude<
	ContentTargetCondition[ 'value' ],
	'post-type'
>;

// ================
// CONDITION VALUES
// ================

export type PostTypeConditionValue =
	| AllPostsConditionValue
	| SelectedPostsConditionValue
	| HierarchichalPostsConditionValue
	| TemplateConditionValue
	| SelectedTermsConditionValue;

export type AllPostsConditionValue = {
	readonly type: 'all-posts';
};

export type SelectedPostsConditionValue = {
	readonly type: 'selected-posts';
	readonly postIds: ReadonlyArray< number >;
};

export type HierarchichalPostsConditionValue = {
	readonly type: 'children';
	readonly postIds: ReadonlyArray< number >;
};

export type TemplateConditionValue = {
	readonly type: 'template';
	readonly template?: string;
};

export type SelectedTermsConditionValue = {
	readonly type: 'selected-terms';
	readonly taxonomyName: string;
	readonly termIds: ReadonlyArray< number >;
};
