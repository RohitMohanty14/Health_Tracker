SELECT 
    g.user_id,
    g.start_date,
    g.end_date,
    
    ROUND(AVG(h.steps), 2) AS actual_steps,
    g.target_steps,
    
    ROUND(AVG(h.calories), 2) AS actual_calories,
    g.target_calories,
    
    ROUND(AVG(h.sleep_hours), 2) AS actual_sleep,
    g.target_sleep_hours

FROM goals g
JOIN health_logs h ON g.user_id = h.user_id
WHERE h.log_date BETWEEN g.start_date AND g.end_date

GROUP BY g.user_id, g.start_date, g.end_date,
         g.target_steps, g.target_calories, g.target_sleep_hours;
