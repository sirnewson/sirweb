#!/usr/bin/env bash
# Re-encode every site clip to web scale.
#   H.264, max 1280px wide, CRF 30, audio dropped (every player on the site is muted),
#   faststart so playback begins before the file finishes downloading.
# Originals are moved aside to _originals/ rather than deleted.
set -uo pipefail

FF="$LOCALAPPDATA/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin/ffmpeg.exe"
DIR="public/uploads/motion and video"
BACKUP="$DIR/_originals"
mkdir -p "$BACKUP"

before=0
after=0
count=0
failed=0

while IFS= read -r -d '' f; do
    name=$(basename "$f")
    [ -f "$BACKUP/$name" ] && continue          # already processed
    sz=$(stat -c '%s' "$f")
    tmp="$DIR/.tmp_$name"

    # One clip hung indefinitely and stalled the whole run, so each encode is
    # capped and stdin is detached — ffmpeg can never sit waiting for input.
    if timeout 420 "$FF" -nostdin -y -loglevel error -i "$f" \
        -vf "scale='min(1280,iw)':-2" \
        -c:v libx264 -crf 30 -preset veryfast -pix_fmt yuv420p \
        -movflags +faststart -an "$tmp" 2>/dev/null; then
        nsz=$(stat -c '%s' "$tmp")
        # Keep the re-encode only when it is actually smaller.
        if [ "$nsz" -lt "$sz" ]; then
            mv "$f" "$BACKUP/$name"
            mv "$tmp" "$f"
            before=$((before + sz))
            after=$((after + nsz))
            count=$((count + 1))
            printf '%-52s %6.1fMB -> %5.1fMB\n' "${name:0:52}" "$(echo "$sz/1048576" | bc -l)" "$(echo "$nsz/1048576" | bc -l)"
        else
            rm -f "$tmp"
        fi
    else
        rm -f "$tmp"
        failed=$((failed + 1))
        echo "SKIPPED (timeout/error): $name"
    fi
done < <(find "$DIR" -maxdepth 1 -iname '*.mp4' -print0)

echo
printf 'compressed %d clips, %d failed\n' "$count" "$failed"
printf 'before: %.0f MB   after: %.0f MB   saved: %.0f MB\n' \
    "$(echo "$before/1048576" | bc -l)" \
    "$(echo "$after/1048576" | bc -l)" \
    "$(echo "($before-$after)/1048576" | bc -l)"
