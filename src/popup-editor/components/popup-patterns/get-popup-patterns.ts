/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { _x, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import type { PopupPattern } from '@nelio/popups/types';

const blockPatterns = [
	{
		name: 'nelio-popups/call-to-action',
		title: _x( 'Call to Action', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/group',
				isValid: true,
				attributes: {
					tagName: 'div',
					style: {
						color: {
							background: '#ffffff',
						},
					},
				},
				innerBlocks: [
					{
						name: 'core/heading',
						isValid: true,
						attributes: {
							content: _x(
								'Get Exclusive Offers',
								'user',
								'nelio-popups'
							),
							level: 2,
							textAlign: 'center',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						attributes: {
							align: 'center',
							content: _x(
								'Get access to exclusive exhibits and sales.',
								'user',
								'nelio-popups'
							),
							dropCap: false,
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: _x(
										'Call to Action',
										'text',
										'nelio-popups'
									),
									className: 'is-style-outline',
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/new-collection',
		title: _x( 'New Collection', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/media-text',
				isValid: true,
				validationIssues: [],
				attributes: {
					align: 'full',
					mediaAlt: '',
					mediaPosition: 'right',
					mediaUrl:
						'https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
					mediaType: 'image',
					mediaWidth: 50,
					isStackedOnMobile: false,
					imageFill: false,
				},
				innerBlocks: [
					{
						name: 'core/heading',
						isValid: true,
						validationIssues: [],
						attributes: {
							textAlign: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( 'New Collection', 'text', 'nelio-popups' )
							),
							level: 3,
							fontSize: 'large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/heading',
						isValid: true,
						validationIssues: [],
						attributes: {
							textAlign: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( '10% OFF', 'text', 'nelio-popups' )
							),
							level: 2,
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'Get a discount on all <br />items in your next order',
								'user',
								'nelio-popups'
							),
							dropCap: false,
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: _x(
										'Shop Now',
										'command',
										'nelio-popups'
									),
									width: 50,
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/announcement',
		title: _x( 'Announcement', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/group',
				isValid: true,
				validationIssues: [],
				attributes: {
					tagName: 'div',
					align: 'full',
					style: {
						color: {
							background: '#030000',
						},
					},
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x(
									'PASTA IS NEVER ENOUGH',
									'text',
									'nelio-popups'
								)
							),
							dropCap: false,
							style: {
								typography: {
									fontSize: '40px',
								},
							},
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( 'NEW TASTING MENU', 'text', 'nelio-popups' )
							),
							dropCap: false,
							style: {
								typography: {
									fontSize: '30px',
								},
							},
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/image',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							url: 'https://images.unsplash.com/photo-1623243020684-9f8bcefe6e94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
							alt: '',
							caption: '',
							width: 510,
							height: 341,
							sizeSlug: 'full',
							linkDestination: 'none',
							style: {
								border: {
									radius: '10px',
								},
							},
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'<strong>Never know which Pasta dish to get? Think no more!</strong><br><strong>Sola Pasta Bar</strong> just introduced a <em><strong>Pasta Tasting Menu</strong></em> which gives customers the chance to try <em><strong>5 different pastas</strong></em>.',
								'text',
								'nelio-popups'
							),
							dropCap: false,
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: _x(
										'LEARN MORE',
										'command',
										'nelio-popups'
									),
									style: {
										color: {
											background: '#fffbfb',
											text: '#030000',
										},
									},
									width: 100,
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/sale-notification',
		title: _x( 'Sale Notification', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/group',
				isValid: true,
				validationIssues: [],
				attributes: {
					tagName: 'div',
					align: 'full',
					style: {
						color: {
							background: '#1d868b',
						},
					},
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'Women’s sunglasses<br><strong>25% off</strong>',
								'text',
								'nelio-popups'
							),
							dropCap: false,
							textColor: 'background',
							fontSize: 'large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/separator',
						isValid: true,
						validationIssues: [],
						attributes: {
							opacity: 'alpha-channel',
							style: {
								color: {
									background: '#dbdbdb',
								},
							},
							className: 'is-style-default',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'Sale ends on<br><strong>09/08/2022</strong>',
								'text',
								'nelio-popups'
							),
							dropCap: false,
							style: {
								typography: {
									fontSize: '20px',
								},
							},
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: _x(
										'SHOP NOW',
										'command',
										'nelio-popups'
									),
									backgroundColor: 'foreground',
									textColor: 'background',
									width: 50,
									style: {
										border: {
											radius: '5px',
										},
									},
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/exit-intent',
		title: _x( 'Exit Intent', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/group',
				isValid: true,
				validationIssues: [],
				attributes: {
					tagName: 'div',
					align: 'full',
					backgroundColor: 'primary',
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( 'LEAVING SO SOON?', 'user', 'nelio-popups' )
							),
							dropCap: false,
							textColor: 'background',
							fontSize: 'x-large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'GET 15% OFF FOR YOUR FIRST PURCHASE WITH THIS COUPON',
								'user',
								'nelio-popups'
							),
							dropCap: false,
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: _x(
										'DISCOUNT15',
										'text',
										'nelio-popups'
									),
									textColor: 'luminous-vivid-amber',
									width: 75,
									className: 'is-style-outline',
								},
								innerBlocks: [],
							},
						],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: _x(
										'CONTINUE SHOPPING',
										'command',
										'nelio-popups'
									),
									backgroundColor: 'background',
									textColor: 'primary',
									width: 75,
								},
								innerBlocks: [],
							},
						],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'No thanks, I’d rather pay the full price',
								'text',
								'nelio-popups'
							),
							dropCap: false,
							textColor: 'background',
							fontSize: 'small',
						},
						innerBlocks: [],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/thanksgiving-day',
		title: _x( 'Thanksgiving Day', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/group',
				isValid: true,
				validationIssues: [],
				attributes: {
					tagName: 'div',
					align: 'full',
					style: {
						color: {
							background: '#b71140',
						},
					},
				},
				innerBlocks: [
					{
						name: 'core/image',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							url: 'https://images.unsplash.com/photo-1538883689728-2c32af36a313?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
							alt: '',
							caption: '',
							width: 743,
							height: 496,
							sizeSlug: 'full',
							linkDestination: 'none',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( '-50% FOR ALL', 'text', 'nelio-popups' )
							),
							dropCap: false,
							textColor: 'background',
							fontSize: 'x-large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'Give presents to your family for Thanksgiving Day',
								'user',
								'nelio-popups'
							),
							dropCap: false,
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/separator',
						isValid: true,
						validationIssues: [],
						attributes: {
							opacity: 'alpha-channel',
							align: 'wide',
							style: {
								color: {
									background: '#ffaeae',
								},
							},
							className: 'is-style-default',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'Your coupon code:',
								'text',
								'nelio-popups'
							),
							dropCap: false,
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: 'GET50',
									textColor: 'background',
									width: 75,
									style: {
										border: {
											radius: '40px',
										},
									},
									className: 'is-style-outline',
								},
								innerBlocks: [],
							},
						],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: sprintf(
										'<strong>%s</strong>',
										_x(
											'START SHOPPING',
											'command',
											'nelio-popups'
										)
									),
									backgroundColor: 'luminous-vivid-amber',
									textColor: 'foreground',
									width: 75,
									style: {
										border: {
											radius: '40px',
										},
										typography: {
											fontSize: '1.2rem',
										},
									},
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/black-friday-coupon',
		title: _x( 'Black Friday Coupon', 'text', 'nelio-poppups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/group',
				isValid: true,
				validationIssues: [],
				attributes: {
					tagName: 'div',
					align: 'full',
					style: {
						color: {
							background: '#2c2b35',
						},
					},
				},
				innerBlocks: [
					{
						name: 'core/image',
						isValid: true,
						validationIssues: [],
						attributes: {
							url: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
							alt: '',
							caption: '',
							sizeSlug: 'full',
							linkDestination: 'none',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( '-50% FOR ALL', 'text', 'nelio-popups' )
							),
							style: { color: { text: '#fafafa' } },
							dropCap: false,
							fontSize: 'x-large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'Your coupon code:',
								'text',
								'nelio-popups'
							),
							dropCap: false,
							style: { color: { text: '#fafafa' } },
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: _x(
										'GET 50',
										'command',
										'nelio-popups'
									),
									textColor: 'tertiary',
									width: 75,
									className: 'is-style-outline',
								},
								innerBlocks: [],
							},
						],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: sprintf(
										'<strong>%s</strong>',
										_x(
											'START SHOPPING',
											'command',
											'nelio-popups'
										)
									),
									textColor: 'tertiary',
									width: 75,
									style: {
										color: {
											background: '#fd5753',
										},
									},
									className: 'is-style-fill',
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/three-days-only',
		title: _x( '3 Days Only', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/media-text',
				isValid: true,
				validationIssues: [],
				attributes: {
					align: 'full',
					mediaAlt: '',
					mediaPosition: 'right',
					mediaUrl:
						'https://images.unsplash.com/photo-1527264935190-1401c51b5bbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
					mediaType: 'image',
					mediaWidth: 50,
					isStackedOnMobile: true,
					imageFill: false,
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( '3 DAYS ONLY', 'text', 'nelio-popups' )
							),
							dropCap: false,
							placeholder: _x(
								'Content…',
								'text',
								'nelio-popups'
							),
							fontSize: 'x-large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'Get an exclusive discount 15%',
								'user',
								'nelio-popups'
							),
							dropCap: false,
						},
						innerBlocks: [],
					},
					{
						name: 'core/spacer',
						isValid: true,
						validationIssues: [],
						attributes: {
							height: '23px',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: sprintf(
										'<strong>%s</strong>',
										_x(
											'Yes, I want the deal!',
											'text',
											'nelio-popups'
										)
									),
									width: 75,
									style: {
										color: {
											background: '#c32938',
											text: '#d7d3be',
										},
									},
								},
								innerBlocks: [],
							},
						],
					},
					{
						name: 'core/spacer',
						isValid: true,
						validationIssues: [],
						attributes: {
							height: '23px',
						},
						innerBlocks: [],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/covid-update',
		title: _x( 'COVID-19 Update', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/cover',
				isValid: true,
				validationIssues: [],
				attributes: {
					useFeaturedImage: false,
					alt: '',
					hasParallax: false,
					isRepeated: false,
					dimRatio: 100,
					overlayColor: 'foreground',
					backgroundType: 'image',
					isDark: true,
					align: 'full',
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( 'COVID-10 Update', 'text', 'nelio-popups' )
							),
							dropCap: false,
							fontSize: 'x-large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/image',
						isValid: true,
						validationIssues: [],
						attributes: {
							url: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
							alt: '',
							caption: '',
							width: 620,
							height: 349,
							sizeSlug: 'full',
							linkDestination: 'none',
							style: {
								border: {
									radius: '5px',
								},
							},
							className: 'is-style-default',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'We want to reassure our customers that we’re still in business during the COVID 19 pandemic. All of our team has been made aware of the importance of social distancing, regular hand-washing and social isolation.',
								'text',
								'nelio-popups'
							),
							dropCap: false,
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'If you have any enquiries, feel free to contact us',
								'text',
								'nelio-popups'
							),
							dropCap: false,
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: _x(
										'GET IN TOUCH',
										'command',
										'nelio-popups'
									),
									backgroundColor: 'tertiary',
									textColor: 'foreground',
									width: 100,
									style: {
										border: {
											radius: '5px',
										},
									},
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/new-year-sale',
		title: _x( 'New Year Sale', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/cover',
				isValid: true,
				attributes: {
					url: 'https://images.unsplash.com/photo-1562379871-38893e81af71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2037&q=80',
					useFeaturedImage: false,
					alt: '',
					dimRatio: 50,
					backgroundType: 'image',
					isDark: false,
					align: 'full',
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x(
									'Last Sale of the Year!',
									'text',
									'nelio-popups'
								)
							),
							dropCap: false,
							fontSize: 'large',
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( '-40% FOR ALL', 'text', 'nelio-popups' )
							),
							dropCap: false,
							placeholder: _x(
								'Write title…',
								'user',
								'nelio-popups'
							),
							fontSize: 'x-large',
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: _x(
								'Grab your coupon here:',
								'user',
								'nelio-popups'
							),
							dropCap: false,
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: sprintf(
										'<strong>%s</strong>',
										_x( 'GET40', 'text', 'nelio-popups' )
									),
									width: 75,
									className: 'is-style-outline',
									textColor: 'background',
								},
								innerBlocks: [],
							},
						],
					},
					{
						name: 'core/spacer',
						isValid: true,
						validationIssues: [],
						attributes: {
							height: '10px',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: sprintf(
										'<strong>%s</strong>',
										_x( 'I’M IN!', 'text', 'nelio-popups' )
									),
									backgroundColor: 'vivid-red',
									textColor: 'background',
									width: 75,
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/cyber-monday',
		title: _x( 'Cyber Monday', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/cover',
				isValid: true,
				validationIssues: [],
				attributes: {
					url: 'https://images.unsplash.com/photo-1612521479339-283554c395fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2838&q=80',
					useFeaturedImage: false,
					alt: '',
					hasParallax: false,
					isRepeated: false,
					dimRatio: 50,
					backgroundType: 'image',
					isDark: false,
					align: 'full',
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x( 'CYBER MONDAY', 'text', 'nelio-popups' )
							),
							dropCap: false,
							textColor: 'background',
							fontSize: 'large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x(
									'A Special Offer for you',
									'text',
									'nelio-popups'
								)
							),
							dropCap: false,
							placeholder: _x(
								'Write title…',
								'user',
								'nelio-popups'
							),
							textColor: 'background',
							fontSize: 'large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x(
									'Up to 30% of on all the items in online shop with coupon:',
									'text',
									'nelio-popups'
								)
							),
							dropCap: false,
							textColor: 'background',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: sprintf(
										'<strong>%s</strong>',
										_x(
											'GET 50',
											'command',
											'nelio-popups'
										)
									),
									textColor: 'background',
									width: 75,
									className: 'is-style-outline',
								},
								innerBlocks: [],
							},
						],
					},
					{
						name: 'core/spacer',
						isValid: true,
						validationIssues: [],
						attributes: {
							height: '10px',
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: sprintf(
										'<strong>%s</strong>',
										_x( 'I’M IN!', 'text', 'nelio-popups' )
									),
									backgroundColor: 'background',
									textColor: 'foreground',
									width: 75,
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/valentine-day',
		title: _x( 'Valentine’s Day', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/cover',
				isValid: true,
				validationIssues: [],
				attributes: {
					url: 'https://images.unsplash.com/photo-1517607648415-b431854daa86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2834&q=80',
					useFeaturedImage: false,
					alt: '',
					hasParallax: false,
					isRepeated: false,
					dimRatio: 0,
					backgroundType: 'image',
					isDark: false,
					align: 'full',
				},
				innerBlocks: [
					{
						name: 'core/columns',
						isValid: true,
						validationIssues: [],
						attributes: {
							isStackedOnMobile: true,
						},
						innerBlocks: [
							{
								name: 'core/column',
								isValid: true,
								validationIssues: [],
								attributes: {},
								innerBlocks: [
									{
										name: 'core/spacer',
										isValid: true,
										validationIssues: [],
										attributes: {
											height: '79px',
										},
										innerBlocks: [],
									},
									{
										name: 'core/paragraph',
										isValid: true,
										validationIssues: [],
										attributes: {
											align: 'center',
											content: sprintf(
												'<strong>%1$s</strong><br><strong>%2$s</strong>',
												_x(
													'Valentine’s Day Sale!',
													'text',
													'nelio-popups'
												),
												_x(
													'-50% FOR ALL',
													'text',
													'nelio-popups'
												)
											),
											dropCap: false,
											textColor: 'vivid-red',
											fontSize: 'x-large',
										},
										innerBlocks: [],
									},
									{
										name: 'core/paragraph',
										isValid: true,
										validationIssues: [],
										attributes: {
											align: 'center',
											content: _x(
												'Your coupon code:',
												'text',
												'nelio-popups'
											),
											dropCap: false,
											textColor: 'vivid-red',
										},
										innerBlocks: [],
									},
									{
										name: 'core/buttons',
										isValid: true,
										validationIssues: [],
										attributes: {
											layout: {
												type: 'flex',
												justifyContent: 'center',
											},
										},
										innerBlocks: [
											{
												name: 'core/button',
												isValid: true,
												validationIssues: [],
												attributes: {
													text: _x(
														'GET50',
														'command',
														'nelio-popups'
													),
													textColor: 'vivid-red',
													width: 75,
													className:
														'is-style-outline',
												},
												innerBlocks: [],
											},
											{
												name: 'core/button',
												isValid: true,
												validationIssues: [],
												attributes: {
													text: sprintf(
														'<strong>%s</strong>',
														_x(
															'START SHOPPING',
															'text',
															'nelio-popups'
														)
													),
													backgroundColor:
														'vivid-red',
													width: 75,
													style: {
														color: {
															text: '#e0e2e4',
														},
													},
													className:
														'is-style-outline',
												},
												innerBlocks: [],
											},
										],
									},
								],
							},
							{
								name: 'core/column',
								isValid: true,
								validationIssues: [],
								attributes: {},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/special-for-you',
		title: _x( 'Special for you', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/cover',
				isValid: true,
				validationIssues: [],
				attributes: {
					url: 'https://images.unsplash.com/photo-1608539660846-1b4990ac8b3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2731&q=80',
					useFeaturedImage: false,
					alt: '',
					hasParallax: false,
					isRepeated: false,
					dimRatio: 0,
					backgroundType: 'image',
					isDark: false,
					align: 'full',
				},
				innerBlocks: [
					{
						name: 'core/columns',
						isValid: true,
						validationIssues: [],
						attributes: {
							isStackedOnMobile: true,
						},
						innerBlocks: [
							{
								name: 'core/column',
								isValid: true,
								validationIssues: [],
								attributes: {
									width: '60%',
								},
								innerBlocks: [],
							},
							{
								name: 'core/column',
								isValid: true,
								validationIssues: [],
								attributes: {
									width: '40%',
								},
								innerBlocks: [
									{
										name: 'core/paragraph',
										isValid: true,
										validationIssues: [],
										attributes: {
											align: 'center',
											content: sprintf(
												'<strong>%s</strong>',
												_x(
													'Hey, we’ve got something special for you',
													'text',
													'nelio-popups'
												)
											),
											dropCap: false,
											style: {
												typography: {
													fontSize: '23px',
												},
											},
										},
										innerBlocks: [],
									},
									{
										name: 'core/paragraph',
										isValid: true,
										validationIssues: [],
										attributes: {
											align: 'center',
											// eslint-disable-next-line @wordpress/i18n-translator-comments
											content: _x(
												'We started our winter sale.<br>You can get up to 15% discount.<br>Don’t miss the chance.',
												'text',
												'nelio-popups'
											),
											dropCap: false,
										},
										innerBlocks: [],
									},
									{
										name: 'core/buttons',
										isValid: true,
										validationIssues: [],
										attributes: {
											layout: {
												type: 'flex',
												justifyContent: 'center',
											},
										},
										innerBlocks: [
											{
												name: 'core/button',
												isValid: true,
												validationIssues: [],
												attributes: {
													text: sprintf(
														'<strong>%s</strong>',
														_x(
															'Yes, give me 15% off',
															'text',
															'nelio-popups'
														)
													),
													backgroundColor:
														'foreground',
													width: 100,
													style: {
														border: {
															radius: '30px',
														},
													},
												},
												innerBlocks: [],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'nelio-popups/black-friday',
		title: _x( 'Black Friday', 'text', 'nelio-popups' ),
		viewportWidth: 900,
		categories: [ 'nelio-popups' ],
		description: '',
		blocks: [
			{
				name: 'core/group',
				isValid: true,
				validationIssues: [],
				attributes: {
					tagName: 'div',
					align: 'full',
					style: {
						color: {
							background: '#010000',
						},
					},
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						isValid: true,
						validationIssues: [],
						attributes: {
							align: 'center',
							content: sprintf(
								'<strong>%s</strong>',
								_x(
									'Black Friday Sale!',
									'text',
									'nelio-popups'
								)
							),
							dropCap: false,
							placeholder: _x(
								'Write title…',
								'user',
								'nelio-popups'
							),
							textColor: 'background',
							fontSize: 'large',
						},
						innerBlocks: [],
					},
					{
						name: 'core/heading',
						isValid: true,
						validationIssues: [],
						attributes: {
							textAlign: 'center',
							content: _x(
								'<strong>GET 30% <br>DISCOUNT</strong>',
								'user',
								'nelio-popups'
							),
							level: 2,
							style: {
								typography: {
									textTransform: 'uppercase',
									fontSize: '60px',
								},
								color: {
									text: '#ffbc06',
								},
							},
						},
						innerBlocks: [],
					},
					{
						name: 'core/buttons',
						isValid: true,
						validationIssues: [],
						attributes: {
							layout: {
								type: 'flex',
								justifyContent: 'center',
							},
						},
						innerBlocks: [
							{
								name: 'core/button',
								isValid: true,
								validationIssues: [],
								attributes: {
									text: sprintf(
										'<strong>%s</strong>',
										_x(
											'GET DISCOUNT',
											'command',
											'nelio-popups'
										)
									),
									style: {
										color: {
											background: '#febc07',
										},
									},
									textColor: 'foreground',
									width: 100,
								},
								innerBlocks: [],
							},
						],
					},
				],
			},
		],
	},
];

export function getPopupPatterns(): ReadonlyArray< PopupPattern > {
	return applyFilters(
		'nelio_popups.popup_patterns',
		blockPatterns
	) as ReadonlyArray< PopupPattern >;
} //end getPopupPatterns()
