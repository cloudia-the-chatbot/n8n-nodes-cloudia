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
				name: 'Add Annotation',
				value: 'create-annotation',
				description: 'Add annotation to customer conversation',
				action: 'Add annotation',
			},
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
				name: 'Block',
				value: 'block',
				description: 'Block customer',
				action: 'Block customer',
			},
			{
				name: 'Create Customer',
				value: 'create-customer',
				action: 'Create customer',
			},
			{
				name: 'List Customers',
				value: 'list-contacts',
				description: 'List customers by phone number or customer ID',
				action: 'List customers',
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
				name: 'Unblock',
				value: 'unblock',
				description: 'Unblock customer',
				action: 'Unblock customer',
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
				operation: [
					'assign-user',
					'create-annotation',
					'block',
					'remove-tag',
					'add-tag',
					'add-to-sequence',
					'remove-from-sequence',
					'unassign-user',
					'unblock',
					'update-stage',
				],
				resource: ['customer'],
			},
		},
	},
	{
		displayName: 'Search By',
		name: 'searchBy',
		type: 'options',
		default: 'phoneNumber',
		options: [
			{
				name: 'Phone Number',
				value: 'phoneNumber',
			},
			{
				name: 'Customer ID',
				value: 'idCustomer',
			},
		],
		displayOptions: {
			show: {
				operation: ['list-contacts'],
				resource: ['customer'],
			},
		},
		description: 'Choose whether to search by phone number or customer ID',
	},
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		default: '',
		placeholder: '5511988888888',
		required: true,
		displayOptions: {
			show: {
				operation: ['list-contacts'],
				searchBy: ['phoneNumber'],
				resource: ['customer'],
			},
		},
		description: 'The customer phone number using digits only, with area code. You can include or omit the country code and ninth digit.',
	},
	{
		displayName: 'Customer ID',
		name: 'searchCustomerId',
		type: 'number',
		default: 0,
		placeholder: '15031411',
		required: true,
		displayOptions: {
			show: {
				operation: ['list-contacts'],
				searchBy: ['idCustomer'],
				resource: ['customer'],
			},
		},
	},
	{
		displayName: 'Name',
		name: 'customerName',
		type: 'string',
		default: '',
		placeholder: 'Felipe Miranda',
		required: true,
		displayOptions: {
			show: {
				operation: ['create-customer'],
				resource: ['customer'],
			},
		},
		description: 'The customer name',
	},
	{
		displayName: 'Channel Integration ID',
		name: 'channelIntegrationId',
		type: 'number',
		default: 0,
		placeholder: '1',
		required: true,
		displayOptions: {
			show: {
				operation: ['create-customer'],
				resource: ['customer'],
			},
		},
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
				operation: ['create-customer'],
				resource: ['customer'],
			},
		},
		description: 'The customer phone number using digits only, with area code',
	},
	{
		displayName: 'Observations',
		name: 'customerObservations',
		type: 'string',
		default: '',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				operation: ['create-customer'],
				resource: ['customer'],
			},
		},
		description: 'Additional observations for the customer',
	},
	{
		displayName: 'Birth Date',
		name: 'customerBirthDate',
		type: 'string',
		default: '',
		placeholder: '2024-12-30',
		displayOptions: {
			show: {
				operation: ['create-customer'],
				resource: ['customer'],
			},
		},
		description: 'The customer birth date in YYYY-MM-DD format',
	},
	{
		displayName: 'Email',
		name: 'customerEmail',
		type: 'string',
		default: '',
		placeholder: 'example@gmail.com',
		displayOptions: {
			show: {
				operation: ['create-customer'],
				resource: ['customer'],
			},
		},
		description: 'The customer email address',
	},
	{
		displayName: 'CPF',
		name: 'customerCpf',
		type: 'string',
		default: '',
		placeholder: '12341223412',
		displayOptions: {
			show: {
				operation: ['create-customer'],
				resource: ['customer'],
			},
		},
		description: 'The customer CPF',
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
		displayName: 'Annotation',
		name: 'annotation',
		type: 'string',
		default: '',
		placeholder: 'Example with email mention: felipe@cloudia.com',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				operation: ['create-annotation'],
				resource: ['customer'],
			},
		},
		description: 'The annotation to add to the customer conversation. Use the full user email to mention users.',
	},
	{
		displayName: 'Mark Conversation As Unread',
		name: 'markConversationAsUnread',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				operation: ['create-annotation'],
				resource: ['customer'],
			},
		},
		description: 'Whether to mark the conversation as unread',
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

