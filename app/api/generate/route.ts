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
    const { prompt, tokenId } = (await req.json()) as {
      prompt: string;
      tokenId: string;
    };
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });
    const url: any = response.data.data[0].url as string;
    const imageResponse = await fetch(url);
    const imageData = await imageResponse?.buffer();
    const Key = 'lftg' + tokenId + '.jpg';
    const params = {
      Bucket: 'pollock-art',
      Key,
      Body: imageData,
      ContentType: 'image/jpeg',
    };
    const stored = await s3.upload(params).promise();

    return new NextResponse(JSON.stringify({ image: stored.Location }));
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
