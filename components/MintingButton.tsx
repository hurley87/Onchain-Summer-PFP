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
    <Link
      target="_blank"
      href={`${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}/tx/${hash}`}
    >
      <Button disabled={isLoading} size="lg">
        {isLoading ? 'Minting...' : 'View On Explorer'}
      </Button>
    </Link>
  );
};

export default MintingButton;
