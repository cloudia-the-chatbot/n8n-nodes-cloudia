import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';

export const whatsappGupshupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-gupshup'],
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

export const whatsappGupshupFields: INodeProperties[] = [
	{
		displayName: 'Cloudia API Key',
		name: 'xApiKey',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		placeholder: 'eyJh...',
		displayOptions: {
			show: {
				resource: ['whatsapp-gupshup'],
			},
		},
		description: 'Fill this field if you are not using credentials',
	},
	{
		displayName: 'Channel Integration ID',
		name: 'channelIntegrationId',
		type: 'number',
		default: 0,
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-gupshup'],
			},
		},
		description: 'The channel integration ID to which to send the message',
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
				resource: ['whatsapp-gupshup'],
			},
		},
		description: 'The phone number to which to send the message',
	},
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				resource: ['whatsapp-gupshup'],
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
				resource: ['whatsapp-gupshup'],
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
				resource: ['whatsapp-gupshup'],
			},
		},
		description: 'Media URL to be sent',
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
				resource: ['whatsapp-gupshup'],
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
				resource: ['whatsapp-gupshup'],
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
				resource: ['whatsapp-gupshup'],
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
				resource: ['whatsapp-gupshup'],
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
				resource: ['whatsapp-gupshup'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'customerName',
				type: 'string',
				default: '',
				placeholder: 'Felipe Miranda',
				description: 'Name of the customer to be sent',
			},
		],
	},
];

type BodyBuilder = (context: IExecuteFunctions, index: number) => IDataObject;

export const whatsappGupshupBodyBuilders: Record<string, BodyBuilder> = {
	'send-text-template': (ctx, i) => ({
		phoneNumber: ctx.getNodeParameter('customerPhoneNumber', i),
		customerName: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('channelIntegrationId', i),
		template: {
			id: ctx.getNodeParameter('templateId', i),
			params: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
				? (ctx.getNodeParameter('templateParams', i) as any).property.map(
					(opt: any) => opt.templateParamValue,
				)
				: [],
		},
	}),
	'send-document-template': (ctx, i) => ({
		phoneNumber: ctx.getNodeParameter('customerPhoneNumber', i),
		customerName: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('channelIntegrationId', i),
		template: {
			id: ctx.getNodeParameter('templateId', i),
			params: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
				? (ctx.getNodeParameter('templateParams', i) as any).property.map(
					(opt: any) => opt.templateParamValue,
				)
				: [],
		},
		attachment: {
			type: 'document',
			document: {
				link: ctx.getNodeParameter('mediaUrl', i),
			},
		},
	}),
	'send-image-template': (ctx, i) => ({
		phoneNumber: ctx.getNodeParameter('customerPhoneNumber', i),
		customerName: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('channelIntegrationId', i),
		template: {
			id: ctx.getNodeParameter('templateId', i),
			params: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
				? (ctx.getNodeParameter('templateParams', i) as any).property.map(
					(opt: any) => opt.templateParamValue,
				)
				: [],
		},
		attachment: {
			type: 'image',
			image: {
				link: ctx.getNodeParameter('mediaUrl', i),
			},
		},
	}),
	'send-video-template': (ctx, i) => ({
		phoneNumber: ctx.getNodeParameter('customerPhoneNumber', i),
		customerName: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('channelIntegrationId', i),
		template: {
			id: ctx.getNodeParameter('templateId', i),
			params: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
				? (ctx.getNodeParameter('templateParams', i) as any).property.map(
					(opt: any) => opt.templateParamValue,
				)
				: [],
		},
		attachment: {
			type: 'video',
			video: {
				link: ctx.getNodeParameter('mediaUrl', i),
			},
		},
	}),
	'send-location-template': (ctx, i) => ({
		phoneNumber: ctx.getNodeParameter('customerPhoneNumber', i),
		customerName: ctx.getNodeParameter('additionalFields', i).customerName,
		channelIntegrationId: ctx.getNodeParameter('channelIntegrationId', i),
		template: {
			id: ctx.getNodeParameter('templateId', i),
			params: Array.isArray((ctx.getNodeParameter('templateParams', i) as any)?.property)
				? (ctx.getNodeParameter('templateParams', i) as any).property.map(
					(opt: any) => opt.templateParamValue,
				)
				: [],
		},
		attachment: {
			type: 'location',
			location: {
				name: ctx.getNodeParameter('locationName', i),
				address: ctx.getNodeParameter('locationAddress', i),
				longitude: ctx.getNodeParameter('locationLongitude', i),
				latitude: ctx.getNodeParameter('locationLatitude', i),
			},
		},
	}),
};
