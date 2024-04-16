// @ts-ignore (it's a peer dependency)
import { Application, WebGLRenderer } from "pixi.js";
import BaseHooks from "./BaseHooks";
export default class PIXIHooks extends BaseHooks {
  constructor(app: Application) {
    super();
    if (!app) {
      console.error("[PIXI Hooks] missing PIXI.Application");
      return;
    }
    const renderer = app.renderer as WebGLRenderer;
    if (renderer.gl) {
      this.attach(renderer.gl);
      // const startTextures = renderer.texture.managedTextures;
      const glTextures = (renderer.texture as any)._glTextures as Record<
        string,
        any
      >;
      if (!glTextures || !this.texturehook) {
        console.error("[PIXI Hooks] !glTextures || !this.texturehook");
      } else {
        console.log("[PIXI Hooks] Collect used textures:", glTextures.length);
        // for (let i = 0; i < startTextures.length; i++) {
        //   const txr = startTextures[i];
        Object.values(glTextures).forEach((glTexture) => {
          if (glTexture.gl === renderer.gl) {
            this.texturehook!.registerTexture(glTexture.texture);
          }
        });
        // }
      }
    } else {
      console.error("[PIXI Hook] Canvas renderer is not allowed");
    }
  }
}
