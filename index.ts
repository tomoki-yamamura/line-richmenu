import * as line from "@line/bot-sdk";
const MessagingApiClient = line.messagingApi.MessagingApiClient
const MessagingBlobApiClient = line.messagingApi.MessagingApiBlobClient

import fs from "fs";

import env from "dotenv";
env.config()


const client = new MessagingApiClient({
  channelAccessToken: `${process.env.CHANNEL_ACCESS_TOKEN}`
});

const client_blob = new MessagingBlobApiClient({
  channelAccessToken: `${process.env.CHANNEL_ACCESS_TOKEN}`
});


const WIDTH = 2500;
const HEIGHT = 1686;
const HALF_HEIGHT = HEIGHT / 2;
const AREA_WIDTH = WIDTH / 3;

const richMenu3players: line.RichMenu = {
  size: {
    width: WIDTH,
    height: HEIGHT
  },
  selected: true,
  name: "Rich Menu",
  chatBarText: "menu 3players",
  areas: [
    // Top half switch area 1
    {
      bounds: {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HALF_HEIGHT
      },
      action: {
        type: "richmenuswitch",
        richMenuAliasId: "richmenu-alias-4players",
        data: "switch-to-4players"
      }
    },
    // Bottom tappable area 1
    {
      bounds: {
        x: 0,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT
      },
      action: {
        type: "message",
        text: "Today 3players"
      }
    },
    // Bottom tappable area 2
    {
      bounds: {
        x: AREA_WIDTH,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT
      },
      action: {
        type: "message",
        text: "Weekly 3players"
      }
    },
    // Bottom tappable area 3
    {
      bounds: {
        x: AREA_WIDTH*2,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT
      },
      action: {
        type: "message",
        text: "Monthly 3players"
      }
    }
  ]
};

const richMenu4players: line.RichMenu = {
  size: {
    width: WIDTH,
    height: HEIGHT
  },
  selected: true,
  name: "Rich Menu",
  chatBarText: "menu 4players",
  areas: [
    // Top half switch area 1
    {
      bounds: {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HALF_HEIGHT
      },
      action: {
        type: "richmenuswitch",
        richMenuAliasId: "richmenu-alias-3players",
        data: "switch-to-3players"
      }
    },
    // Bottom tappable area 1
    {
      bounds: {
        x: 0,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT
      },
      action: {
        type: "message",
        text: "Today 4players"
      }
    },
    // Bottom tappable area 2
    {
      bounds: {
        x: AREA_WIDTH,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT
      },
      action: {
        type: "message",
        text: "Weekly 4players"
      }
    },
    // Bottom tappable area 3
    {
      bounds: {
        x: AREA_WIDTH*2,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT
      },
      action: {
        type: "message",
        text: "Monthly 4players"
      }
    }
  ]
};

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
