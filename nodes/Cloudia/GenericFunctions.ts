import {
	type IExecuteFunctions,
	type IHookFunctions,
	type IDataObject,
	type IHttpRequestMethods,
	type IRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';

export async function cloudiaApiRequest(
	this: IHookFunctions | IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	xApiKey?: string,
): Promise<any> {
	const uri = `https://api-prd.cloudiabot.com/api/${endpoint}`;

	const options: IRequestOptions = {
		method,
		uri,
		body,
		json: true,
	};

	try {
		const credentials = (await this.getCredentials('cloudiaApi')) as { xApiKey: string };
		options.headers = {
			'x-api-key': credentials.xApiKey,
		};
		return this.helpers.requestWithAuthentication.call(this, 'cloudiaApi', options);
	} catch {
		if (xApiKey) {
			options.headers = {
				'x-api-key': xApiKey,
			};
			return this.helpers.request(options);
		}
		throw new NodeOperationError(
			this.getNode(),
			'No X-API-Key or credentials provided. Please configure credentials or provide a key.',
		);
	}
}
