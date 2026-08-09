#!/bin/bash
# Keeps the local app available after a transient macOS/Node/Python failure.
# It only restarts a service after three consecutive failed checks, so a
# slower render or transcription is never mistaken for an outage.
set -u

ROOT="/Users/dannmacbook/gerador-legendas-e-cortes"
LOG="$ROOT/logs/healthcheck.log"
STATE="/tmp/legendas-locais-health-failures"
UID_VALUE="$(id -u)"

mkdir -p "$ROOT/logs"

backend_ok=0
frontend_ok=0
curl -fsS --max-time 5 http://127.0.0.1:8000/api/health >/dev/null && backend_ok=1
curl -fsSI --max-time 5 http://127.0.0.1:3000/ >/dev/null && frontend_ok=1

if [[ "$backend_ok" = "1" && "$frontend_ok" = "1" ]]; then
  rm -f "$STATE"
  exit 0
fi

failures=0
if [[ -f "$STATE" ]]; then
  failures="$(cat "$STATE" 2>/dev/null || echo 0)"
fi
case "$failures" in
  ''|*[!0-9]*) failures=0 ;;
esac
failures=$((failures + 1))
printf '%s' "$failures" > "$STATE"

if [[ "$failures" -lt 3 ]]; then
  exit 0
fi

printf '%s Recuperando serviços (backend=%s frontend=%s)\n' \
  "$(date '+%Y-%m-%d %H:%M:%S')" "$backend_ok" "$frontend_ok" >> "$LOG"

if [[ "$backend_ok" = "0" ]]; then
  launchctl kickstart -k "gui/$UID_VALUE/com.legendas.backend" >> "$LOG" 2>&1 || true
fi
if [[ "$frontend_ok" = "0" ]]; then
  launchctl kickstart -k "gui/$UID_VALUE/com.legendas.frontend" >> "$LOG" 2>&1 || true
fi

printf '0' > "$STATE"
