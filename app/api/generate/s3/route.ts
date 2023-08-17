import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import fetch from 'node-fetch';
import AWS from 'aws-sdk';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// Set up AWS credentials and region
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { tokenId, image, gender, status } = (await req.json()) as {
      tokenId: string;
      image: string;
      gender: string;
      status: string;
    };
    const params = {
      Bucket: 'pollock-art',
      Key: 'metadata/' + tokenId + '.json',
      Body: JSON.stringify({
        name: `#${tokenId}`,
        description: `Let's F*ckin Thoughtfully Go Onchain`,
        image,
        edition: tokenId,
        date: new Date().getTime(),
        attributes: [
          { trait_type: 'Gender', value: gender },
          { trait_type: 'Status', value: status },
        ],
      }),
      ContentType: 'application/json',
    };
    const stored = await s3.upload(params).promise();

    return new NextResponse(JSON.stringify({ metadataURL: stored.Location }));
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
