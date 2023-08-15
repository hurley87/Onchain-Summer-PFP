'use client';

import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { ReactNode } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli, base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [process.env.NEXT_PUBLIC_NODE_ENV === 'dev' ? baseGoerli : base],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const { wallets } = getDefaultWallets({
  appName: 'Onchain Summer PFP Collection',
  projectId,
  chains,
});
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);
const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
export default function AuthenticationWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
