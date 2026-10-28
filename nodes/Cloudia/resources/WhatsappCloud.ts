import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';

export const whatsappCloudOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		options: [
			{
				name: 'Send Document Template',
				value: 'send-document-template',
				description: 'Send document template message',
				action: 'Send document template',
			},
			{
				name: 'Send Image Template',
				value: 'send-image-template',
				description: 'Send image template message',
				action: 'Send image template',
			},
			{
				name: 'Send Location Template',
				value: 'send-location-template',
				description: 'Send location template message',
				action: 'Send location template',
			},
			{
				name: 'Send Text Template',
				value: 'send-text-template',
				description: 'Send text template message',
				action: 'Send text template',
			},
			{
				name: 'Send Video Template',
				value: 'send-video-template',
				description: 'Send video template message',
				action: 'Send video template',
			},
		],
		default: 'send-text-template',
	},
];

export const whatsappCloudFields: INodeProperties[] = [
	{
		displayName: 'Cloudia API Key',
		name: 'xApiKey',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		placeholder: 'eyJh...',
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'Fill this field if you are not using credentials',
	},
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'number',
		default: 0,
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'The customer ID to assign to the user',
	},
	/* {
		displayName: 'Channel Integration ID',
		name: 'channelIntegrationId',
		type: 'number',
		default: 0,
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'The channel integration ID to which to send the message',
	}, */
	/* {
		displayName: 'Phone Number',
		name: 'customerPhoneNumber',
		type: 'string',
		default: '',
		placeholder: '5511999999999',
		required: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'The phone number to which to send the message',
	}, */
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'The template ID to which to send the message',
	},
	{
		displayName: 'Template Parameters',
		name: 'templateParams',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Parameter',
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		options: [
			{
				name: 'property',
				displayName: 'Parameter',
				values: [
					{
						displayName: 'Parameter Value',
						name: 'templateParamValue',
						type: 'string',
						default: '',
						required: true,
						description: 'Value of the parameter',
					},
				],
			},
		],
		description: 'Adds parameters to set variables predefined in the template',
	},
	{
		displayName: 'Media URL',
		name: 'mediaUrl',
		type: 'string',
		default: '',
		placeholder: 'https://www.sample.com/image.png',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-document-template', 'send-image-template', 'send-video-template'],
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'Media URL to be sent',
	},
	{
		displayName: 'Media Filename',
		name: 'fileName',
		type: 'string',
		default: '',
		placeholder: 'Enter your filename...',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-document-template', 'send-image-template', 'send-video-template'],
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'Document filename to be sent',
	},
	{
		displayName: 'Button URL Type',
		name: 'buttonUrlType',
		type: 'options',
		default: 'none',
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		options: [
			{ name: 'None', value: 'none', description: 'Do not send button parameters' },
			{ name: 'Static URL', value: 'static', description: 'Use the URL configured in the template' },
			{ name: 'Dynamic URL', value: 'dynamic', description: 'Send dynamic URL button parameters' },
		],
		description: 'Optionally add URL button parameters to the template message',
	},
	{
		displayName: 'Dynamic URL Button Parameters',
		name: 'dynamicUrlButtonParameters',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		placeholder: 'Add Button Parameter',
		displayOptions: {
			show: {
				buttonUrlType: ['dynamic'],
				resource: ['whatsapp-cloud'],
			},
		},
		options: [
			{
				name: 'property',
				displayName: 'Button Parameter',
				values: [
					{
						displayName: 'URL Parameter Value',
						name: 'value',
						type: 'string',
						default: '',
						required: true,
						description: 'Value to replace the dynamic part of the template button URL',
					},
				],
			},
		],
		description: 'Adds dynamic URL button parameter values in the same order as the template buttons',
	},
	{
		displayName: 'Address Name',
		name: 'locationName',
		type: 'string',
		default: '',
		placeholder: 'Cloudia',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-location-template'],
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'Name location to be sent',
	},
	{
		displayName: 'Address Location',
		name: 'locationAddress',
		type: 'string',
		default: '',
		placeholder: 'Av. Paulista 171, Pavimento 4 - Bela Vista, São Paulo - SP, 01311-000',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-location-template'],
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'Address location to be sent',
	},
	{
		displayName: 'Latitude',
		name: 'locationLatitude',
		type: 'number',
		default: '',
		placeholder: '-23.570323',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-location-template'],
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'Latitude location to be sent',
	},
	{
		displayName: 'Longitude',
		name: 'locationLongitude',
		type: 'number',
		default: '',
		placeholder: '-46.6508174',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-location-template'],
				resource: ['whatsapp-cloud'],
			},
		},
		description: 'Longitude location to be sent',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['whatsapp-cloud'],
			},
		},
		default: {},
		options: [
			/* {
				displayName: 'Name',
				name: 'customerName',
				type: 'string',
				default: '',
				placeholder: 'Felipe Miranda',
				description: 'Name of the customer to be sent',
			}, */
			{
				displayName: 'Sent by',
				name: 'sentBy',
				type: 'options',
				options: [
					{
						name: 'Attendant',
						value: 'ATTENDANT',
					},
					{
						name: 'Bot',
						value: 'BOT',
					},
					/* {
						name: 'System',
						value: 'system',
					}, */
				],
				default: ['BOT'],
				description: 'Indicates by whom the message should appear as sent',
			},
		],
	},
];

