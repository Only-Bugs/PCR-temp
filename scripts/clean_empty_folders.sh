#!/bin/zsh

# Root directory: Verde folder (relative to where you run the script)
ROOT_DIR="."

echo "🔍 Scanning for empty folders under: $ROOT_DIR"
echo

# Find empty directories excluding hidden ones
empty_dirs=($(find "$ROOT_DIR" -type d -empty ! -path "*/.*"))

if [[ ${#empty_dirs[@]} -eq 0 ]]; then
  echo "✅ No empty folders found."
  exit 0
fi

echo "⚠️ Found ${#empty_dirs[@]} empty folders:"
for dir in "${empty_dirs[@]}"; do
  echo " - $dir"
done

echo
read "confirm?Do you want to delete these folders? (y/n): "

if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
  count=0
  for dir in "${empty_dirs[@]}"; do
    # Double-check it's not hidden before deleting
    if [[ "$(basename "$dir")" != .* ]]; then
      rmdir "$dir" 2>/dev/null && ((count++))
    fi
  done
  echo "🗑️ Deleted $count empty folder(s)."
else
  echo "❌ No folders deleted."
fi
