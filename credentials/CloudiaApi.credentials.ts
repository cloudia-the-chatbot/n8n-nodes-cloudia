import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CloudiaApi implements ICredentialType {
	name = 'cloudiaApi';
	displayName = 'Cloudia API';

	properties: INodeProperties[] = [
		{
			displayName: 'X-API-Key',
			name: 'xApiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			placeholder: 'eyJh...',
			required: true,
			description: 'Your Cloudia X-API-Key used to authenticate API requests.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{ $credentials.xApiKey }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: 'https://api-prd.cloudiabot.com/api/list-stages',
		},
	};
}
