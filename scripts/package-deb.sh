#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
VERSION=${1:-}
ARCH=${2:-amd64}
OUT_DIR=${3:-"$ROOT_DIR/dist/deb"}

if [[ -z "$VERSION" ]]; then
  echo "Usage: $0 <version> [arch] [out-dir]" >&2
  exit 2
fi

copy_dir() {
  local src="$1"
  local dest="$2"
  local parent
  local name
  parent="$(dirname "$src")"
  name="$(basename "$src")"
  if command -v tar >/dev/null 2>&1; then
    tar -C "$parent" -cf - "$name" | tar -C "$dest" -xf -
    return
  fi
  cp -a "$src" "$dest"
}

CONTROL_TEMPLATE="$ROOT_DIR/packaging/deb/control"
SERVICE_FILE="$ROOT_DIR/packaging/deb/openclaw-gateway.service"
POSTINST_FILE="$ROOT_DIR/packaging/deb/postinst"
POSTRM_FILE="$ROOT_DIR/packaging/deb/postrm"
BOOTSTRAP_FILE="$ROOT_DIR/packaging/deb/bootstrap-ubuntu-22.04.sh"
WRAPPER_FILE="$ROOT_DIR/packaging/deb/openclaw"

if [[ ! -f "$CONTROL_TEMPLATE" ]]; then
  echo "Missing control template: $CONTROL_TEMPLATE" >&2
  exit 1
fi
if [[ ! -f "$SERVICE_FILE" ]]; then
  echo "Missing systemd unit: $SERVICE_FILE" >&2
  exit 1
fi
if [[ ! -f "$POSTINST_FILE" ]]; then
  echo "Missing postinst: $POSTINST_FILE" >&2
  exit 1
fi
if [[ ! -f "$POSTRM_FILE" ]]; then
  echo "Missing postrm: $POSTRM_FILE" >&2
  exit 1
fi
if [[ ! -f "$BOOTSTRAP_FILE" ]]; then
  echo "Missing bootstrap script: $BOOTSTRAP_FILE" >&2
  exit 1
fi
if [[ ! -f "$WRAPPER_FILE" ]]; then
  echo "Missing wrapper script: $WRAPPER_FILE" >&2
  exit 1
fi

BUILD_DIR=$(mktemp -d)
PKG_ROOT="$BUILD_DIR/root"
DEBIAN_DIR="$PKG_ROOT/DEBIAN"
APP_DIR="$PKG_ROOT/opt/openclaw"
BIN_DIR="$PKG_ROOT/usr/bin"
SYSTEMD_DIR="$PKG_ROOT/lib/systemd/system"
BOOTSTRAP_DIR="$APP_DIR/bootstrap"

mkdir -p "$DEBIAN_DIR" "$APP_DIR" "$BIN_DIR" "$SYSTEMD_DIR" "$BOOTSTRAP_DIR"

sed -e "s/@VERSION@/${VERSION}/g" -e "s/@ARCH@/${ARCH}/g" "$CONTROL_TEMPLATE" > "$DEBIAN_DIR/control"
install -m 0755 "$POSTINST_FILE" "$DEBIAN_DIR/postinst"
install -m 0755 "$POSTRM_FILE" "$DEBIAN_DIR/postrm"
install -m 0644 "$SERVICE_FILE" "$SYSTEMD_DIR/openclaw-gateway.service"

echo "Copying openclaw.mjs..."
cp -a "$ROOT_DIR/openclaw.mjs" "$APP_DIR/"
echo "Copying package.json..."
cp -a "$ROOT_DIR/package.json" "$APP_DIR/"
echo "Copying dist/..."
copy_dir "$ROOT_DIR/dist" "$APP_DIR/"
echo "Copying node_modules/..."
copy_dir "$ROOT_DIR/node_modules" "$APP_DIR/"
if [[ -d "$ROOT_DIR/assets" ]]; then
  echo "Copying assets/..."
  copy_dir "$ROOT_DIR/assets" "$APP_DIR/"
fi
if [[ -d "$ROOT_DIR/skills" ]]; then
  echo "Copying skills/..."
  copy_dir "$ROOT_DIR/skills" "$APP_DIR/"
fi

install -m 0755 "$BOOTSTRAP_FILE" "$BOOTSTRAP_DIR/ubuntu-22.04.sh"
install -m 0755 "$WRAPPER_FILE" "$BIN_DIR/openclaw"

mkdir -p "$OUT_DIR"
OUTPUT="$OUT_DIR/openclaw_${VERSION}_${ARCH}.deb"

dpkg-deb --build "$PKG_ROOT" "$OUTPUT" >/dev/null

echo "Built: $OUTPUT"
