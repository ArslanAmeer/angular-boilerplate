# Coding Style

## Coding style

For coding style and linter we use **[Javascript Standard Style](https://standardjs.com/)**

Despite what is indicated in Standard.js webpage, we don't use as standard a package, but trying to follow the rules for best practices. We are planning to use
[@angular-eslint/schematic](https://github.com/angular-eslint/angular-eslint)

## Why

Javascript standard style **[isn't a real web standard](https://standardjs.com/index.html#but-this-isnt-a-real-web-standard)**, but this rules helps to keep the code to a high
_standard of quality_ and ensures that all contributors follow some basic coding style.

A [lot of companies](https://standardjs.com/index.html#who-uses-javascript-standard-style) around the world are using standard.js

## Rules (brief)

- Use 2 spaces for indentation.
- Use single quotes for strings except to avoid escaping.
- Use camelcase when naming variables and functions.
- Add a space after keywords.
- Trailing commas not allowed.
- Add a space before a function declaration's parentheses.
- Always use === instead of ==.
- Keep else statements on the same line as their curly braces.
- Multiple blank lines not allowed.
- For var declarations, write each declaration in its own statement.
- **No semicolons.** (Currently we are using semicolons, but we are planning to remove them)

Check full _standard.js_ rules at [standard.js rules page](https://standardjs.com/rules.html)

## Typescript

The project uses both ES and Typescript. Config for Typescript compiler is _allowJs = true_

### Code organization

We use `pages` folder in `app` folder to manage individual user's dashboard containing all required screens for that specific user.
And `_shared` folder within `pages` folder containing views.pages that are shared across multiple users.

```console

├───app
│   ├───@core
│   │   ├───constants
│   │   │   └─── constants set in the whole
│   │   ├───entities
│   │   │   └─── Entity models used in the app
│   │   ├───guards
│   │   │   ├─── access.guard.ts
│   │   │   ├─── auth.guard.ts
│   │   │   ├─── logout.guard.ts
│   │   │   └─── noAuth.guard.ts
│   │   ├───helpers
│   │   │   └─── helpers files to support the app
│   │   ├───services
│   │   │   └─── services files used to fetch data from the backend only
│   │   ├───ui
│   │   │   ├───components
│   │   │   │   │───sidebar
│   │   │   │   └───topbar
│   │   │   └───pages
│   │   │       │───access-restricted
│   │   │       └───not-found
│   │   ├───usecases
│   │   │   └─── usecases/compositions files used to get data from the services, mutate or manipulate and pass it to the views.
│   │   └───utils
│   │       └─── utils files containing utility functions
│   ├───shared
│   │   ├───components
│   │   │   └─── Shared Components to be able to use in whole app (for reusability)
│   │   ├───directives
│   │   │   └─── Shared Directives to be available in whole app (for reusability)
│   │   └───pipes
│   │       └─── Shared Pipes to be available in whole app (for reusability)
│   └───pages
│       ├───_shared
│       │   └─── Shared pages to be used with in other views scoped in pages folder.
│       └─── All other folders inside are scoped as an individual Dashboard of a user e.g; 
             User type 2 Dashboard will have all its views.pages inside User type 2 folder.
├───assets
└───environments
```
