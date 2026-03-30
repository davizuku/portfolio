INSERT INTO prompts (name, content) VALUES
('task', $prompt$
General instructions for the system prompt
$prompt$),

('bio', $prompt$
# Bio

<A short description of your profile>
$prompt$),

('experience', $prompt$
# Experience
## <First Position>
### Metadata
- Company: <company>
- From date: <month year>
- To date: <month year>
- Duration: <duration>
- Location: <city, state/province, country>
- LocationType: <On Site | Hybrid | Remote>
- ScheduleType: <Project | Part-time | Full-time>

### Description
<Description of the responsibilities, and tasks. Be result-oriented>

### Skills
- <First skill>
- <Second skill>
...

## <Second Position>
...

$prompt$),


('projects', $prompt$
# Projects
## <Project Title>
### Metadata
- From date: <month year>
- To date: <month year>
- Duration: <duration>
- Company: <Company name | "Personal project">

### Description
<Goal & Background>

#### Results
<List of results>

### Skills
- <First skill>
- <Second skill>
...

$prompt$),

('certifications', $prompt$
# Certifications
## <Certification name>
### Metadata
- Date: <month year>
- ID: <credential id>
- Company: <Company>
- URL: <url>

### Skills
- <First skill>
- <Second skill>
...

$prompt$),


('recommendations', $prompt$
# Recommendations
## <Name of the recommender>
### Metadata
- From: <Recommender''s name>
- Position: <Recommender''s position>
- Date: <Recommendation date>
- Relationship: <Manager, reporter, indirect, etc.>
### Recommendation

<text of the recommendation>

$prompt$);
