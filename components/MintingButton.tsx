'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useWaitForTransaction } from 'wagmi';

type MintProps = {
  hash: `0x${string}`;
};

const MintingButton = ({ hash }: MintProps) => {
  const { isLoading } = useWaitForTransaction({
    hash,
  });

  return (
    <>
      <Link
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}/tx/${hash}`}
      >
        <Button disabled={isLoading} size="lg">
          {isLoading ? 'Minting...' : 'View On Explorer'}
        </Button>
      </Link>
      {!isLoading && (
        <>
          <Link
            target="_blank"
            href="https://twitter.com/intent/tweet?text=Just%20minted%20my%20%23OnchainSummer%20PFP%20%40buildonbase"
          >
            <Button size="lg" variant="outline">
              Share on Twitter
            </Button>
          </Link>
          <Button
            onClick={() => window.location.reload()}
            size="lg"
            variant="outline"
          >
            Mint another
          </Button>
        </>
      )}
    </>
  );
};

export default MintingButton;
