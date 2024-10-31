/**
 * WordPress dependencies
 */
import * as React from '@wordpress/element';
import { Button, Modal, TextareaControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { _x, sprintf } from '@wordpress/i18n';

// TODO
// import { store as noticesStore } from '@wordpress/notices';
// const NOTICES = noticesStore?.name ?? 'core/notices';
const NOTICES = 'core/notices';

/**
 * External dependencies
 */
import { trim, zipObject } from 'lodash';
import { css } from '@nelio/popups/css';
import { usePopupMeta } from '@nelio/popups/hooks';
import type { PopupMetas } from '@nelio/popups/types';

export const ImportExportControl = () => {
	const [ status, setStatus ] = useState< 'import' | 'export' | 'none' >(
		'none'
	);
	return (
		<div className={ CONTROL_STYLE }>
			<Button variant="secondary" onClick={ () => setStatus( 'import' ) }>
				{ _x( 'Import', 'command', 'nelio-popups' ) }
			</Button>
			<Button variant="secondary" onClick={ () => setStatus( 'export' ) }>
				{ _x( 'Export', 'command', 'nelio-popups' ) }
			</Button>
			{ 'none' !== status && (
				<ImportExportModal
					mode={ status }
					onClose={ () => void setStatus( 'none' ) }
				/>
			) }
		</div>
	);
};

// ============
// HELPER VIEWS
// ============

type ImportExportModalProps = {
	readonly mode: 'import' | 'export';
	readonly onClose: () => void;
};

const ImportExportModal = ( { mode, onClose }: ImportExportModalProps ) => {
	const exportedSettings = useExportedSettings();
	const [ content, setContent ] = useState(
		mode === 'export' ? exportedSettings : ''
	);

	const title =
		mode === 'export'
			? _x( 'Export Popup Settings', 'text', 'nelio-popups' )
			: _x( 'Import Popup Settings', 'text', 'nelio-popups' );
	const action =
		mode === 'export'
			? _x( 'Copy Settings', 'command', 'nelio-popups' )
			: _x( 'Import Settings', 'text', 'nelio-popups' );

	const onExport = () =>
		void navigator.clipboard
			.writeText( exportedSettings )
			.then( () => onClose() );

	const importSettings = useSettingsImporter();
	const onImport = () => {
		importSettings( content );
		onClose();
	};

	const onAccept = mode === 'export' ? onExport : onImport;

	return (
		<Modal title={ title } onRequestClose={ onClose }>
			<TextareaControl
				placeholder={
					'import' === mode
						? _x(
								'Paste export settings here…',
								'user',
								'nelio-popups'
						  )
						: undefined
				}
				value={ content }
				onChange={ setContent }
				readOnly={ 'export' === mode }
			/>
			<div className={ MODAL_ACTIONS }>
				<Button variant="secondary" onClick={ onClose }>
					{ _x( 'Close', 'command', 'nelio-popups' ) }
				</Button>
				<Button
					variant="primary"
					onClick={ onAccept }
					disabled={ 'import' === mode && ! trim( content ) }
				>
					{ action }
				</Button>
			</div>
		</Modal>
	);
};

// =====
// HOOKS
// =====

const EXPORTABLE_POPUP_METAS: ReadonlyArray< keyof PopupMetas > = [
	'advanced',
	'animation',
	'conditions',
	'display',
	'location',
	'overlay',
	'size',
	'sound',
	'spacing',
	'target',
	'triggers',
	'wrapper',
];

const useExportedSettings = () => {
	const values = EXPORTABLE_POPUP_METAS.map(
		// eslint-disable-next-line react-hooks/rules-of-hooks
		( name ) => usePopupMeta( name )[ 0 ]
	);
	const settings = zipObject( EXPORTABLE_POPUP_METAS, values );
	return JSON.stringify( settings );
};

const useSettingsImporter = (): ( ( settings: string ) => void ) => {
	const { createSuccessNotice, createErrorNotice } = useDispatch( NOTICES );
	const functions = EXPORTABLE_POPUP_METAS.map(
		// eslint-disable-next-line react-hooks/rules-of-hooks
		( name ) => usePopupMeta( name )[ 1 ]
	);
	const updaters = zipObject( EXPORTABLE_POPUP_METAS, functions );
	return ( settings: string ) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const s = JSON.parse( settings );
			Object.keys( updaters ).forEach( ( meta ) => {
				const update = updaters[ meta ];
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				if ( s[ meta ] ) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
					update( s[ meta ] );
				} //end if
			} );
			void createSuccessNotice(
				_x( 'Popup settings imported.', 'text', 'nelio-popups' ),
				{ type: 'snackbar' }
			);
		} catch ( e ) {
			void createErrorNotice(
				sprintf(
					/* translators: error message */
					_x(
						'Unable to import popup settings. %s',
						'text',
						'nelio-popups'
					),
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					e.message
				)
			);
		} //end try
	};
};

// ======
// STYLES
// ======

const CONTROL_STYLE = css( {
	justifyContent: 'center',
	display: 'flex',
	gap: '0.3em',
	'> *': {
		flexGrow: 1,
		justifyContent: 'center',
		textAlign: 'center',
	},
} );

const MODAL_ACTIONS = css( {
	justifyContent: 'end',
	display: 'flex',
	gap: '0.3em',
	marginTop: '2em',
} );
