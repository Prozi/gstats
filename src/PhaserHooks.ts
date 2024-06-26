// @ts-ignore (it's a peer dependency)
import { Renderer } from "pixi.js";
import BaseHooks from "./BaseHooks";
export default class PhaserHooks extends BaseHooks {
  constructor(game: any) {
    super();
    if (!game) {
      console.error("[Phaser Hooks]Phaser Game can't passed or NULL");
      return;
    }
    var _w: any = window as any;
    if (_w.Phaser) {
      var version = _w.Phaser.VERSION;
      if (version.startsWith("3")) {
        if (
          game.renderer.gl &&
          game.renderer.gl instanceof WebGLRenderingContext
        ) {
          this.attach(game.renderer.gl);
        } else {
          console.error("[Phaser 3 Hooks]Canvas renderer is not allowed");
        }
      } else {
        if (game.renderer instanceof Renderer) {
          this.attach(game.renderer.gl);
        } else {
          console.error("[Phaser 2 Hooks]Canvas renderer is not allowed");
        }
      }
    } else {
      console.error(
        "[Phaser Hooks] THIS HOOK ONLY FOR PHASER 2CE or PHASER 3!!!!",
      );
    }
  }
}
