---
title: 'git-khong-song'
description: 'A self-hosted, multi-user git forge with private repositories, pull requests and CI/CD pipelines you draw in the browser, triggered by real server-side git hooks.'
category: 'DEV PLATFORM'
date: '2026-10-15'
link: 'https://git.tanawat-personal.tech'
cover: '/images/projects/git-khong-song.webp'
coverAlt: 'The git-khong-song admin monitor: terminal-style panels showing user, push and pipeline counts, system health tags, storage bars, hourly traffic bar charts, an event log and a table of pipeline runs'
featured: true
tags: ['Go', 'Next.js', 'TypeScript', 'MongoDB', 'Docker', 'OpenAPI', 'React Flow', 'MUI X Charts']
---

git-khong-song is the git server I run on my own VPS. It started as a
read-only viewer in the style of [stagit](https://git.suckless.org/) for a
handful of repositories, and within a week grew into a small forge: anyone can
sign up, push over SSH, open pull requests and run CI/CD pipelines, while an
admin dashboard keeps an eye on all of it.

## The goal

I wanted GitHub's core loop (push, review, merge, build) on infrastructure I
own, without running something as heavy as GitLab. That meant:

- Accounts tied to an SSH key, and repositories that belong to their owner
- Pull requests that merge the way GitHub's do
- CI/CD triggered by real server-side git hooks, not by polling
- An admin area that observes everything and changes nothing

## What I built

| Area          | What it does                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Accounts      | Sign up with a username, password and SSH public key; sign-up and login are rate-limited                                                     |
| Repositories  | Private to their owner: on the website and over SSH, everyone else gets a 404                                                                |
| Browsing      | Log, files, refs, README and commit diffs, rendered live from git, so a push shows up immediately                                            |
| Pull requests | Compare branches, discuss, check for conflicts, merge with a real merge commit                                                               |
| Pipelines     | Drawn as a graph with React Flow, triggered by the pre-receive, update, post-receive or post-update hook, run in throwaway Docker containers |
| Monitoring    | Users, repositories, traffic, events, pipeline runs and health, in a terminal-style dashboard charted with MUI X Charts                      |

## How it works

- **SSH goes through my own gatekeeper.** Every key in `authorized_keys` is
  pinned to a forced command, `gks-shell`, a small static Go binary. It accepts
  only the three git commands, asks the API whether the key's owner may read or
  push, then hands over to git. Anything else, a shell included, is refused.
- **Git hooks become events.** Each repository's hooks are one-line scripts
  that call `gks-shell hook <name>`, which reports the pushed refs to an
  internal API listening only on loopback. Every push lands in the event log
  and can start a pipeline.
- **Pipelines can say no.** A pipeline on pre-receive or update blocks the
  push: the hook waits for the run, streams job status back to the pusher as
  `remote:` lines, and rejects the push if a job fails. Jobs run without
  privilege escalation, with CPU, memory and process limits, on a network of
  their own, and cannot reach the Docker socket, the database or the internal
  API.
- **Merges are safe against races.** Conflicts are detected with
  `git merge-tree`; the merge commit is built with `commit-tree` and lands
  through a compare-and-swap `update-ref`, so a push that arrives mid-merge
  makes the merge fail instead of being overwritten.
- **One contract for two languages.** An OpenAPI spec generates both the Go
  server interface and the TypeScript client types. A test reads the spec to
  check that every admin operation is read-only and every endpoint touching a
  repository requires a session.
- **Privacy has a single gate.** Any request with an `{owner}` in its path
  returns 404 unless you are that owner, so a private repository looks exactly
  like one that does not exist.

## Stack

A Go backend in clean-architecture layers (domain, use cases, adapters),
Next.js 16 with React Server Components and Tailwind CSS, and MongoDB. Four
services run under Docker Compose (database, API, pipeline runner and web)
behind Caddy. The whole site runs under a strict nonce-based Content Security
Policy, which decided how the pipeline canvas and the charts are built: both
render only in the browser.

## Result

- Built and deployed in about a week, from the first commit on 8 October 2026
  to the monitoring dashboard on 15 October
- About 10,500 lines of Go and 4,400 of TypeScript, backed by more than 90 Go
  tests
- 52 API operations, all generated from one spec
- It hosts its own source: the project's repository lives on it, and its
  pipeline runs on every push
