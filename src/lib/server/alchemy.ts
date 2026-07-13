import { Alchemy, Network } from 'alchemy-sdk';

const API_KEY = process.env.ALCHEMY_API_KEY || 'demo';

export interface TokenBalance {
	contractAddress: string | null;
	symbol: string;
	name: string;
	logo: string | null;
	balance: string;
	decimals: number;
}

const settings = {
	apiKey: API_KEY,
	network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);

export async function getEthBalance(address: string): Promise<string> {
	const balance = await alchemy.core.getBalance(address);
	return balance.toString();
}

export async function getTokenBalances(address: string): Promise<TokenBalance[]> {
	const balances = await alchemy.core.getTokenBalances(address);
	const tokens: TokenBalance[] = [];

	const metadataPromises = balances.tokenBalances
		.filter(t => t.tokenBalance !== '0')
		.map(async (token) => {
			try {
				const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
				return {
					contractAddress: token.contractAddress,
					symbol: metadata.symbol || 'UNKNOWN',
					name: metadata.name || 'Unknown Token',
					logo: metadata.logo || null,
					balance: token.tokenBalance,
					decimals: metadata.decimals || 18
				};
			} catch {
				return null;
			}
		});

	const results = await Promise.all(metadataPromises);
	for (const r of results) {
		if (r) tokens.push(r);
	}

	return tokens;
}
