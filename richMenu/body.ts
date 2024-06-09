import * as line from "@line/bot-sdk";
import { AREA_WIDTH, HALF_HEIGHT, HEIGHT, WIDTH } from "./constant";

const richMenu3players: line.RichMenu = {
  size: {
    width: WIDTH,
    height: HEIGHT,
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
        height: HALF_HEIGHT,
      },
      action: {
        type: "richmenuswitch",
        richMenuAliasId: "richmenu-alias-4players",
        data: "switch-to-4players",
      },
    },
    // Bottom tappable area 1
    {
      bounds: {
        x: 0,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT,
      },
      action: {
        type: "message",
        text: "Today 3players",
      },
    },
    // Bottom tappable area 2
    {
      bounds: {
        x: AREA_WIDTH,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT,
      },
      action: {
        type: "message",
        text: "Weekly 3players",
      },
    },
    // Bottom tappable area 3
    {
      bounds: {
        x: AREA_WIDTH * 2,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT,
      },
      action: {
        type: "message",
        text: "Monthly 3players",
      },
    },
  ],
};

const richMenu4players: line.RichMenu = {
  size: {
    width: WIDTH,
    height: HEIGHT,
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
        height: HALF_HEIGHT,
      },
      action: {
        type: "richmenuswitch",
        richMenuAliasId: "richmenu-alias-3players",
        data: "switch-to-3players",
      },
    },
    // Bottom tappable area 1
    {
      bounds: {
        x: 0,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT,
      },
      action: {
        type: "message",
        text: "Today 4players",
      },
    },
    // Bottom tappable area 2
    {
      bounds: {
        x: AREA_WIDTH,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT,
      },
      action: {
        type: "message",
        text: "Weekly 4players",
      },
    },
    // Bottom tappable area 3
    {
      bounds: {
        x: AREA_WIDTH * 2,
        y: HALF_HEIGHT,
        width: AREA_WIDTH,
        height: HALF_HEIGHT,
      },
      action: {
        type: "message",
        text: "Monthly 4players",
      },
    },
  ],
};

export { richMenu3players, richMenu4players };
