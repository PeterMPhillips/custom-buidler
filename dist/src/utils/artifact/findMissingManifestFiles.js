"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Verifies that all files declared in the manifest exist in the distPath
 * Run this verification AFTER building the app front-end
 * Returns JSON data so the consumer can choose to show a warning or throw
 * @param manifest
 * @param distPath
 */
function findMissingManifestFiles(manifest, distPath) {
    const missingFiles = [];
    function assertFile(filepath, id, required) {
        // filepath maybe a remote URL, ignore those cases
        if (filepath.includes('://'))
            return;
        const fullPath = path_1.default.join(distPath, filepath);
        if (!fs_1.default.existsSync(fullPath))
            missingFiles.push({ path: fullPath, id, required });
    }
    // Assert optional metadata
    if (manifest.details_url)
        assertFile(manifest.details_url, 'details', false);
    manifest.icons.forEach((icon, i) => {
        assertFile(icon.src, `icon ${i}`, false);
    });
    manifest.screenshots.forEach((screenshot, i) => {
        assertFile(screenshot.src, `screenshot ${i}`, false);
    });
    // Assert mandatory files
    assertFile(manifest.start_url, 'start page', true);
    assertFile(manifest.script, 'script', true);
    return missingFiles;
}
exports.findMissingManifestFiles = findMissingManifestFiles;
//# sourceMappingURL=findMissingManifestFiles.js.map