#!/bin/bash

SCRIPT_NAME=$(basename "$0")
ZIP_NAME="../vim-navigation-google-mozilla.zip"

zip -r "$ZIP_NAME" . -x "$SCRIPT_NAME" -x ".git/*"
