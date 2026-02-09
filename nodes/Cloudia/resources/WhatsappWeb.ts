import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';

export const whatsappWebOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-web'],
			},
		},
		options: [
			{
				name: 'Send Audio',
				value: 'send-audio',
				description: 'Send audio message',
				action: 'Send audio',
			},
			{
				name: 'Send Contact',
				value: 'send-contact',
				description: 'Send contact message',
				action: 'Send contact',
			},
			{
				name: 'Send Document',
				value: 'send-document',
				description: 'Send document message',
				action: 'Send document',
			},
			{
				name: 'Send Image',
				value: 'send-image',
				description: 'Send image message',
				action: 'Send image',
			},
			{
				name: 'Send Location',
				value: 'send-location',
				description: 'Send location message',
				action: 'Send location',
			},
			{
				name: 'Send Options List',
				value: 'send-option-list',
				description: 'Send text message with options list',
				action: 'Send text with options list',
			},
			{
				name: 'Send Text',
				value: 'send-text',
				description: 'Send text message',
				action: 'Send text',
			},
			{
				name: 'Send Video',
				value: 'send-video',
				description: 'Send video message',
				action: 'Send video',
			},
		],
		default: 'send-text',
	},
];

export const whatsappWebFields: INodeProperties[] = [
	{
		displayName: 'Cloudia API Key',
		name: 'xApiKey',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		placeholder: 'eyJh...',
		displayOptions: {
			show: {
				resource: ['whatsapp-web'],
			},
		},
		description: 'Fill this field if you are not using credentials',
	},
	{
		displayName: 'Phone Number',
		name: 'customerPhoneNumber',
		type: 'string',
		default: '',
		placeholder: '5511999999999',
		required: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-web'],
			},
		},
		description: 'The phone number to which to send the message',
	},
	{
		displayName: 'Text',
		name: 'message',
		type: 'string',
		default: '',
		placeholder: 'Enter your message...',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-text', 'send-option-list'],
				resource: ['whatsapp-web'],
			},
		},
		description: 'Text to be sent',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Option',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-option-list'],
				resource: ['whatsapp-web'],
			},
		},
		options: [
			{
				name: 'property',
				displayName: 'Option',
				values: [
					{
						displayName: 'Option Title',
						name: 'optionTitle',
						type: 'string',
						default: '',
						required: true,
						description: 'Title of the option to set',
					},
					{
						displayName: 'Option Description',
						name: 'optionDescription',
						type: 'string',
						default: '',
						description: 'Description of the option to set',
					},
				],
			},
		],
		description: 'Adds a option to set also values which have not been predefined',
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
				operation: ['send-audio', 'send-document', 'send-image', 'send-video'],
				resource: ['whatsapp-web'],
			},
		},
		description: 'Media URL to be sent',
	},
	{
		displayName: 'Media Filename',
		name: 'mediaFileName',
		type: 'string',
		default: '',
		placeholder: 'Enter your filename...',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-audio', 'send-document', 'send-image', 'send-video'],
				resource: ['whatsapp-web'],
			},
		},
		description: 'Document filename to be sent',
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		default: '',
		placeholder: 'Enter your caption...',
		displayOptions: {
			show: {
				operation: ['send-document', 'send-image', 'send-video'],
				resource: ['whatsapp-web'],
			},
		},
		description: 'Caption to be sent',
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
				operation: ['send-location'],
				resource: ['whatsapp-web'],
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
				operation: ['send-location'],
				resource: ['whatsapp-web'],
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
				operation: ['send-location'],
				resource: ['whatsapp-web'],
			},
		},
		description: 'Longitude location to be sent',
	},
	{
		displayName: 'Contact Name',
		name: 'contactName',
		type: 'string',
		default: '',
		placeholder: 'Felipe Miranda',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-contact'],
				resource: ['whatsapp-web'],
			},
		},
		description: 'Contact name to be sent',
	},
	{
		displayName: 'Contact Phone',
		name: 'contactPhone',
		type: 'string',
		default: '',
		placeholder: '5511999999999',
		required: true,
		displayOptions: {
			show: {
				operation: ['send-contact'],
				resource: ['whatsapp-web'],
			},
		},
		description: 'Contact phone to be sent',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['whatsapp-web'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Channel Integration ID',
				name: 'channelIntegrationId',
				type: 'number',
				default: 0,
				placeholder: '123',
				description: 'The channel integration ID to which to send the message',
			},
			{
				displayName: 'Name',
				name: 'customerName',
				type: 'string',
				default: '',
				placeholder: 'Felipe Miranda',
				description: 'Name of the customer to be sent',
			},
			{
				displayName: 'Sent by',
				name: 'sentBy',
				type: 'options',
				options: [
					{
						name: 'Attendant',
						value: 'human',
					},
					{
						name: 'Bot',
						value: 'bot',
					},
					{
						name: 'System',
						value: 'system',
					},
				],
				default: ['bot'],
				description: 'Indicates by whom the message should appear as sent',
			},
		],
	},
];

