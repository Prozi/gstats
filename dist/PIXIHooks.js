"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseHooks_1 = __importDefault(require("./BaseHooks"));
class PIXIHooks extends BaseHooks_1.default {
    constructor(app) {
        super();
        if (!app) {
            console.error("[PIXI Hooks] missing PIXI.Application");
            return;
        }
        const renderer = app.renderer;
        if (renderer.gl) {
            this.attach(renderer.gl);
            // const startTextures = renderer.texture.managedTextures;
            const glTextures = renderer.texture._glTextures;
            if (!glTextures || !this.texturehook) {
                console.error("[PIXI Hooks] !glTextures || !this.texturehook");
            }
            else {
                console.log("[PIXI Hooks] Collect used textures:", glTextures.length);
                // for (let i = 0; i < startTextures.length; i++) {
                //   const txr = startTextures[i];
                Object.values(glTextures).forEach((glTexture) => {
                    if (glTexture.gl === renderer.gl) {
                        this.texturehook.registerTexture(glTexture.texture);
                    }
                });
                // }
            }
        }
        else {
            console.error("[PIXI Hook] Canvas renderer is not allowed");
        }
    }
}
exports.default = PIXIHooks;
//# sourceMappingURL=PIXIHooks.js.map