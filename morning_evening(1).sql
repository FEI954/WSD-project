CREATE TABLE mornings (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sleepDuration DECIMAL NOT NULL,
  sleepQuality INTEGER NOT NULL,
  genericMood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);


CREATE TABLE evenings (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sportTime DECIMAL NOT NULL,
  studyTime DECIMAL NOT NULL,
  eatingQuality INTEGER NOT NULL,
  genericMood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  verification TEXT NOT NULL,
);

SELECT 
AVG(exercise_duration) AS exercise_duration_average,
AVG(study_duration) AS study_duration_average,
AVG(general_mood) AS general_mood_average
FROM 
evening_report
WHERE
report_date >= '2020-12-01'
AND
report_date <= '2020-12-05'
GROUP BY
user_id

deno run --allow-read --allow-net --allow-env --unstable app.js
