"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore (it's a peer dependency)
const pixi_js_1 = require("pixi.js");
const BaseHooks_1 = __importDefault(require("./BaseHooks"));
class PhaserHooks extends BaseHooks_1.default {
    constructor(game) {
        super();
        if (!game) {
            console.error("[Phaser Hooks]Phaser Game can't passed or NULL");
            return;
        }
        var _w = window;
        if (_w.Phaser) {
            var version = _w.Phaser.VERSION;
            if (version.startsWith("3")) {
                if (game.renderer.gl && game.renderer.gl instanceof WebGLRenderingContext) {
                    this.attach(game.renderer.gl);
                }
                else {
                    console.error("[Phaser 3 Hooks]Canvas renderer is not allowed");
                }
            }
            else {
                if (game.renderer instanceof pixi_js_1.Renderer) {
                    this.attach(game.renderer.gl);
                }
                else {
                    console.error("[Phaser 2 Hooks]Canvas renderer is not allowed");
                }
            }
        }
        else {
            console.error("[Phaser Hooks] THIS HOOK ONLY FOR PHASER 2CE or PHASER 3!!!!");
        }
    }
}
exports.default = PhaserHooks;
//# sourceMappingURL=PhaserHooks.js.map