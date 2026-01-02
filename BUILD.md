# Build Instructions

## JavaScript Minification

This project uses minified JavaScript files to improve performance and make the code less readable in browsers.

### Prerequisites

- Node.js installed (npm comes with Node.js)

### Building Minified Files

Run the following command to minify all JavaScript files:

```bash
npm run build
```

This will create:
- `billing/billing.min.js` (minified version of billing.js)
- `billing/billing.min.js.map` (source map for debugging)
- `script.min.js` (minified version of script.js)
- `script.min.js.map` (source map for debugging)

### Individual Build Commands

To minify specific files:

```bash
# Minify billing.js only
npm run minify:billing

# Minify script.js only
npm run minify:main
```

### Deployment to GitHub Pages

1. Make changes to source files (`billing.js`, `script.js`)
2. Run `npm run build` to generate minified versions
3. Commit both source and minified files:
   ```bash
   git add .
   git commit -m "Update and build minified files"
   git push
   ```
4. Merge to gh-pages branch:
   ```bash
   git checkout gh-pages
   git merge main
   git push
   git checkout main
   ```

### Development vs Production

- **Source files** (`billing.js`, `script.js`): Edit these during development
- **Minified files** (`*.min.js`): Generated automatically, used in production
- **Source maps** (`*.min.js.map`): Help debug minified code in browser DevTools

### Notes

- The HTML files reference the `.min.js` versions
- Always rebuild after making changes to source JavaScript files
- Source maps allow you to debug using original source code even though minified files are loaded
