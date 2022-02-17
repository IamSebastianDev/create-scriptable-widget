<!-- @format -->

# 🚀 Create Scriptable Widget

A simple opinonated toolchain to simplify the development and deployment of **Scriptable Widgets**. [Scriptable](https://scriptable.js) is a simple way to automate iOs using JavaScript.

> **Please note:** This package/toolchain is currently in development and at best, to be considered a prototype. There will be changes going forward that will probably break a lot of things. You can still use this package, but you might want to check back before publishing a widget to see if things changed significanlty.

# Overview

This monorepo contains all elements that are used in the toolchain.

## packages/create-scriptable-widget

The main binary package that contains the executable bin script that will copy the template repository and set up the project. It also contains the scripts used by the template repo to create and serve the development and build enviroment.

## packages/scriptable-tools

A loose, tree-shakeable collection of extensions, tools and polyfills to enhance and extend scriptable.

## packages/scriptable-uml

A simple script that can be used to easily load modules into your scriptable widget without using a bundler.

## template

The template repository cloned by the create-scriptable-widget package script. It contains a pre configured development enviroment that can be easily adapted to your needs.

## docs

The docs directory contains the documentation files and the documentation website.

# Todos

Things that should be worked on:

-   create a way to choose between multiple different templates (webpack instead of rollup, typescript, etc...)
-   significantly rewrite the create-scriptable-widget package to increase robustness

# 📋 License

Create-Scriptable-Widget is licensed under the [MIT License](https://opensource.org/licenses/MIT).

# 🦄 Thanks & Acknowledgments

-   [Simon Støvring](https://simonbs.dev) for creating [Scriptable](https://scriptable.app)
-   [Sillium](https://gitlab.com/Sillium) for the idea of an [Universal Scriptable Widget](https://gitlab.com/sillium-scriptable-projects/universal-scriptable-widget)
-   [The contributors](https://github.com/schl3ck/ios-scriptable-types/graphs/contributors) of [ios-scriptable-types](https://github.com/schl3ck/ios-scriptable-types)
