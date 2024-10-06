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

We use `pages` folder in `app` folder to manage all the views/screens.
And `_shared` folder within `pages` folder containing views.pages that are shared across multiple users.

```console

├───app
│   ├───@core
│   │   ├───constants
│   │   │   └─── constants set in the whole
│   │   ├───entities
│   │   │   └─── Entity models used in the app
│   │   ├───enums
│   │   │   └─── enums files to be used in the app
│   │   ├───guards
│   │   │   └─── addition guards. Auth related guards are in auth module.
│   │   ├───helpers
│   │   │   └─── helpers files to support the app
│   │   ├───interceptors
│   │   │   └─── interceptors files to intercept the requests
│   │   ├───interfaces
│   │   │   └─── interfaces files to be used in the app
│   │   ├───services
│   │   │   └─── services files used to fetch data from the backend only. they only contain http requests.
│   │   ├───socket-io
│   │   │   └─── contains socket service to be used in the app
│   │   ├───usecases
│   │   │   └─── usecases/compositions files used to get data from the services, mutate or manipulate and pass it to the views.
│   │   └───utils
│   │       └─── utils files containing utility functions
│   ├───auth (complete independent auth module)
│   │   ├───enums
│   │   │   └─── enums files to be used in the auth module only.
│   │   ├───guard
│   │   │   ├─── auth guard
│   │   │   └─── permission guard
│   │   ├───login
│   │   │   └─── login page as default page for the app.
│   │   ├───logout
│   │   │   └─── logout page. (can be called via route)
│   │   └───services
│   │       ├─── authentication service: to handle login, logout.
│   │       ├─── credentials service: to handle authenticated state and credentials stored in localstorage.
│   │       └─── permission serice: to handle permissions.
│   ├───i18n
│   │   ├───i18n service to handle language seletion
│   │   └───language selector component
│   ├───pages
│   │   ├───pages.module
│   │   │   └─── import all the pages in this module.
│   │   └───pages-routing
│   │       └─── Main route file for screen/views/pages. Lazy load other screen, componenet, module etc in this route file
│   ├───shared
│   │   ├───components
│   │   │   └─── Shared Components to be able to use in whole app (for reusability)
│   │   ├───directives
│   │   │   └─── Shared Directives to be available in whole app (for reusability)
│   │   └───pipes
│   │       └─── Shared Pipes to be available in whole app (for reusability)
│   └───shell
│   │   ├───components
│   │   │   └─── Shell Components to be able to use in whole app (for reusability) such as header, footer, sidebar etc.
│   └───└───services
│           └─── shell service: to handle shell related data including sidebar toggle state, handle child routes etc.
│           └─── theme service: to handle theme related data including theme change, theme selection etc.
│
├───theme
│   └─── containes all the theme related files including scss files
└───environments
```

### Structure Explained

- **Core**:
  As the backbone of the application, the `@core` folder contains essential components, services, and utilities for the app’s overall functionality.

  - **Constants**: Contains constant values that are used throughout the app, similar to app settings or configurations.
  - **Entities**: Holds entity models for data manipulation, representing core business objects used throughout the app.
  - **Enums**: Stores all enums to ensure type safety and centralized enum management.
  - **Guards**: Contains additional guards for protecting routes and handling authorization logic.
  - **Helpers**: Utility functions or services like authentication helpers, query builders, error handlers, etc.
  - **Interceptors**: Holds files that intercept and manipulate HTTP requests or responses.
  - **Interfaces**: Centralized location for interface declarations across the app for consistent data contracts.
  - **Services**: This folder includes services dedicated to fetching or sending data to/from the backend through HTTP requests. Services here are aligned with the Single Responsibility Principle.
  - **Socket IO**: Contains a socket service to handle WebSocket communications across the app.
  - **Usecases**: These are composition functions that act as the intermediary between services and views. They manipulate or transform data fetched from services before passing it to the UI.
  - **Utils**: Utility functions like validators, transformers, or helper functions that don’t depend on specific app features.

- **Auth** (Independent module):
  A completely independent authentication module.

  - **Enums**: Manages enums specific to authentication.
  - **Guards**: Contains guards related to authentication, like the auth guard and permission guard.
  - **Login**: The login page that serves as the app’s default landing page.
  - **Logout**: The logout page, accessible via route to terminate sessions.
  - **Services**: Contains services related to authentication, managing user sessions, credentials, and permissions.
    - Authentication Service: Handles login and logout functionality.
    - Credentials Service: Manages session state and user data in local storage.
    - Permission Service: Handles user access levels and permissions.

- **i18n**:
  Manages internationalization, including:

  - **i18n Service**: Handles language selection and translation.
  - **Language Selector Component**: A reusable component to switch between languages in the app.

- **Pages**:
  Manages all views/screens shown to the user.

  - **Pages Module**: The module approach used to group related screens into modules that are lazy-loaded. Each major section or feature can have its own module, and these modules are imported into the shell module.
  - **Pages Routing**: Main routing file for the app's screens. It handles lazy-loading of other modules, components, and views to improve performance.

- **Shared**:
  This folder contains reusable components, directives, and pipes that can be used across the entire application.

  - **Components**: Shared components like buttons, forms, or other UI elements that can be used across multiple views.
  - **Directives**: Shared directives that can be used across multiple modules.
  - **Pipes**: Reusable pipes for formatting or transforming data within the app.

- **Shell**:
  Manages the core layout components that are used throughout the app.

  - **Components**: Reusable components like the header, footer, sidebar, etc., which make up the app’s structure.
  - **Services**:
    - **Shell Service**: Manages data related to the layout, like the sidebar toggle state or handling child routes.
    - **Theme Service**: Manages app themes, including theme switching and selection.

- **Assets**:
  Contains static files, such as images, icons, and language files, used across the app.

- **Theme**:
  This folder contains all SCSS files responsible for managing the application's theme and styles.

  - **\_base**: Handles basic style definitions and resets.
  - **\_layout**: Manages layout-specific styles such as grids, containers, and spacing.
  - **\_mixin**: Defines reusable SCSS mixins for consistent styling across the app.
  - **\_overrides**: Contains styles that override third-party or default styles.
  - **\_utilities**: Utility classes for common tasks like margin, padding, or text alignment.
  - **\_variables**: Stores SCSS variables for colors, fonts, breakpoints, etc.
  - **Main theme file**: Imports all the partials and applies the complete theme to the app, handling customization and styling of various components.

- **Environments**:
  Stores environment-specific configurations like API endpoints for different builds (development, production, etc.).
