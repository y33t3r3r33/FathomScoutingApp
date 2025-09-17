CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL,
    name VARCHAR(100)
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    event_key VARCHAR(50),
    match_key VARCHAR(50),
    team_id INT REFERENCES teams(id),
    score INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);