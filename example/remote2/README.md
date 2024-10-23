# Rsbuild Project

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## How to use postcss module
1. set up the plugins in rsbuild.config.file
~~~
tools: {
    postcss: (opts) => {
        const postcssModules = require('postcss-modules')({
            generateScopedName: "[name]__[local]___[hash:base64:5]",
                hashPrefix: "prefix",
        });
        opts.postcssOptions.plugins.push(postcssModules);
    }
}
~~~
2. use the class with prefix in generate json.
~~~
import './App.css';
import Style from './App.css.json';

function Home() {

  return (
    <div className={Style.content}>
      <h1 >Remote2 home page</h1>
      <div>hello sub home page</div>
      <div>React router v6 + React 18</div>
    </div>
  );
}
~~~

## How to use postcss-selector-prefixer
1. set up the plugins in rsbuild.config.file
~~~
tools: {
    postcss: (opts) => {
        const prefixerPlugin= require('postcss-selector-prefixer')();
        opts.postcssOptions.plugins.push(prefixerPlugin);
    }
}
~~~
2. change css file to module.css file then import the classes from module.css
~~~
import styles from './App.module.css';
function Home() {

  return (
    <div className={styles.content}>
      <h1 >Remote2 home page</h1>
      <div>hello sub home page</div>
      <div>React router v6 + React 18</div>
    </div>
  );
}
~~~


