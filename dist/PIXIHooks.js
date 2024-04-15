"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore (it's a peer dependency)
const pixi_js_1 = require("pixi.js");
const BaseHooks_1 = __importDefault(require("./BaseHooks"));
class PIXIHooks extends BaseHooks_1.default {
    constructor(app) {
        super();
        if (!app) {
            console.error("PIXI Application can't passed or NULL");
            return;
        }
        if (app.renderer instanceof pixi_js_1.Renderer) {
            this.attach(app.renderer.gl);
            var start_textures = app.renderer.texture._managedTextures;
            if (start_textures && this.texturehook) {
                console.log("[PIXI Hooks] Collect used textures:", start_textures.length);
                for (var i = 0; i < start_textures.length; ++i) {
                    var txr = start_textures[i];
                    var gltextures = txr._glTextures;
                    for (var j = 0; j < gltextures.length; ++j) {
                        if (gltextures[j].gl === app.renderer.gl) {
                            this.texturehook.registerTexture(gltextures[j].texture);
                        }
                    }
                }
            }
        }
        else {
            console.error("[PIXI Hook]Canvas renderer is not allowed");
        }
    }
}
exports.default = PIXIHooks;
//# sourceMappingURL=PIXIHooks.js.map