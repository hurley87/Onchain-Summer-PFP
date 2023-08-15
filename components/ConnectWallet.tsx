/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatAddress } from '@/lib/utils';
import { Button } from './ui/button';

const ConnectWallet: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        openChainModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (() => {
          if (!connected) {
            return (
              <Button onClick={openConnectModal} size="lg">
                Connect
              </Button>
            );
          }

          if (chain.unsupported) {
            return (
              <Button onClick={openChainModal} size="lg">
                Unsupported network
              </Button>
            );
          }

          return (
            <Button onClick={openAccountModal} size="lg">
              {account.ensName
                ? account.ensName
                : formatAddress(account.address)}
            </Button>
          );
        })();
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
