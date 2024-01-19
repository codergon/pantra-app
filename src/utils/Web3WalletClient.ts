import {Core} from '@walletconnect/core';
import {ICore} from '@walletconnect/types';
import {Web3Wallet, IWeb3Wallet} from '@walletconnect/web3wallet';

import {WC_PROJECT_ID} from '@env';
import {createOrRestoreEIP155Wallet} from './EIP155Wallet';

export let core: ICore;
export let web3wallet: IWeb3Wallet;
export let currentETHAddress: string;

export async function createWeb3Wallet() {
  core = new Core({
    // logger: 'debug',
    projectId: WC_PROJECT_ID,
  });

  const {eip155Addresses} = await createOrRestoreEIP155Wallet();
  currentETHAddress = eip155Addresses[0];

  web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: 'Pantra',
      description: 'Non-custodial smart wallet powered by LightLink',
      url: 'https://github.com/codergon/Pantra',
      icons: ['https://dr.savee-cdn.com/things/6/5/a6c844c2200119ec0e42e9.png'],
      redirect: {
        native: 'pantra://',
      },
    },
  });
}

export async function _pair(params: {uri: string}) {
  return await core.pairing.pair({uri: params.uri});
}
