import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";

const directCount = 129;
const dependencyEntries = Array.from({ length: directCount }, (_, index) => {
  const suffix = index.toString().padStart(3, "0");
  return [`packagemaze-graph-proof-direct-${suffix}`, "1.0.0"];
});
const dependencies = Object.fromEntries(dependencyEntries);
const packages = {
  "": {
    name: "packagemaze-preproduction-graph-proof",
    version: "1.0.0",
    dependencies,
  },
};

for (const [name, version] of dependencyEntries) {
  packages[`node_modules/${name}`] = {
    version,
    resolved: `https://registry.npmjs.org/${name}/-/${name}-${version}.tgz`,
    ...(name.endsWith("-000")
      ? { dependencies: { "packagemaze-graph-proof-nested-leaf": "1.0.0" } }
      : {}),
  };
}
packages["node_modules/packagemaze-graph-proof-nested-leaf"] = {
  version: "1.0.0",
  resolved:
    "https://registry.npmjs.org/packagemaze-graph-proof-nested-leaf/-/packagemaze-graph-proof-nested-leaf-1.0.0.tgz",
};

const manifest = `${JSON.stringify(
  {
    name: "packagemaze-preproduction-graph-proof",
    private: true,
    version: "1.0.0",
    description:
      "Deterministic PackageMaze preproduction dependency graph proof fixture",
    dependencies,
  },
  null,
  2,
)}\n`;
const lock = `${JSON.stringify(
  {
    name: "packagemaze-preproduction-graph-proof",
    version: "1.0.0",
    lockfileVersion: 3,
    requires: true,
    packages,
  },
  null,
  2,
)}\n`;

writeFileSync(new URL("package.json", import.meta.url), manifest);
writeFileSync(new URL("package-lock.json", import.meta.url), lock);
for (const [name, content] of [
  ["package.json", manifest],
  ["package-lock.json", lock],
]) {
  process.stdout.write(
    `${name} sha256:${createHash("sha256").update(content).digest("hex")}\n`,
  );
}
