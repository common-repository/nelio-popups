/**
 * Internal dependencies
 */
import type { Condition } from './popups/conditions';
import type { TargetCondition } from './popups/targets';
import type { Trigger } from './popups/triggers';

export type TargetConditionComponentType< T extends TargetCondition > = (
	props: TargetConditionComponentProps< T >
) => JSX.Element | null;

export type TargetConditionComponentProps< T extends TargetCondition > = {
	readonly condition: T;
	readonly onChange: ( condition: T ) => void;
};

export type ConditionComponentType< T extends Condition > = (
	props: ConditionComponentProps< T >
) => JSX.Element | null;

export type ConditionComponentProps< T extends Condition > = {
	readonly condition: T;
	readonly onChange: ( condition: T ) => void;
};

export type TriggerComponentType< T extends Trigger > = (
	props: TriggerComponentProps< T >
) => JSX.Element | null;

export type TriggerComponentProps< T extends Trigger > = {
	readonly trigger: T;
	readonly onChange: ( trigger: T ) => void;
};

export type SelectControlOption< V extends string = string > = {
	readonly value: V;
	readonly label: string;
	readonly disabled: boolean;
};
