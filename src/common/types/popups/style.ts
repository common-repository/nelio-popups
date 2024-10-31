/**
 * Internal dependencies
 */
import type { CssSizeUnit, FullCssSizeUnit } from '../helpers';

// ========
// LOCATION
// ========

export type PopupLocation =
	| 'bottom'
	| 'bottom-left'
	| 'bottom-right'
	| 'center'
	| 'left'
	| 'right'
	| 'top'
	| 'top-left'
	| 'top-right';

// =====
// SIZES
// =====

export type PopupSize = FullscreenPopup | AutoSize | CustomSize;

export type FullscreenPopup = {
	readonly type: 'fullscreen';
};

export type AutoSize = {
	readonly type: 'auto';
	readonly value: 'tiny' | 'small' | 'medium' | 'normal' | 'large';
};

export type CustomSize = {
	readonly type: 'custom';
	readonly width: CssSizeUnit;
	readonly height: PopupHeight;
};

export type PopupHeight = AutoAdjustHeight | CustomHeight;

export type AutoAdjustHeight = {
	readonly type: 'auto-adjust';
};

export type CustomHeight = {
	readonly type: 'custom-height';
	readonly value: CssSizeUnit;
	readonly isContentScrollable: boolean;
};

// =======
// SPACING
// =======

export type PopupSpacing = {
	readonly margin: FullCssSizeUnit;
	readonly padding: FullCssSizeUnit;
};

// =======
// OVERLAY
// =======

export type OverlaySettings =
	| {
			readonly isEnabled: false;
	  }
	| {
			readonly isEnabled: true;
			readonly color: Color;
	  };

export type Color = string; // HEX8

// =======
// WRAPPER
// =======

export type WrapperSettings = {
	readonly border: BorderSettings;
	readonly closeButton: CloseButtonSettings;
	readonly shadow: ShadowSettings;
};

export type BorderSettings =
	| {
			readonly isEnabled: false;
	  }
	| {
			readonly isEnabled: true;
			readonly radius: CssSizeUnit;
			readonly color: Color;
			readonly width: CssSizeUnit;
	  };

export type CloseButtonSettings =
	| {
			readonly isEnabled: false;
	  }
	| {
			readonly isEnabled: true;
			readonly icon: string;
			readonly label: string;
			readonly delayInMillis: number;
			readonly position: CloseButtonPosition;
			readonly color: Color;
			readonly backgroundColor: Color;
	  };

export type CloseButtonPosition =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right';

export type ShadowSettings =
	| {
			readonly isEnabled: false;
	  }
	| {
			readonly isEnabled: true;
			readonly blur: CssSizeUnit;
			readonly color: Color;
			readonly offsetX: CssSizeUnit;
			readonly offsetY: CssSizeUnit;
	  };

// ==========
// ANIMATIONS
// ==========

export type AnimationStyle =
	| {
			readonly type: 'none';
	  }
	| {
			readonly type: FreeAnimationStyle | PremiumAnimationStyle;
			readonly delay: AnimationDelay;
			readonly speed: AnimationSpeed;
	  };

export type FreeAnimationStyle = 'fade' | 'slide' | 'slide-and-fade' | 'zoom';
export type PremiumAnimationStyle =
	| 'back'
	| 'bounce'
	| 'flip'
	| 'flip-y'
	| 'roll'
	| 'rotate';
export type AnimationDelay = 'none' | 'short' | 'medium' | 'long';
export type AnimationSpeed = 'default' | 'slower' | 'slow' | 'fast' | 'faster';

// ======
// SOUNDS
// ======

export type SoundStyle =
	| {
			readonly type:
				| 'none'
				| 'beep'
				| 'beep-two'
				| 'beep-three'
				| 'beep-four'
				| 'beep-five'
				| 'chimes'
				| 'correct'
				| 'cute'
				| 'success'
				| 'success-two';
	  }
	| {
			readonly type: 'custom';
			readonly customUrl: string;
	  };
