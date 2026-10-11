# Fonts

`archivo-latin-var.woff2` is [Archivo](https://github.com/Omnibus-Type/Archivo) (SIL Open Font License 1.1, copyright The Archivo Project Authors), trimmed for this site: 52 KB instead of the 90 KB Google Fonts serves.

- Axes limited to the ranges the site uses: weight 400–800, width 100–125%.
- Latin subset only (same unicode range as Google Fonts' `latin` subset).
- OpenType features kept: `kern`, `liga`, `ccmp`, `locl`, `mark`, `mkmk`, `rvrn`.

If a page ever needs a weight or width outside those ranges, regenerate it from the Google Fonts variable file with [fontTools](https://github.com/fonttools/fonttools):

```sh
fonttools varLib.instancer archivo-latin-vf.woff2 wght=400:800 wdth=100:125 -o archivo-limited.ttf
pyftsubset archivo-limited.ttf \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
  --layout-features="kern,liga,ccmp,locl,mark,mkmk,rvrn" \
  --no-glyph-names --name-IDs='*' --flavor=woff2 \
  --output-file=archivo-latin-var.woff2
```
