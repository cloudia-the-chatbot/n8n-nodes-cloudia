import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import { cloudiaApiRequest } from './GenericFunctions';

import {
	customerBodyBuilders,
	customerFields,
	customerOperations,
	customerUrlBuilders,
} from './resources/Customer';

import {
	whatsappGupshupBodyBuilders,
	whatsappGupshupFields,
	whatsappGupshupOperations,
} from './resources/WhatsappGupshup';

import {
	whatsappWebBodyBuilders,
	whatsappWebFields,
	whatsappWebOperations,
} from './resources/WhatsappWeb';

type BodyBuilder = (ctx: IExecuteFunctions, index: number) => IDataObject;

export class Cloudia implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cloudia',
		name: 'cloudia',
		icon: 'file:cloudia.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send messages',
		defaults: { name: 'Cloudia' },
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [{ name: 'cloudiaApi', required: false }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Customer', value: 'customer' },
					{ name: 'Whatsapp Web', value: 'whatsapp-web' },
					{ name: 'Whatsapp Gupshup', value: 'whatsapp-gupshup' },
				],
				default: 'customer',
			},
			...customerOperations,
			...customerFields,
			...whatsappGupshupOperations,
			...whatsappGupshupFields,
			...whatsappWebOperations,
			...whatsappWebFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i);
				const operation = this.getNodeParameter('operation', i);

				let url: string;
				let buildBody: BodyBuilder | undefined;

				switch (resource) {
					case 'whatsapp-web':
						url = 'whatsappweb';
						buildBody = whatsappWebBodyBuilders[operation];
						break;
					case 'whatsapp-gupshup':
						url = 'send-gupshup-template';
						buildBody = whatsappGupshupBodyBuilders[operation];
						break;
					case 'customer':
						url = customerUrlBuilders[operation]?.(this, i);
						buildBody = customerBodyBuilders[operation];
						break;
					default:
						throw new NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`, {
							itemIndex: i,
						});
				}

				if (!url || !buildBody) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const body = buildBody(this, i);
				const xApiKey = this.getNodeParameter('xApiKey', i) as string;
				const response = await cloudiaApiRequest.call(this, 'POST', url, body, xApiKey);

				returnData.push(response as IDataObject);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
