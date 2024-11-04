## how to set up design token lib and consume the tokens in project
1. generate the lib by using @nx/js:library
2. design the tokens in json file like this
~~~
{
  "color": {
    "border": {
      "light": { "value": "{color.base.grey.200.value}", "type": "color" },
      "base": { "value": "{color.base.grey.300.value}", "type": "color" },
      "dark": { "value": "{color.base.grey.400.value}", "type": "color" },
      "focus": { "value": "{color.brand.primary.base.value}", "type": "color" },
      "error": { "value": "{color.base.red.600.value}", "type": "color" },
      "warning": { "value": "{color.base.orange.600.value}", "type": "color" },
      "success": { "value": "{color.base.green.600.value}", "type": "color" },

      "button": {
        "secondary": {
          "base": { "value": "{color.border.base.value}", "type": "color" },
          "active": { "value": "{color.brand.secondary.dark.value}", "type": "color" },
          "disabled": { "value": "{color.border.light.value}", "type": "color" }
        }
      }
    }
  }
}
~~~

3. add configurations in config.json for output 
~~~
{
  "source": ["packages/dt/src/tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "packages/dt/src/build/css/",
      "option": {
        "selector": "dt"
      },
      "files": [
        {
          "destination": "_variables.css",
          "format": "css/variables"
        }
      ]
    },
    "scss": {
      "transformGroup": "scss",
      "buildPath": "packages/dt/src/build/css/",
      "prefix": "dt",
      "option": {
        "outputReferences": true,
        "themeable": true
      },
      "files": [
        {
          "destination": "variables.scss",
          "format": "scss/variables"
        }
      ]
    },
    "js": {
      "transformGroup": "js",
      "buildPath": "packages/dt/src/build/js/",
      "files": [
        {
          "destination": "variables.js",
          "format": "javascript/es6"
        }
      ]
    }
  }
}

~~~
4. add Style Dictionary third party library by pnpm add -D style-dictionary
5. add build configuration in project.json
~~~
"build": {
      "executor": "nx:run-commands",
      "options": {
        "commands": ["style-dictionary build --config packages/dt/config.json"]
      }
    }
~~~
6. run nx build dt to generate the tokens, you will find it build for this example
7. import into projects and use it
~~~
xxx.module.scss

@import '../../../../packages/dt/src/build/css/variables.scss';

.component {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: $dt-size-padding-xl;
    color: $dt-color-background-success;
}


xxx.tsx
import * as styles from './app.module.scss';

<p className={styles.component}>
              <b>User: </b> {user?.name}
            </p>
~~~
