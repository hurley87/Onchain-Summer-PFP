'use client';

import { useAccount, useContractRead } from 'wagmi';
import ConnectWallet from '@/components/ConnectWallet';
import Mint from '@/components/Mint';
import { useState } from 'react';
import OnchainSummerPFP from '@/lib/OnchainSummerPFP.json';
import GenerateImage from '@/components/GenerateImage';
import { MintContext } from '@/components/MintContext';

export default function Home() {
  const { address } = useAccount();
  const [image, setImage] = useState('/giphy.gif');
  const [gender, setGender] = useState('male');
  const [status, setStatus] = useState('artist');
  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: OnchainSummerPFP.abi,
    functionName: 'totalSupply',
    watch: true,
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-teaser-gradient">
      <div className="absolute right-2 top-2">
        <ConnectWallet />
      </div>
      <div className="h-[54px] w-[54px] rounded-full bg-[#FCD22D]"></div>
      <section className="my-8 max-w-[900px] grid p-5 md:p-6 rounded-3xl md:rounded-[32px] bg-white shadow-large w-full md:grid-cols-[5fr,7fr] gap-2 md:gap-10">
        <div className="relative w-full mb-1 lg:mb-0 order-1 md:order-2">
          <img alt="Bridge to Base" src={image} className="rounded-2xl" />
        </div>
        <div className="flex flex-col w-full gap-2 h-full order-2 md:order-1">
          <h1 className="text-2xl text-black font-bold tracking-tighter">
            {`Let's`} F*ckin Thoughtfully Go
          </h1>
          <div className="flex items-center mb-2">
            <span className="mr-2 text-slate-500">by</span>
            <span className="max-w-full overflow-hidden rounded-[58px] bg-ocs-gray text-white p-1 pr-2 w-max flex gap-2 items-center text-sm leading-none font-mono pl-2 !bg-slate-800 !text-white">
              <span className="leading-[140%]">dhurley.eth</span>
            </span>
          </div>
          <p className="text-[#444]">
            LFTG is a collection of 10,000 unique NFTs created for all artists,
            builders and curators basking in the Onchain Summer sun.
          </p>
          <p className="text-[#444]">
            Outlined in this proposal, this will be used to show other
            developers how to create a NFT collection on Base using generative
            AI.
          </p>
          <MintContext.Provider
            value={{ image, setImage, gender, setGender, status, setStatus }}
          >
            <div className="flex flex-col w-full gap-2 mt-auto">
              <div className="flex items-center flex-row text-[#0052ff] text-[14px]">
                {data?.toString()} / 10,000
              </div>
              {!address && <ConnectWallet />}
              {address && image === '/giphy.gif' && <GenerateImage />}
              {address && image !== '/giphy.gif' && (
                <Mint tokenId={data!.toString()} />
              )}
            </div>
          </MintContext.Provider>
        </div>
      </section>
      <p className="text-center text-xs md:text-sm leading-loose md:text-left text-white">
        Built by{' '}
        <a
          href="https://twitter.com/davidhurley87"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          David Hurley
        </a>
        . Inspired by{' '}
        <a
          href="https://onchainsummer.xyz"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Onchain Summer
        </a>
        . The source code is available on{' '}
        <a
          href="https://github.com/hurley87/Onchain-Summer-PFP"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </main>
  );
}
