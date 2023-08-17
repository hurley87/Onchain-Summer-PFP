'use client';

import { useContext, useState } from 'react';
import { NFTStorage, File } from 'nft.storage';
import { useAccount } from 'wagmi';
import { toast } from '@/components/ui/use-toast';
import { Button } from './ui/button';
import { useContractWrite } from 'wagmi';
import OnchainSummerPFP from '@/lib/OnchainSummerPFP.json';
import { parseEther } from 'ethers';
import HashButton from './MintingButton';
import { MintContext } from './MintContext';
import Link from 'next/link';

type MintProps = {
  tokenId: string;
};

const Mint = ({ tokenId }: MintProps) => {
  const { address } = useAccount();
  const { image, setImage, gender, status } = useContext(MintContext);
  const [hash, setHash] = useState<`0x${string}`>();
  const { writeAsync: mint } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: OnchainSummerPFP.abi,
    functionName: 'mint',
  });
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    setIsMinting(true);

    const response = await fetch('/api/s3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId, image, gender, status }),
    });

    console.log(response);

    const { metadataURL } = await response.json();

    try {
      const tx = await mint({
        args: [address, metadataURL],
        value: parseEther('0.01'),
      });
      setHash(tx.hash);
    } catch (e) {
      console.log('Error minting NFT: ', e);
      toast({
        title: 'There was an error minting your NFT.',
        description: 'Please try again.',
      });
      setIsMinting(false);
    }
  };

  return hash ? (
    <>
      <HashButton hash={hash} />
      <Link
        target="_blank"
        href="https://twitter.com/intent/tweet?text=Just%20minted%20my%20%23OnchainSummer%20PFP%20%40buildonbase"
      >
        <Button size="lg" variant="outline">
          Share on Twitter
        </Button>
      </Link>
    </>
  ) : (
    <>
      <Button disabled={isMinting} onClick={handleMint} size="lg">
        {isMinting ? 'Minting ...' : 'Mint (0.01 ETH) →'}
      </Button>
      <Button
        onClick={() => setImage('/giphy.gif')}
        size="lg"
        variant="outline"
      >
        Reset PFP
      </Button>
    </>
  );
};

export default Mint;