type BodyBuilder = (context: IExecuteFunctions, index: number) => IDataObject;

export const whatsappWebBodyBuilders: Record<string, BodyBuilder> = {
	'send-text': (ctx, i) => ({
		phone: ctx.getNodeParameter('customerPhoneNumber', i),
		message: ctx.getNodeParameter('message', i),
		name: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('additionalFields', i).channelIntegrationId,
		sentByCloudia: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'bot',
		sentBySystem: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'system',
	}),
	'send-option-list': (ctx, i) => ({
		phone: ctx.getNodeParameter('customerPhoneNumber', i),
		message: ctx.getNodeParameter('message', i),
		name: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('additionalFields', i).channelIntegrationId,
		sentByCloudia: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'bot',
		sentBySystem: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'system',
		messageType: 'option_list',
		options:
			(ctx.getNodeParameter('options', i) as { property?: IDataObject[] })?.property?.map(
				(option) => ({
					title: option.optionTitle as string,
					description: option.optionDescription as string,
				}),
			) || [],
	}),
	'send-audio': (ctx, i) => ({
		phone: ctx.getNodeParameter('customerPhoneNumber', i),
		name: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('additionalFields', i).channelIntegrationId,
		sentByCloudia: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'bot',
		sentBySystem: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'system',
		messageType: 'audio',
		mediaUrl: ctx.getNodeParameter('mediaUrl', i),
		fileName: ctx.getNodeParameter('mediaFileName', i),
	}),
	'send-document': (ctx, i) => ({
		phone: ctx.getNodeParameter('customerPhoneNumber', i),
		message: ctx.getNodeParameter('caption', i),
		name: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('additionalFields', i).channelIntegrationId,
		sentByCloudia: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'bot',
		sentBySystem: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'system',
		messageType: 'file',
		mediaUrl: ctx.getNodeParameter('mediaUrl', i),
		fileName: ctx.getNodeParameter('mediaFileName', i),
	}),
	'send-image': (ctx, i) => ({
		phone: ctx.getNodeParameter('customerPhoneNumber', i),
		message: ctx.getNodeParameter('caption', i),
		name: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('additionalFields', i).channelIntegrationId,
		sentByCloudia: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'bot',
		sentBySystem: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'system',
		messageType: 'image',
		mediaUrl: ctx.getNodeParameter('mediaUrl', i),
		fileName: ctx.getNodeParameter('mediaFileName', i),
	}),
	'send-video': (ctx, i) => ({
		phone: ctx.getNodeParameter('customerPhoneNumber', i),
		message: ctx.getNodeParameter('caption', i),
		name: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('additionalFields', i).channelIntegrationId,
		sentByCloudia: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'bot',
		sentBySystem: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'system',
		messageType: 'video',
		mediaUrl: ctx.getNodeParameter('mediaUrl', i),
		fileName: ctx.getNodeParameter('mediaFileName', i),
	}),
	'send-location': (ctx, i) => ({
		phone: ctx.getNodeParameter('customerPhoneNumber', i),
		name: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('additionalFields', i).channelIntegrationId,
		sentByCloudia: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'bot',
		sentBySystem: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'system',
		messageType: 'location',
		address: ctx.getNodeParameter('locationAddress', i),
		latitude: ctx.getNodeParameter('locationLatitude', i),
		longitude: ctx.getNodeParameter('locationLongitude', i),
	}),
	'send-contact': (ctx, i) => ({
		phone: ctx.getNodeParameter('customerPhoneNumber', i),
		name: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('additionalFields', i).channelIntegrationId,
		sentByCloudia: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'bot',
		sentBySystem: (ctx.getNodeParameter('additionalFields', i)?.sentBy ?? 'bot') == 'system',
		messageType: 'contact',
		contactName: ctx.getNodeParameter('contactName', i),
		contactPhone: ctx.getNodeParameter('contactPhone', i),
	}),
};
