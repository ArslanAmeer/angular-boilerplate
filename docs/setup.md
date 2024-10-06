# Project Setup

## Requirements

- Node 20+
- Yarn 1.22+

## Install dependencies

To install all dependencies, run:

```bash
yarn install
```

### Compiles and serve for development

```bash
yarn start
```

### Compiles and serve for development with app accessible over network

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```

---

## Development Guide

This guide provides an overview of key aspects of the project structure and helpful instructions for development.

### Folder Structure

- The project follows a modular architecture with key directories like `@core`, `pages`, `shared`, `shell`, and `theme`.
- The `@core` folder contains essential services, guards, utilities, and helpers needed for the functioning of the entire application.
- The `shared` folder includes reusable components, directives, and pipes, making it easier to reuse code across the app.
- The `theme` folder includes all SCSS files needed for styling, such as `_base`, `_layout`, `_mixin`, `_overrides`, `_utilities`, and `_variables`. This allows for easy customization of themes and styles.
- The `public` folder in root contains all static assets like images, icons, favicons, meta etc.

### Key Development Points

- **Todos**: The application has multiple TODO comments scattered across the codebase. You may want to review these and update them as per your requirements and customization needs.

- **Roles**: User roles are handled as an array fetched from the backend. Ensure your role-based logic reflects this, particularly in services and guards.

- **Icons**: No icon library is included in the project. We generally use SVG icons from the `public` folder. You can add custom icons as required. Specifically, for the sidebar navigation, there’s an `icon` property in the nav items interface where you can specify the icons for different routes.

- **SCSS**: Basic SCSS for the layout is already provided, but it’s built based on enterprise-level use cases. You will likely need to modify the styles according to your design guidelines or application needs. Key SCSS files include:
  - `_base`: Contains base styles.
  - `_layout`: Manages layout styles like grids and spacing.
  - `_mixin`: Reusable mixins for common styles.
  - `_overrides`: Overrides default or third-party styles.
  - `_utilities`: Utility classes for quick styling (e.g., margins, paddings).
  - `_variables`: Central place for colors, breakpoints, and other SCSS variables.

### API Integration Flow

- The app uses a best practice approach to manage API integration. This demo flow is available under the **randomUser** feature.

- **Service**: Each service is responsible for handling one aspect of the application. For example, the **UserService** will only handle user-related API calls. This ensures the **Single Responsibility Principle** is followed. The service functions should be aligned with HTTP request methods such as `find`, `get`, `put`, `create`, and `delete`.

- **Use Cases**: The service is then consumed in the **UseCase** layer. A use case file is responsible for processing the data fetched from the service. You can perform any data mutation, calculation, or transformation inside the use case. The goal is to avoid direct access to services from components.

  Example:

  ```typescript
  const useUser = new UseUser();
  useUser.findUsers(); // Calls the corresponding function in the UseUser use case
  ```

  This modular approach enhances the separation of concerns and ensures that components interact with use cases rather than services directly.

- **Components**: In your components, you will call use case methods for data instead of calling services directly. This modular approach ensures better structure and maintainability.

### Application Architecture

- **Shell Layout**: The app uses a shell structure with components for the header, sidebar, and footer. These components provide the main layout for the app.

- **Auth Setup**: Authentication is entirely modular, with dedicated services, guards, and modules. The authentication system is independent of the rest of the application, so you can make updates to the auth system without affecting other modules.

- **Modules**: The app uses both standalone and modular approach where core sections are split into different modules. For example, the shell and pages are separate module to optimize performance.
- your can add new pages and views either lazy loaded modules or standalone components.

### Predefined Assets

- The project includes several predefined assets, including:
  - **SCSS files** for theming and layouts.
  - **Font files** for consistent typography.
  - **Meta files** to ensure proper SEO and page metadata are set.

### Core and Shared Items

- **Utility Functions**: The `@core/utils` folder contains various utility functions, including data transformers, validators, and object utilities.

- **Theme Service**: The app includes a `ThemeService` that allows for dynamic theme changes, such as switching between light and dark themes. You can modify this service to update CSS variables or apply custom themes.

### Additional Notes

- **Customization**: Since the app provides a solid foundational structure, you'll need to customize various aspects like SCSS, iconography, and utility services based on your project's requirements.

- **Architecture Flexibility**: The modularity of the app allows for easy scaling and modification without affecting the core architecture. You can add new features, modules, or components as needed while maintaining code separation and reusability.

---

This updated setup and development guide should now reflect all the important details regarding API integration and folder structures. Let me know if you'd like any further refinements!
