#!/usr/bin/env bash
#
kill -9 `head -n 1 aServer.js.pid`
#
nohup node aServer.js &