const _ = require( 'lodash' );
const path = require( 'path' );

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const config = {
	...defaultConfig,
	resolve: {
		...defaultConfig.resolve,
		alias: {
			'@nelio/popups': path.resolve( __dirname, 'src/common' ),
			'@nelio/popups-premium': path.resolve(
				__dirname,
				'premium/src/common'
			),
		},
		extensions: _.uniq( [
			...( defaultConfig.resolve.extensions ?? [] ),
			'.js',
			'.jsx',
			'.ts',
			'.tsx',
		] ),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		...defaultConfig.plugins,
		{
			apply: ( compiler ) => {
				compiler.hooks.afterEmit.tap(
					'NelioPopupsFixAnimations',
					() => {
						const style = require( 'fs' ).readFileSync(
							'./dist/style-public.css',
							'utf8'
						);
						const animations = require( 'fs' )
							.readFileSync( './dist/public.css', 'utf8' )
							.replace(
								/([.-])animate/g,
								'$1nelio-popups-animate'
							)
							.replace( /(name:\s*)/g, '$1nelioPopups_' )
							.replace( /(keyframes\s+)/g, '$1nelioPopups_' );
						require( 'fs' ).writeFileSync(
							'./dist/nelio-popups-public.css',
							`${ style } ${ animations }`
						);
					}
				);
				compiler.hooks.done.tap( 'NelioPopupsFixAnimations', () => {
					[
						'./dist/public.css',
						'./dist/public.css.map',
						'./dist/style-public.css',
						'./dist/style-public.css.map',
					].forEach( ( f ) => {
						if ( require( 'fs' ).existsSync( f ) ) {
							require( 'fs' ).rmSync( f );
						} //end if
					} );
				} );
			},
		},
		{
			apply: ( compiler ) => {
				compiler.hooks.afterEmit.tap(
					'NelioPopupsFixBlockCustomizations',
					() => {
						const style = require( 'fs' ).readFileSync(
							'./dist/style-block-customizations.css',
							'utf8'
						);
						require( 'fs' ).writeFileSync(
							'./dist/nelio-popups-block-customizations.css',
							`${ style }`
						);
					}
				);
				compiler.hooks.done.tap(
					'NelioPopupsFixBlockCustomizations',
					() => {
						[
							'./dist/style-block-customizations.css',
							'./dist/style-block-customizations.css.map',
						].forEach( ( f ) => {
							if ( require( 'fs' ).existsSync( f ) ) {
								require( 'fs' ).rmSync( f );
							} //end if
						} );
					}
				);
			},
		},
	],
};

module.exports = {
	...config,
	entry: {
		// BASE
		'popup-editor': './src/popup-editor/index.tsx',
		'popup-list': './src/popup-list/index.tsx',
		'block-customizations': './src/block-customizations/index.ts',
		gutenberg: './src/gutenberg/index.tsx',
		public: './src/public/index.ts',

		// PREMIUM
		'premium/parsers': './premium/src/parsers/index.ts',
		'premium/popup-editor': './premium/src/popup-editor/index.ts',
		'premium/public': './premium/src/public/index.ts',
		'premium/updates-page': './premium/src/updates/index.tsx',
		// Use name from https://www.detectadblock.com/ (sailthru)
		'premium/sailthru': './premium/src/public/adblock-honeypot.ts',
	},
	output: {
		filename: ( pathData ) => {
			const { name } = pathData.chunk;
			if ( ! name.startsWith( 'premium/' ) ) {
				return 'nelio-popups-[name].js';
			} //end if

			const cleanName = name.replace( 'premium/', '' );
			switch ( cleanName ) {
				case 'sailthru':
					return '../premium/dist/sailthru.js';

				default:
					return `../premium/dist/nelio-popups-premium-${ cleanName }.js`;
			} //end switch
		},
		path: path.resolve( __dirname, 'dist' ),
	},
};