type BodyBuilder = (context: IExecuteFunctions, index: number) => IDataObject;

const getButtonParams = (ctx: IExecuteFunctions, i: number): IDataObject => {
	const buttonUrlType = ctx.getNodeParameter('buttonUrlType', i) ?? 'none';

	if (buttonUrlType === 'static') {
		return { buttonParams: [] };
	}

	if (buttonUrlType === 'dynamic') {
		const parameters = (ctx.getNodeParameter('dynamicUrlButtonParameters', i) as any)?.property;
		return {
			buttonParams: Array.isArray(parameters)
				? parameters.map((param: any) => ({ type: 'URL', value: param.value }))
				: [],
		};
	}

	return {};
};

export const whatsappCloudBodyBuilders: Record<string, BodyBuilder> = {
	'send-text-template': (ctx, i) => ({
		customerId: ctx.getNodeParameter('customerId', i),
		templateId: String(ctx.getNodeParameter('templateId', i)),
		templateParams: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
			? (ctx.getNodeParameter('templateParams', i) as any).property.flatMap((opt: any) =>
				Array.isArray(opt.templateParamValue)
					? opt.templateParamValue
					: [opt.templateParamValue],
			)
			: [],
		sentBy: ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'BOT',
		keepCurrentBotState: true,
		...getButtonParams(ctx, i),
	}),
	'send-document-template': (ctx, i) => ({
		customerId: ctx.getNodeParameter('customerId', i),
		templateId: String(ctx.getNodeParameter('templateId', i)),
		templateParams: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
			? (ctx.getNodeParameter('templateParams', i) as any).property.flatMap((opt: any) =>
				Array.isArray(opt.templateParamValue)
					? opt.templateParamValue
					: [opt.templateParamValue],
			)
			: [],
		sentBy: ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'BOT',
		mediaUrl: ctx.getNodeParameter('mediaUrl', i),
		mediaType: 'FILE',
		fileName: ctx.getNodeParameter('fileName', i),
		keepCurrentBotState: true,
		...getButtonParams(ctx, i),
	}),
	'send-image-template': (ctx, i) => ({
		customerId: ctx.getNodeParameter('customerId', i),
		templateId: String(ctx.getNodeParameter('templateId', i)),
		templateParams: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
			? (ctx.getNodeParameter('templateParams', i) as any).property.flatMap((opt: any) =>
				Array.isArray(opt.templateParamValue)
					? opt.templateParamValue
					: [opt.templateParamValue],
			)
			: [],
		sentBy: ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'BOT',
		mediaUrl: ctx.getNodeParameter('mediaUrl', i),
		mediaType: 'IMAGE',
		keepCurrentBotState: true,
		...getButtonParams(ctx, i),
	}),
	'send-video-template': (ctx, i) => ({
		customerId: ctx.getNodeParameter('customerId', i),
		templateId: String(ctx.getNodeParameter('templateId', i)),
		templateParams: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
			? (ctx.getNodeParameter('templateParams', i) as any).property.flatMap((opt: any) =>
				Array.isArray(opt.templateParamValue)
					? opt.templateParamValue
					: [opt.templateParamValue],
			)
			: [],
		sentBy: ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'BOT',
		mediaUrl: ctx.getNodeParameter('mediaUrl', i),
		mediaType: 'VIDEO',
		keepCurrentBotState: true,
		...getButtonParams(ctx, i),
	}),
	'send-location-template': (ctx, i) => ({
		customerId: ctx.getNodeParameter('customerId', i),
		templateId: String(ctx.getNodeParameter('templateId', i)),
		templateParams: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
			? (ctx.getNodeParameter('templateParams', i) as any).property.flatMap((opt: any) =>
				Array.isArray(opt.templateParamValue)
					? opt.templateParamValue
					: [opt.templateParamValue],
			)
			: [],
		sentBy: ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'BOT',
		location: {
			name: ctx.getNodeParameter('locationName', i),
			address: ctx.getNodeParameter('locationAddress', i),
			longitude: String(ctx.getNodeParameter('locationLongitude', i)),
			latitude: String(ctx.getNodeParameter('locationLatitude', i)),
		},
		keepCurrentBotState: true,
		...getButtonParams(ctx, i),
	}),
};
