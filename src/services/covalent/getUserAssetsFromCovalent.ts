import { error, log } from '@johnkcr/temple-lib/dist/utils';
import { CovalentWalletBalanceItem } from '@johnkcr/temple-lib/dist/types/services/covalent';
import { covalentClient } from './utils';

export async function getUserAssetsFromCovalent(address: string): Promise<CovalentWalletBalanceItem[]> {
  log('Fetching assets from covalent');
  const chainId = '137';
  const path = `${chainId}/address/${address}/balances_v2/`;
  try {
    const { data } = await covalentClient.get(path, {
      params: {
        nft: true,
        'no-nft-fetch': false
      }
    });
    const items: CovalentWalletBalanceItem[] = data.data.items;
    return items;
  } catch (err: any) {
    error('Error occurred while fetching assets from covalent');
    error(err);
  }
  return [];
}
