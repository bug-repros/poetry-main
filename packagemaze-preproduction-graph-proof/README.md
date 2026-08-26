# PackageMaze preproduction graph proof fixture

This directory is an inert, deterministic fixture for PackageMaze's protected
preproduction dependency-graph activation proof. It is not an installable
application and is not used by this repository's Poetry reproduction.

`package.json` declares exactly 129 direct dependencies. The lock contains 130
resolved nodes and 130 edges; direct dependency `...-000` has one resolved
transitive child. This forces cursor pagination while remaining inside the
scanner's 4,096-relationships-per-entry and 50-MiB lock limits.

The current revision advances the resolved version of `...-000` while keeping
the same node and edge topology. That produces new dependency evidence for the
hosted proof instead of reusing a historical equivalent-predecessor chain.

The generated inputs are immutable proof evidence. Regenerate them only with
`node generate-lock.mjs`, review both recorded SHA-256 digests, and merge the
change before selecting the resulting exact sealed observation. Retain this
directory while hosted graph receipts or snapshots refer to its observation.
Cleanup is a separate reviewed deletion after the activation issue and its
evidence-retention window close; never rewrite the historical commit or stage
rows directly in PackageMaze storage.

Expected generated input digests:

- `package.json`: `sha256:c559ab5dcf505e61f23c5900e9665a8bdf50dff5e7aa19b32a60ab7b4f0874b4`
- `package-lock.json`: `sha256:6b1e7f988333b711c49809091536cdc2dbd60dd50c499595b7bbcf79ddff7d5c`
