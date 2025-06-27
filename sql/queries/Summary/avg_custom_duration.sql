SELECT
    user_id,
    :days_back AS days,
    ROUND(AVG(steps), 2) AS avg_steps,
    ROUND(AVG(calories), 2) AS avg_calories,
    ROUND(AVG(sleep_hours), 2) AS avg_sleep
FROM health_logs
WHERE log_date >= SYSDATE - :days_back
GROUP BY user_id;
