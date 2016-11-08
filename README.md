# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

If the avatars subdirectory doesn't exist it is created.

## Configuration

A .env configuration file is required with the following defined:
```
GITHUB_USER=<username>
GITHUB_TOKEN=<token>
```

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`