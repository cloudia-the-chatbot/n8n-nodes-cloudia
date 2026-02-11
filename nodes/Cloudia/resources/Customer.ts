import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		default: 'assign-user',
		options: [
			{
				name: 'Add Tag',
				value: 'add-tag',
				description: 'Add tag to customer',
				action: 'Add tag',
			},
			{
				name: 'Add to Sequence',
				value: 'add-to-sequence',
				description: 'Add customer to sequence',
				action: 'Add to sequence',
			},
			{
				name: 'Assign User',
				value: 'assign-user',
				description: 'Assign user to customer',
				action: 'Assign user',
			},
			{
				name: 'Remove From Sequence',
				value: 'remove-from-sequence',
				description: 'Remove customer from sequence',
				action: 'Remove from sequence',
			},
			{
				name: 'Remove Tag',
				value: 'remove-tag',
				description: 'Remove tag from customer',
				action: 'Remove tag',
			},
			{
				name: 'Unassign User',
				value: 'unassign-user',
				description: 'Unassign user from customer',
				action: 'Unassign user',
			},
			{
				name: 'Update Stage',
				value: 'update-stage',
				description: 'Update customer stage',
				action: 'Update stage',
			},
		],
	},
];

export const customerFields: INodeProperties[] = [
	{
		displayName: 'Cloudia API Key',
		name: 'xApiKey',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		placeholder: 'eyJh...',
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
			},
		},
		description: 'The customer ID to assign to the user',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		default: 0,
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				operation: ['assign-user'],
				resource: ['customer'],
			},
		},
		description: 'The user ID to assign to the customer',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'number',
		default: 0,
		placeholder: '123',
		displayOptions: {
			show: {
				operation: ['add-tag'],
				resource: ['customer'],
			},
		},
		description: 'The tag ID to remove from the customer',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'number',
		default: 0,
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				operation: ['remove-tag'],
				resource: ['customer'],
			},
		},
		description: 'The tag ID to remove from the customer',
	},
	{
		displayName: 'Tag Name',
		name: 'tagName',
		type: 'string',
		default: '',
		placeholder: 'Enter your tag name...',
		displayOptions: {
			show: {
				operation: ['add-tag'],
				resource: ['customer'],
			},
		},
		description: 'The tag name to add to the customer',
	},
	{
		displayName: 'Tag Color',
		name: 'tagColor',
		type: 'color',
		default: '',
		placeholder: '#ABF019',
		displayOptions: {
			show: {
				operation: ['add-tag'],
				resource: ['customer'],
			},
		},
		description: 'The HEX code color of the tag',
	},
	{
		displayName: 'Sequence ID',
		name: 'sequenceId',
		type: 'number',
		default: 0,
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				operation: ['add-to-sequence', 'remove-from-sequence'],
				resource: ['customer'],
			},
		},
		description: 'The sequence ID to add the customer to',
	},
	{
		displayName: 'Stage ID',
		name: 'stageId',
		type: 'number',
		default: 0,
		placeholder: '123',
		required: true,
		displayOptions: {
			show: {
				operation: ['update-stage'],
				resource: ['customer'],
			},
		},
		description: 'The stage ID to update the customer to',
	},
];

type BodyBuilder = (context: IExecuteFunctions, index: number) => IDataObject;
type UrlBuilder = (context: IExecuteFunctions, index: number) => string;

export const customerUrlBuilders: Record<string, UrlBuilder> = {
	'assign-user': (ctx, i) => 'assign_user',
	'unassign-user': (ctx, i) => 'unassign_user',
	'add-tag': (ctx, i) => `assign_tag_to_customer/${ctx.getNodeParameter('customerId', i)}`,
	'remove-tag': (ctx, i) =>
		`unassign_tag_to_customer/${ctx.getNodeParameter('customerId', i)}?idtag=${ctx.getNodeParameter('tagId', i)}`,
	'add-to-sequence': (ctx, i) => 'add_customers_to_sequence',
	'remove-from-sequence': (ctx, i) => 'remove_customers_from_sequence',
	'update-stage': (ctx, i) => `customers/${ctx.getNodeParameter('customerId', i)}/stage`,
};

export const customerBodyBuilders: Record<string, BodyBuilder> = {
	'assign-user': (ctx, i) => ({
		id_user: ctx.getNodeParameter('userId', i),
		id_customer: ctx.getNodeParameter('customerId', i),
	}),
	'unassign-user': (ctx, i) => ({
		id_customer: ctx.getNodeParameter('customerId', i),
	}),
	'add-tag': (ctx, i) => {
		const tagID = ctx.getNodeParameter('tagId', i);
		const tagName = ctx.getNodeParameter('tagName', i);
		const tagColor = ctx.getNodeParameter('tagColor', i);
		return {
			...(tagID ? (tagID !== 0 ? { tagID } : {}) : tagName ? { tagName } : {}),
			tagColor,
		};
	},
	'remove-tag': (ctx, i) => ({}),
	'add-to-sequence': (ctx, i) => ({
		customersIds: [ctx.getNodeParameter('customerId', i)],
		sequenceId: ctx.getNodeParameter('sequenceId', i),
	}),
	'remove-from-sequence': (ctx, i) => ({
		customersIds: [ctx.getNodeParameter('customerId', i)],
		sequenceId: ctx.getNodeParameter('sequenceId', i),
	}),
	'update-stage': (ctx, i) => ({
		id_stage: ctx.getNodeParameter('stageId', i),
	}),
};
