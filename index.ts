import * as line from "@line/bot-sdk";
const MessagingApiClient = line.messagingApi.MessagingApiClient
const MessagingBlobApiClient = line.messagingApi.MessagingApiBlobClient

import fs from "fs";

import env from "dotenv";
import { richMenu3players, richMenu4players } from "./richMenu/body";
env.config()


const client = new MessagingApiClient({
  channelAccessToken: `${process.env.CHANNEL_ACCESS_TOKEN}`
});

const client_blob = new MessagingBlobApiClient({
  channelAccessToken: `${process.env.CHANNEL_ACCESS_TOKEN}`
});

async function createRichMenuDefault(menu: line.RichMenu, blob: Blob) {
  try {
    const richMenuId = await client.createRichMenu(menu);
    console.log(`Rich menu created: ${richMenuId.richMenuId}`);
    
    await client_blob.setRichMenuImage(richMenuId.richMenuId, blob);
    console.log('Rich menu image uploaded and set as default.');
    return richMenuId.richMenuId
  } catch (error) {
    throw error
  }
}
async function createRichMenu(menu: line.RichMenu, blob: Blob) {
  try {
    const richMenuId = await client.createRichMenu(menu);
    console.log(`Rich menu created: ${richMenuId.richMenuId}`);
    
    await client_blob.setRichMenuImage(richMenuId.richMenuId, blob);
    console.log('Rich menu image uploaded.');
    return richMenuId.richMenuId
  } catch (error) {
    throw error
  }
}


async function createBlobFromImagePath(imagePath: string): Promise<Blob> {
  try {
      const readStream = fs.createReadStream(imagePath);
      let data: any = [];

      readStream.on('data', function(chunk) {
          data.push(chunk);
      });

      const buffer: any = await new Promise((resolve, reject) => {
          readStream.on('end', function() {
              const buffer = Buffer.concat(data);
              resolve(buffer);
          });

          readStream.on('error', function(error) {
              reject(error);
          });
      });

      const blob = new Blob([buffer], { type: 'image/png' });
      return blob;
  } catch (error) {
      throw error;
  }
}

(async () => {
  try {
    const defaultBlob = await createBlobFromImagePath('./assets/richmenu_3players_default.png')
    const secondBlob = await createBlobFromImagePath('./assets/richmenu_4players.png')

    const defaultRichMenuId = await createRichMenuDefault(richMenu3players, defaultBlob)
    const richMenuId = await createRichMenu(richMenu4players, secondBlob)
    await client.setDefaultRichMenu(defaultRichMenuId);
    await client.createRichMenuAlias({
      richMenuAliasId: "richmenu-alias-3players",
      richMenuId: defaultRichMenuId
    })
    await client.createRichMenuAlias({
      richMenuAliasId: "richmenu-alias-4players",
      richMenuId: richMenuId
    })
  } catch (error) {
    console.log(error);
  }
})()
