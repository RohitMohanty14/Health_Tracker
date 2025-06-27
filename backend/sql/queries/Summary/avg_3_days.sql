SELECT
    user_id,
    ROUND(AVG(steps), 2),
    ROUND(AVG(calories), 2),
    ROUND(AVG(sleep_hours), 2)
FROM health_logs
WHERE log_date >= SYSDATE - 3
GROUP BY user_id;
