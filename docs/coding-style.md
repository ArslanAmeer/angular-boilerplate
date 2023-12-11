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

### Structure Explained

- `Core`: As the name suggests, this folder serves as the core of the app and encompasses all core responsibilities, including the layers described above.
  - `constants`: This will hold app constants and default values, similar to app settings.
    - This folder can also include enums, or we can create a separate folder specifically for `enums`.
  - `entities`: Will contain entity models. This can either include models for the entire app or we could have a separate folder for interfaces related to our views.
  - `guards`: This will contain all Angular guards used within the app.
  - `helpers`: This can hold helper files like authentication utilities, interceptors, error handlers, and query builders, etc.
  - `services`: Will contain all Angular services used for backend operations.
    - Each service file should adhere to the Single Responsibility Principle and, if possible, implement REST functions like `get`, `find`, `create`, `update`, `delete`, etc.
    - This folder can also house state or data services, and any other required services.
    - UI-related custom services like modal, loading, or toaster services can be moved to the `shared > services` folder as well.
  - `usecases`: Also referred to as compositions, this will include custom-named functions that utilize service functions to map, transform, and mutate data for our views. Views can then call these functions. This should serve as the intermediary between services and components, eliminating the need for direct communication between the two.
  - `utils`: Will include utility functions that are independent of any other layer, such as slugify, data transformers, array utilities, object utilities, local storage helpers, validators, etc.
  - `ui`: This can either reside outside of `Core` in a `theme` folder or within `Core` itself. It will contain the core layout of the app and components like the header and sidebar, which need to remain consistent throughout the app. Other pages like "Page Not Found" or "Access Denied" can be moved to a shared folder.
- `Shared`:
  - Will contain components, directives, pipes, etc., that are shared and can be used in UI pages.
  - May also include a `modules` folder for modules composed of a bunch of components like custom calendars or tables, although it is preferable to keep these as components.
- `Pages`:
  - Will contain all individual pages rendered to the user, built using shared components.
    - We can manage multiple user dashboards by creating a separate folder for each.
- `Assets`:
  - Will contain all app assets such as images, icons, language files, etc.
