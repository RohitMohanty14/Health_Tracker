#WARNING
#Run this script only once 

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CRON_JOB="0 19 * * * $PROJECT_ROOT/scripts/backup.sh"

if crontab -l 2>/dev/null | grep -qF "$CRON_JOB"; then
  echo "Cron job already exists."
else
  (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
  echo "Cron job added."
fi