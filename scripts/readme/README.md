# Profile README artwork

`build.py` generates the SVGs in `.github/readme/` used by the GitHub profile README: the animated banner, the two case-study cards and the contact band, each in a light and a dark variant.

Text is converted to vector outlines, because GitHub's image proxy blocks web fonts. That means the images must be regenerated when something they show changes, such as your title, years of experience or availability.

```sh
python3 -m venv .venv
.venv/bin/pip install -r scripts/readme/requirements.txt
# edit the CONTENT section at the top of build.py, then:
.venv/bin/python scripts/readme/build.py
```

Fonts: Archivo comes from `app/fonts/` (the same trimmed file the site uses), and Fragment Mono is downloaded from Google Fonts on the first run and cached in `scripts/readme/.cache/`.
