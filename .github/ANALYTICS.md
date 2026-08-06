# Cobblemon Realms Wiki Analytics

The wiki uses Cloudflare Analytics Engine for minimal, aggregated usage statistics.

## Privacy model

The analytics endpoint does not intentionally collect or store:

- IP addresses
- cookies
- user accounts
- user-agent strings
- referrer URLs
- raw search queries
- screen size or device fingerprinting data

The client does not send analytics when Global Privacy Control or Do Not Track is enabled.

## Dataset

Dataset name:

```text
cobblemon_realms_wiki
```

Stored fields:

| Field | Meaning |
| --- | --- |
| `blob1` | Event type: `pageview`, `not_found`, `search_zero`, or `outbound` |
| `blob2` | Internal wiki path |
| `blob3` | Broad category or external destination |
| `blob4` | Wiki language: `en` or `fr` |
| `double1` | Event count, always `1` |
| `index1` | Event type used as the sampling index |

## Cloudflare requirements

Create an API token with **Account Analytics: Read** permission. Keep the account ID and API token outside the repository.

Query endpoint:

```text
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/analytics_engine/sql
```

## Top pages over the last 30 days

```sql
SELECT
  blob2 AS path,
  blob4 AS language,
  SUM(_sample_interval * double1) AS views
FROM cobblemon_realms_wiki
WHERE blob1 = 'pageview'
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY path, language
ORDER BY views DESC
LIMIT 50
```

## Most frequent 404 paths

```sql
SELECT
  blob2 AS path,
  SUM(_sample_interval * double1) AS errors
FROM cobblemon_realms_wiki
WHERE blob1 = 'not_found'
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY path
ORDER BY errors DESC
LIMIT 50
```

## Search categories without results

Raw search text is never stored. Only a broad category is recorded.

```sql
SELECT
  blob3 AS category,
  blob4 AS language,
  SUM(_sample_interval * double1) AS searches
FROM cobblemon_realms_wiki
WHERE blob1 = 'search_zero'
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY category, language
ORDER BY searches DESC
```

## External destinations

```sql
SELECT
  blob3 AS destination,
  SUM(_sample_interval * double1) AS clicks
FROM cobblemon_realms_wiki
WHERE blob1 = 'outbound'
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY destination
ORDER BY clicks DESC
```

## Daily traffic

```sql
SELECT
  DATE_TRUNC('day', timestamp) AS day,
  SUM(_sample_interval * double1) AS views
FROM cobblemon_realms_wiki
WHERE blob1 = 'pageview'
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY day
ORDER BY day ASC
```
