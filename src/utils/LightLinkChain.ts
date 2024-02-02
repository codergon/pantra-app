import {defineChain} from 'viem';

export const lightlink = /*#__PURE__*/ defineChain({
  id: 1891,
  testnet: true,
  network: 'lightlink',
  name: 'Lightlink Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://replicator.pegasus.lightlink.io/rpc/v1'],
    },
    public: {
      http: ['https://replicator.pegasus.lightlink.io/rpc/v1'],
    },
  },
  blockExplorers: {
    default: {name: 'Blockscout', url: 'https://pegasus.lightlink.io/'},
  },
});
