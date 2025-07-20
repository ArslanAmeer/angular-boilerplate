# <p align="center" style="font-size:40px; font-weight: bold;">Angular Boilerplate</p>

<p align="center">
     <img src="public/icons/icon-512x512.png" alt="angular" width="90">
     <img src="https://cdn-icons-png.flaticon.com/512/1408/1408941.png" alt="document" width="90">
</p>

> ### A Fully-Configured Angular v20 Boilerplate for Enterprise-Grade Applications

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/3f3d0969-3549-4300-863d-06a1d6785cd0/deploy-status)](https://app.netlify.com/sites/angular-boiler-palte/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()

## [!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/arslanameer)

- ⬇️ Older Versions
  - [Angular 19 Branch](https://github.com/ArslanAmeer/angular-boilerplate/tree/angular-v19)
  - [Angular 18 Branch](https://github.com/ArslanAmeer/angular-boilerplate/tree/angular-v18)
  - [Angular 16 Branch](https://github.com/ArslanAmeer/angular-boilerplate/tree/angular-v16)

Get started fast with this **Angular 20** boilerplate, crafted for **enterprise-level scalability**. It integrates critical features like **authentication**, **lazy loading**, **real-time socket communication**, **service workers**, **shell layout (header+sidebar)** making it ready to handle everything from SaaS platforms to enterprise dashboards. Built on the latest **Angular 20**, this template is packed with the newest capabilities and ensures that you adhere to **modern development best practices**.

With a solid foundation of **PWA (Progressive Web App)**, **authentication**, **role-based permissions**, **HTTP interceptors**, **socket integration**, and more, this boilerplate takes care of the core setup so you can focus on building features.

### Key Features:

- [x] **Angular 20**: Built with the latest version, utilizing improved standalone components and reactive forms.
- [x] **PWA (Progressive Web App) support**: Fully configured to enable offline capabilities, background sync, and push notifications.
- [x] **Scalable folder structure**: Optimized for enterprise-level applications with a modular design that adapts to growing project needs.
- [x] **Separation of concerns**: Adopting [Domain-Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design) for a clear boundary between business logic and infrastructure code.
- [x] **Modularization**: Components, services, pipes, and directives are split into reusable modules for easy maintenance and scalability.
- [x] **Hybrid architecture**: Combines both standalone components and module-based structure, optimizing the initial app component as standalone and using modules for pages and shell.
- [x] **[Lazy loading](https://angular.io/guide/lazy-loading-ngmodules)**: Efficiently loads only the necessary modules, improving app performance.
- [x] **[Routing with guards](https://angular.io/guide/router)**: Robust routing system with [authentication and authorization guards](https://angular.io/api/router/CanActivate) for secured navigation.
- [x] **Complete authentication system**: Pre-configured JWT-based authentication, including services, guards, and interceptors for seamless integration.
- [x] **[Guards](https://angular.io/api/router/CanActivate)**: Role-based guards to protect routes and enforce permissions.
- [x] **[Interceptors](https://angular.io/api/common/http/HttpInterceptor)**: Secure API communication with interceptors handling authentication and error management.
- [x] **i18n Translation support**: Full [internationalization](https://angular.io/guide/i18n) for multi-language apps, with seamless integration of translation services.
- [x] **Basic error handling**: Centralized error handling for smooth debugging and a better user experience.
- [x] **Class-based entities**: Utilizing [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) concepts for consistent and maintainable entity structures.
- [x] **Implementation of [Class Transformers](https://github.com/typestack/class-transformer)**: Easily transform backend data models to frontend-friendly formats (e.g., snake_case to camelCase).
- [x] **[Socket.io](https://socket.io/) integration**: Real-time updates with modular socket services that seamlessly integrate with the Angular ecosystem.
- [x] **App updates in production**: Automatic app updates for production environments, ensuring users always get the latest features and fixes without manual intervention.
- [x] **Environments for development and production**: Predefined configurations for different environments, ensuring smooth deployment and testing processes.
- [x] **Utility functions**: A set of reusable functions to handle common tasks like:
  - **Local storage obfuscation**: Getters and setters that automatically encrypt and decrypt data in production environments.
- [x] **Helper functions**: Pre-configured helper functions for common development tasks, enhancing productivity and code quality.
- [x] **Detailed documentation**: Comprehensive documentation for setup, dependencies, coding styles, utility functions, and more, to help developers get up to speed quickly.
- [x] **Documented utility and helper functions**: Clearly explained and reusable across the application, with customization options.

### Development Best Practices

This boilerplate enforces **strict best practices** and includes a configured **ESLint flat config** to guide developers in writing clean, maintainable, and high-quality code:

- **Code Quality**: ESLint rules enforce coding standards like naming conventions, indentation, and eliminating unused code.
- **No Direct Service Access**: Encourages a clean architecture by requiring components to interact with data via **UseCases**, keeping the service layer isolated.
- **Modularization**: Promotes single-responsibility services, with each service handling only domain-specific tasks.
- **Scoped Variables**: Enforces scoped use of variables and functions, reducing the risk of global state conflicts.
- **Clean, Maintainable Code**: The **standalone component** and **module-based** hybrid structure optimizes performance and keeps the codebase organized.
- **DRY Principle**: Adheres to **Don't Repeat Yourself (DRY)** principles, reducing redundancy and improving the maintainability of code.
- **Security Awareness**: Built-in ESLint rules ensure you avoid common security pitfalls, ensuring secure and performant code.

### ESLint Configuration Highlights:

- **Strict Linting Rules**: Custom **ESLint flat config** enforces coding standards, ensuring consistent formatting and type checking across the codebase.
- **Prettier Integration**: Maintains consistent code styling with automatic formatting on save or commit.
- **Error Prevention**: Detects common issues early on, such as missing type declarations or direct DOM manipulations.
- **Security Focused**: The configuration includes security-related rules to avoid risky code patterns.

### Why Choose This Boilerplate?

This Angular 20 boilerplate goes beyond just being a starting template—it's a **fully equipped foundation** for any **enterprise-level project**. From **fully configured authentication** and **lazy loading** to **role-based permissions** and **real-time communication**, it covers the most common requirements out-of-the-box.

By enforcing **best coding practices** and strict **ESLint rules**, the boilerplate guarantees that every contributor to your project adheres to **high development standards**. Plus, the **modular, scalable architecture** and **cutting-edge Angular features** ensure that this project grows with you.

Whether you’re developing a SaaS platform, building a dynamic web app, or designing an enterprise-level solution, this boilerplate gives you the tools you need—fast.

### Continuous Updates

This project will be regularly updated with the latest **Angular** releases, ensuring compatibility with the latest features and security updates. Stay tuned for new enhancements and features as they are added based on evolving development needs.

### Demo:

Check out working demo [here](https://angular-boilerplate.arslanameer.com)

> ## **Note:** <small style="color: red"> You can remove this with all the above lines and use rest in your documentation.</small>

---

# Web Front-End

## Status Badges

<p align="right"> &nbsp;</p>

## 💻 Current Stack Version:

- Node `^v22`
- Angular `^v20`

<p align="right"> &nbsp;</p>

## 🚀 Project setup

If you want to setup this project locally and start developing, read setup and developers guide here: [Setup](docs/setup.md)

<p align="right"> &nbsp;</p>

## 😎 Coding style

We make use of **[Javascript Standard Style](https://standardjs.com/)** while developing.

You can integrate it with [eslint](https://eslint.org/) linter tool in your IDE to help smoothen the process by integrating automatic linting in compile time.

We already have a `eslint.config.js` file in the root of the project which you can use to configure your IDE.

We also have husky hooks with prettier and eslint to make sure that the code is linted and formatted before committing.

If you want to read more about the rules, read [Coding style](docs/coding-style.md)

<p align="right"> &nbsp;</p>

## 🧳 Dependencies

If you want to read more about dependencies in this platform, read [Dependencies](docs/dependencies.md)

<p align="right"> &nbsp;</p>

## 🪢 Helper and Utility functions

We have several documented helper and utility functions that play a big part of the platform. They are available in `@core\helpers` and `@core\utils` folder.

<p align="right"> &nbsp;</p>

---

## 📜 Change Logs:

_(Latest)_

<p align="right"> &nbsp;</p>

## [Version 0.0.0] - 2025-07-20

### Added

### Changed

### Fixed

---

<p align="right"> &nbsp;</p>

_You can see all change logs [Here](/CHANGELOG.md)._

<p align="right"> &nbsp;</p>

---

Author:

[Arslan Ameer](www.arslanameer.com) | [GitHub](https://github.com/ArslanAmeer)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/arslanameer)
