# <p style="font-size:40px; font-weight: bold; text-align: center" align="center">Angular Boiler Plate</p>

<p align="center" float="left">
     <img src="public/icons/icon-512x512.png" alt="angular" width="90">
  <img src="https://cdn-icons-png.flaticon.com/512/1408/1408941.png" alt="document" width="90">
</p>

A Scalable pre-configured Angular Boiler Plate, built with latest angular version 18 default standalone approach contains all the necessary pre-configured features with proper enterprise scalable structure to start a new project without needing to create them from scratch.
It also contains a lot of features that are required in most of the projects including authentication, lazy loading, guards, interceptors etc.

### This boilerplate includes the following features:

- [x] Angular 18.
- [x] PWA (Progressive Web App) support.
- [x] Scalable folder structure.
- [x] Separation of concerns (Adapting [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)).
- [x] Modularization of components, services, pipes, directives, etc.
- [x] Both standalone and module based approach. App(initial component) configured as standalone and modules(pages, shell) are configured as modules.
- [x] [Lazy loading](https://angular.io/guide/lazy-loading-ngmodules) of modules.
- [x] [Routing](https://angular.io/guide/router) with [guards](https://angular.io/api/router/CanActivate).
- [x] Complete authentication system (Auth service, guard, interceptors etc ).
- [x] Authentication with [JWT](https://jwt.io/).
- [x] [Guards](https://angular.io/api/router/CanActivate) for authentication and authorization.
- [x] [Interceptors](https://angular.io/api/common/http/HttpInterceptor).
- [x] Complete Translation i18n integration.
- [x] Basic Error handler.
- [x] Class based entities. (Adapting [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)).
- [x] Implementation of [Class Transformers](https://github.com/typestack/class-transformer) so that we can transform our entities to and from backend data models. Usually apis return data in snake case and we need to
      convert them to camel case and vice versa.
- [x] [Socket.io](https://socket.io/) integration with proper modularization and angular friendly service.
- [x] App updates in production.
- [x] Environments for development and production.
- [x] Utility functions for common tasks.
  - [x] Local storage obfuscation with getters and setters which automatically encrypt and decrypt (not active by default) data on production and can add more functions as per requirements.
- [x] Helper functions for common tasks.
- [x] Proper documentation for setup, dependencies, coding style etc.
- [x] Documented helper and utility functions.

And many more...

Please note that this boilerplate is not a complete solution for all the projects. It is just a starting point for your project.
You can use this boilerplate as a starting point for your project and then add or remove features as per your requirements.
The features and design of this boilerplate are based on my experience of working on several projects.

This boilerplate will remain updated with the latest versions of Angular and other dependencies.
It will also be updated with new features as they are required in most of the projects.

This is a template for README.md file for your project. You can use this template to create your own README.md file for your project.

> ## **Note:** <small style="color: red"> You can remove this with all the above lines and use rest in your documentation.</small>

# Web Front-End

## Status Badges

<p align="right"> &nbsp;</p>

## 💻 Current Stack Version:

- Node `^v20`
- Angular `^v18`

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

## [Version 0.0.0] - 2023-01-20

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
