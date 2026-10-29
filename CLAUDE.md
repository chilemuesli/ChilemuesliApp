# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

React Native 0.77 (plain JS, no TypeScript sources) iOS/Android app for the Chilemüsli project of the Reformierte Kirche Hinwil. Visitors walk through a church; BLE beacons trigger "Müsli" stories (audio/video + images). UI text is German.

## Commands

- `yarn install` (yarn.lock is used); iOS: `cd ios && pod install`
- `yarn start` — Metro
- `yarn ios` / `yarn android` — build and run
- `yarn lint` — ESLint
- `yarn test` — Jest (only `__tests__/App-test.js`, a render smoke test); single test: `yarn jest __tests__/App-test.js -t "renders correctly"`
- `./bundle_ios.sh` — build offline JS bundle into `ios/main.jsbundle` (release builds)

## Architecture

- `App.js` — stack navigator (`@react-navigation/stack`) wiring all screens in `Screens/`, plus the global `@rneui/themed` theme (Button, ListItem). Colors/radii live in `Styles/Common.js`.
- `Service/BeaconRangingService.js` — wraps `react-native-beacons-manager` (a fork pinned by git commit in package.json). Two hardcoded region UUIDs. iOS uses `Beacons.BeaconsEventEmitter`, Android uses `DeviceEventEmitter`; both emit `beaconsDidRange`. Matches beacons against a story's `major`/`minor`. Android permissions are handled natively, not in JS.
- `Service/ReadStoriesService.js` — loads `Stories.json` via `react-native-fs` and prefixes media paths with a platform-specific base dir.
- Story content is NOT in JS assets. Two parallel trees, each with `Stories.json` and numbered folders `01`..`17` (avatar.jpg, story.mp4):
  - `StoryData/` — iOS; added as a folder reference in the Xcode project, read from `MainBundlePath/StoryData/`.
  - `StoryDataAndroid/` — Android; ends up as `android/app/src/main/assets/raw`, copied at startup by `MainApplication.kt` (`copyFolder("raw")`) to `DocumentDirectoryPath/raw/`, which JS reads.
  - Keep both trees and their `Stories.json` in sync when adding or editing stories. Each story has `id`, `title`, `article`, `avatar`, `imageFiles`, `audioFile`, `description`, `major`, `minor`.
- `Screens/WebScreen.js` — WebView; default URL comes from `WELCOME_URL` in `.env` via `react-native-config`. `.env` is local config; do not print or commit its values.
- `Screens/BeaconsDemoScreen.js` / `DebugScreen.js` — dev/diagnostic screens for beacon testing.
