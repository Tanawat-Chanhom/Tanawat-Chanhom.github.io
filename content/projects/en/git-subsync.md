---
title: 'git-subsync'
description: 'A Git extension that links a folder in a repository to a Google Drive folder, much like a submodule, and syncs the two both ways without ever losing a file to a conflict.'
category: 'CLI TOOL'
date: '2026-10-16'
source: 'https://github.com/Tanawat-Chanhom/git-subsync'
tags: ['Go', 'Cobra', 'Google Drive API', 'OAuth 2.0', 'GoReleaser', 'Homebrew', 'GitHub Actions']
---

git-subsync is a Git extension for the files that do not belong in Git: design
exports, briefs, photos, anything a team already keeps in Google Drive. You
link a folder in the repository to a Drive folder, much like a submodule, and
`git subsync sync` keeps the two in step. Once it is installed, git runs it as
`git subsync`.

## The goal

Large binary files bloat a repository, but leaving them only on Drive means
the code and the files that go with it drift apart. I wanted:

- One command that puts a project's Drive folders in the right places after a clone
- Two-way sync by default, plus download-only and upload-only modes
- Conflicts that never lose anyone's work
- Nothing synced ever ending up in Git history

## What I built

| Command                 | What it does                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| add                     | Links a path to a Drive folder from its share link, records it in a committed `.gitsubsync` file, adds the path to `.gitignore` and runs the first sync |
| sync                    | Syncs every linked folder or only the ones named, with `--dry-run` and up to 32 transfers at once                                                       |
| list                    | Shows each folder's mode, Drive folder name and last sync time, even offline                                                                            |
| remove                  | Unlinks a folder, keeping the local files and never touching Drive                                                                                      |
| login / whoami / logout | Signs in with Google in the browser, shows the signed-in account, and revokes the token                                                                 |

## How it works

- **Three checksums decide every file.** A sync compares the MD5 of the local
  file, the Drive file and the version recorded at the last sync. A planner,
  written as a pure function, turns that into download, upload, record, skip
  or conflict for each of the three modes, and the tests cover every row of
  that table.
- **Conflicts keep both versions.** When a file changed on both sides, one
  version is kept as `name_copy_<timestamp>`. Upload mode never overwrites
  Drive: it reports who changed the file and when, and exits with code 2 until
  the conflict is resolved.
- **Every write is checked.** Downloads land in a temporary file and are
  verified against Drive's MD5 before being renamed into place. Uploads become
  a new version of the same Drive file, so share links keep working, and files
  over 8 MiB use resumable uploads. Right before overwriting either side, it
  checks that the file has not changed since the scan.
- **Interrupted syncs pick up where they stopped.** State is saved as files
  finish, including on Ctrl-C, and a lock file stops two syncs of the same
  folder from running at once. Rate limits and server errors are retried with
  exponential backoff.
- **A committed file cannot be turned against you.** `.gitsubsync` travels
  with the repository, so its paths must stay inside the repo and may not pass
  through a symbolic link. The first sync of a folder that already has files
  asks before uploading anything, so a pull cannot quietly link your files to
  someone else's Drive folder.
- **Sign-in is loopback OAuth with PKCE.** A temporary server on `127.0.0.1`
  receives Google's redirect, checks the `state` value and accepts only the
  first callback. The token is stored with `0600` permissions, and refreshed
  tokens are written back to disk.

## Stack

Go, with Cobra for the commands and Google's official Drive API client; only
the CLI package imports Cobra. On every tag, GoReleaser and GitHub Actions
build macOS and Linux binaries for amd64 and arm64, publish a GitHub Release
and update a Homebrew cask in my own tap. CI runs `go vet`, `go test -race` and
a build on Ubuntu and macOS.

## Result

- Four releases, v0.1.0 to v0.3.0, all on 16 October 2026, the day of the
  first commit
- About 4,500 lines of Go and 4,000 lines of tests (130 test functions) that
  run offline against a fake browser, a fake token server and an in-memory
  Drive
- Installs with `brew install --cask tanawat-chanhom/tap/git-subsync`
- Released under the MIT license
