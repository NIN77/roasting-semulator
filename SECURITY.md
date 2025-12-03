# Security & Privacy

## Data Storage
- **FID**: Used to index history.
- **Cast Text**: Sent to Google AI for processing. Not stored permanently unless "Saved" by user.
- **Roasts**: Stored in Redis for "History" feature.

## Retention
- Roasts are TTL (Time To Live) set to 90 days.
- Leaderboards are aggregated; raw data flushed monthly.

## Opt-Out
Users can DELETE their data by hitting `/api/optout` with a signed frame packet verifying their FID.

## AI Safety
- Input is sanitized for PII (Regex).
- Prompt injection protection via strict instruction sets.
- Output validated for toxic language before display.
