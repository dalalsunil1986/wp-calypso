/** @format */

const isCalypsoClient = process.env.CALYPSO_CLIENT === 'true';
const isBrowser = isCalypsoClient || 'true' === process.env.TARGET_BROWSER;

const modules = isBrowser ? false : 'commonjs'; // Use commonjs for Node

const targets = isBrowser
	? { browsers: [ 'last 2 versions', 'Safari >= 10', 'iOS >= 10', 'ie >= 11' ] }
	: { node: 'current' };

const config = {
	presets: [
		[
			'@babel/env',
			{
				modules,
				targets,
				useBuiltIns: 'entry',
				// allows es7 features like Promise.prototype.finally
				shippedProposals: true,
				// Exclude transforms that make all code slower, see https://github.com/facebook/create-react-app/pull/5278
				exclude: [ 'transform-typeof-symbol' ],
			},
		],
		'@babel/react',
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-syntax-dynamic-import',
		[
			'@babel/transform-runtime',
			{
				corejs: false, // we polyfill so we don't need core-js
				helpers: true,
				regenerator: false,
				useESModules: false,
			},
		],
	],
	overrides: [
		{
			test: [ './client/gutenberg/extensions', './packages/jetpack-blocks' ],
			plugins: [
				[
					'@wordpress/import-jsx-pragma',
					{
						scopeVariable: 'createElement',
						source: '@wordpress/element',
						isDefault: false,
					},
				],
				[
					'@babel/transform-react-jsx',
					{
						pragma: 'createElement',
					},
				],
			],
		},
	],
	env: {
		build_pot: {
			plugins: [
				[
					'@wordpress/babel-plugin-makepot',
					{
						output: 'build/i18n-calypso/gutenberg-strings.pot',
						headers: {
							'content-type': 'text/plain; charset=UTF-8',
							'x-generator': 'calypso',
						},
					},
				],
				[
					'@automattic/babel-plugin-i18n-calypso',
					{
						dir: 'build/i18n-calypso/',
						headers: {
							'content-type': 'text/plain; charset=UTF-8',
							'x-generator': 'calypso',
						},
					},
				],
			],
		},
		test: {
			presets: [ [ '@babel/env', { targets: { node: 'current' } } ] ],
			plugins: [
				'add-module-exports',
				'babel-plugin-dynamic-import-node',
				'./server/bundler/babel/babel-lodash-es',
			],
		},
	},
};

module.exports = config;