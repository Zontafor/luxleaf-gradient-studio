import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const manifest = JSON.parse(await readFile('.luxleaf/upstream-manifest.json', 'utf8'));
const hash = async path => createHash('sha256').update(await readFile(path)).digest('hex');
let verified = 0, modifiedUpstreamFiles = 0;
for (const [path, expected] of Object.entries(manifest.files)) {
  const patch = manifest.modifications?.[path];
  const original = patch?.original ?? manifest.relocations[path] ?? path;
  if (await hash(original) !== expected) throw Error('Original source differs: ' + path);
  if (patch) {
    if (!patch.reason || await hash(path) !== patch.sha256) throw Error('Unrecorded modification: ' + path);
    modifiedUpstreamFiles++;
  }
  verified++;
}
console.log(JSON.stringify({ repository: manifest.repository, revision: manifest.revision, verified, modifiedUpstreamFiles }));
