

export interface TokenRetrievalResponse {
	access_token: string;
	token_type: 'bearer';
	expires_in: number;
	scope: string;
	refresh_token: string;
}

export interface RefreshTokenResponse {
	access_token: string;
	token_type: 'bearer';
	expires_in: number;
	scope: string;
}
