#!/bin/bash

# Configuration 
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_ROOT/backend/logs"
ARCHIVE_DIR="$LOG_DIR/archive"
LOG_FILE="$LOG_DIR/log_cleaner.log"
DATE=$(date +'%Y-%m-%d_%H-%M-%S')
CRON_JOB="0 1 * * * bash $PROJECT_ROOT/scripts/log_cleaner.sh"

# Ensure necessary directories and log file exist
mkdir -p "$ARCHIVE_DIR"
touch "$LOG_FILE"

# LOG CLEANING START 
echo "[$DATE]  Log cleaning started" >> "$LOG_FILE"

# Archive and remove logs older than 7 days
find "$LOG_DIR" -maxdepth 1 -type f -name "*.log" -mtime +7 | while read -r logfile; do
    filename=$(basename "$logfile" .log)
    archive_name="${filename}_${DATE}.tar.gz"

    echo "[$DATE]  Archiving $filename.log" >> "$LOG_FILE"
    tar -czf "$ARCHIVE_DIR/$archive_name" -C "$LOG_DIR" "$filename.log"

    if [ $? -eq 0 ]; then
        rm -f "$logfile"
        echo "[$DATE]  Removed $filename.log" >> "$LOG_FILE"
    else
        echo "[$DATE]  Failed to archive $filename.log" >> "$LOG_FILE"
    fi
done

# Delete archived files older than 30 days
find "$ARCHIVE_DIR" -type f -name "*.tar.gz" -mtime +30 -exec rm -f {} \;
echo "[$DATE] 🧹 Old archive cleanup complete" >> "$LOG_FILE"

# CRON JOB SETUP
# NOTE: Crontab does not work on Windows. Commented out for compatibility.
#if crontab -l 2>/dev/null | grep -qF "$CRON_JOB"; then
#   echo "[$DATE]  Cron job already exists" >> "$LOG_FILE"
#else
#    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
#   echo "[$DATE]  Cron job added to run daily at 1 AM" >> "$LOG_FILE"
#fi

# END 
echo "[$DATE]  Log cleaning completed" >> "$LOG_FILE"
exit 0
