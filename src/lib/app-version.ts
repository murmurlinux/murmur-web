// Single source of truth for the Murmur app version surfaced on the website.
//
// This file is updated automatically by the version-sync workflow
// (.github/workflows/version-sync.yml) every time murmurlinux/murmur
// cuts a new release. Do not hand-edit.
//
// All pages, components, and chatbot knowledge import APP_VERSION (and
// the derived URLs / filenames below) from here. Adding a new surface
// that shows the app version? Import, do not duplicate.

export const APP_VERSION = "0.3.99";
export const APP_VERSION_TAG = `v${APP_VERSION}`;

export const debFilename = `Murmur_${APP_VERSION}_amd64.deb`;
export const appImageFilename = `Murmur_${APP_VERSION}_amd64.AppImage`;

const RELEASE_BASE = `https://github.com/murmurlinux/murmur/releases/download/${APP_VERSION_TAG}`;

export const debUrl = `${RELEASE_BASE}/${debFilename}`;
export const appImageUrl = `${RELEASE_BASE}/${appImageFilename}`;
