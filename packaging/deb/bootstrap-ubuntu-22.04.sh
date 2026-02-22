#!/usr/bin/env bash
set -euo pipefail

NONINTERACTIVE=0
if [[ ${1:-} == "--noninteractive" ]]; then
  NONINTERACTIVE=1
fi

if command -v node >/dev/null 2>&1; then
  exit 0
fi

if [[ $EUID -ne 0 ]]; then
  if command -v sudo >/dev/null 2>&1; then
    if [[ $NONINTERACTIVE -eq 1 ]]; then
      exec sudo -n bash "$0" --noninteractive
    fi
    exec sudo bash "$0" --noninteractive
  fi
  echo "Node.js is missing and sudo is unavailable. Run this script as root." >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

apt-get update -y
apt-get install -y --no-install-recommends ca-certificates curl gnupg

if [[ ! -f /etc/apt/keyrings/nodesource.gpg ]]; then
  mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
fi

if [[ ! -f /etc/apt/sources.list.d/nodesource.list ]]; then
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" > /etc/apt/sources.list.d/nodesource.list
fi

apt-get update -y
apt-get install -y --no-install-recommends nodejs

exit 0