type BodyBuilder = (context: IExecuteFunctions, index: number) => IDataObject | undefined;
type UrlBuilder = (context: IExecuteFunctions, index: number) => string;

export const customerUrlBuilders: Record<string, UrlBuilder> = {
	'assign-user': (ctx, i) => 'assign_user',
	'unassign-user': (ctx, i) => 'unassign_user',
	'create-annotation': (ctx, i) => `annotations/${ctx.getNodeParameter('customerId', i)}`,
	'create-customer': () => 'customers/create',
	block: (ctx, i) => `customers/${ctx.getNodeParameter('customerId', i)}/block`,
	unblock: (ctx, i) => `customers/${ctx.getNodeParameter('customerId', i)}/unblock`,
	'list-contacts': (ctx, i) => {
		const searchBy = ctx.getNodeParameter('searchBy', i) as string;
		const value =
			searchBy === 'phoneNumber'
				? ctx.getNodeParameter('phoneNumber', i)
				: ctx.getNodeParameter('searchCustomerId', i);
		return `list-customers?${searchBy}=${encodeURIComponent(String(value))}`;
	},
	'add-tag': (ctx, i) => `assign_tag_to_customer/${ctx.getNodeParameter('customerId', i)}`,
	'remove-tag': (ctx, i) =>
		`unassign_tag_to_customer/${ctx.getNodeParameter('customerId', i)}?idtag=${ctx.getNodeParameter('tagId', i)}`,
	'add-to-sequence': (ctx, i) => 'add_customers_to_sequence',
	'remove-from-sequence': (ctx, i) => 'remove_customers_from_sequence',
	'update-stage': (ctx, i) => `customers/${ctx.getNodeParameter('customerId', i)}/stage`,
};

export const customerRequestMethods: Record<string, 'GET' | 'POST'> = {
	'list-contacts': 'GET',
};

export const customerBodyBuilders: Record<string, BodyBuilder> = {
	'assign-user': (ctx, i) => ({
		id_user: ctx.getNodeParameter('userId', i),
		id_customer: ctx.getNodeParameter('customerId', i),
	}),
	'unassign-user': (ctx, i) => ({
		id_customer: ctx.getNodeParameter('customerId', i),
	}),
	'create-annotation': (ctx, i) => {
		const markConversationAsUnread = ctx.getNodeParameter('markConversationAsUnread', i) as boolean;
		return {
			annotation: ctx.getNodeParameter('annotation', i),
			...(markConversationAsUnread ? { markConversationAsUnread } : {}),
		};
	},
	'create-customer': (ctx, i) => {
		const channelIntegrationId = Number(ctx.getNodeParameter('channelIntegrationId', i));
		const observations = ctx.getNodeParameter('customerObservations', i) as string;
		const birthDate = ctx.getNodeParameter('customerBirthDate', i) as string;
		const email = ctx.getNodeParameter('customerEmail', i) as string;
		const cpf = ctx.getNodeParameter('customerCpf', i) as string;

		return {
			name: ctx.getNodeParameter('customerName', i),
			channelIntegrationId,
			phoneNumber: ctx.getNodeParameter('customerPhoneNumber', i),
			...(observations ? { observations } : {}),
			...(birthDate ? { birthDate } : {}),
			...(email ? { email } : {}),
			...(cpf ? { cpf } : {}),
		};
	},
	'list-contacts': () => undefined,
	block: () => ({}),
	unblock: () => ({}),
	'add-tag': (ctx, i) => {
		const idtag = ctx.getNodeParameter('tagId', i);
		const name = ctx.getNodeParameter('tagName', i);
		const color = ctx.getNodeParameter('tagColor', i);
		return {
			...(idtag ? (idtag !== 0 ? { idtag } : {}) : name ? { name } : {}),
			color,
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
