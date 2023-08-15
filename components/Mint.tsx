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
    address: '0x36B4DF23A749A59649Ec6501210867a8d59552c2',
    abi: OnchainSummerPFP.abi,
    functionName: 'mint',
  });
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    setIsMinting(true);

    const token = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY as string;
    const nftStorage = new NFTStorage({ token });
    const imageBlob = await (await fetch(image)).blob();
    const imageFile = new File([imageBlob], image.split('/')[3], {
      type: 'image/jpeg',
    });

    const metadata = await nftStorage.store({
      name: `Onchain Summer PFP #${tokenId}`,
      description:
        'Get onchain this summer to join a multi-week celebration of art, culture, gaming, community, and more.',
      image: imageFile,
      attributes: [
        { trait_type: 'Gender', value: gender },
        { trait_type: 'Status', value: status },
      ],
    });

    try {
      const tx = await mint({
        args: [address, metadata.url],
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

  console.log(image);

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
