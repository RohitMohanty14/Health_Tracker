#!/bin/bash


# Set your Desktop path manually
USER_DESKTOP="/c/Users/JAHNAVI/Desktop"

# Define paths
LOG_DIR="$USER_DESKTOP/Health_Tracker/logfiles"
ARCHIVE_DIR="$LOG_DIR/archive"
LOG_FILE="$LOG_DIR/log_cleaner.log"
DATE=$(date +'%Y-%m-%d_%H-%M-%S')

# Create folders if they don't exist
mkdir -p "$ARCHIVE_DIR"
touch "$LOG_FILE"

# Archive and remove logs older than 7 days
find "$LOG_DIR" -maxdepth 1 -type f -name "*.log" -mtime +7 | while read -r logfile; do
    filename=$(basename "$logfile" .log)
    archive_name="${filename}_${DATE}.tar.gz"

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Archiving: $filename.log → $archive_name" >> "$LOG_FILE"
    tar -czf "$ARCHIVE_DIR/$archive_name" -C "$LOG_DIR" "$filename.log"

    if [ $? -eq 0 ]; then
        rm -f "$logfile"
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Removed original: $filename.log" >> "$LOG_FILE"
    else
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ Failed to archive: $filename.log" >> "$LOG_FILE"
    fi
done

# Clean up archive files older than 30 days
find "$ARCHIVE_DIR" -type f -name "*.tar.gz" -mtime +30 -exec rm -f {} \; >> "$LOG_FILE"

echo "[$(date '+%Y-%m-%d %H:%M:%S')]  Log cleanup completed" >> "$LOG_FILE"
exit 0
