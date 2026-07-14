---
title: Ramble
description: Dump messy thoughts by voice or text and let AI turn them into ready-to-save transactions.
---

**Ramble** lets you record expenses the way you'd tell them to a friend. Speak or type a messy, unstructured "brain dump" — one expense or ten — and an LLM turns it into clean transaction drafts you can review, tweak and save in bulk.

```
this morning coffee 3.5 and croissant 2, yesterday fuel 60 at OMV,
got my 2400 salary, sent mom 100 for her birthday
```

One tap later, that becomes four expense drafts and one deposit — each with its own amount, description, date, account, category and tags matched against **your** data.

## What it can do

- **Multiple transactions from one text** — Ramble splits your rant into individual transactions, understanding amounts, currencies, relative dates ("yesterday", "last Friday") in your own timezone and language.
- **Smart matching against your data** — accounts, categories and tags are resolved against the ones you actually have in Firefly, using fuzzy matching.
- **Voice input, two ways** — dictate directly in the app with the microphone button, or send audio recordings to the API and let the server transcribe them.
- **Save now, process later** — rambles POSTed to the API (e.g. from a Siri Shortcut while you're paying for groceries) pile up on the server. A badge on the Ramble button shows how many are waiting. Load them whenever you have a minute, interpret them all at once, and they're cleaned up automatically after the transactions are created.
- **Review before anything is saved** — every draft can be edited in a popup or deleted. Creation runs with a progress bar, and failed items can be retried individually. Nothing touches Firefly until you press *Create*.
- **Playback** — rambles that carry a voice recording get a play button, so you can hear what you actually mumbled at 2 AM.

## How it works

1. You provide text — typed, dictated, or transcribed from an uploaded recording.
2. Pico's backend forwards it (plus context about your accounts, categories, tags, currency, timezone and language) to the LLM endpoint **you** configured.
3. The LLM answers with structured transactions, which Pico resolves against your Firefly data and shows as editable drafts.
4. You press **Create** and Pico saves them to Firefly one by one.

::note
Your financial data is only ever sent to the LLM endpoint you configure. Point it at a self-hosted model (Ollama, llama.cpp, LiteLLM, …) and nothing leaves your network.
::

## Configuration

Ramble is configured on the **backend** through environment variables — all of them are **optional**. If nothing is set, the Ramble button simply doesn't appear and Pico behaves exactly as before.

### LLM interpretation

Any **OpenAI-compatible** `/chat/completions` API works: OpenAI, OpenRouter, Mistral, Groq, or a self-hosted Ollama / LiteLLM / llama.cpp server.

| Variable | Default | Description                                                                                                                                   |
| --- | --- |-----------------------------------------------------------------------------------------------------------------------------------------------|
| `ASSISTANT_LLM_ENDPOINT` | `https://api.openai.com/v1/chat/completions` | Full URL of an OpenAI-compatible chat completions endpoint.                                                                                   |
| `ASSISTANT_LLM_MODEL` | `gpt-4o-mini` | Model name to request.                                                                                                                        |
| `ASSISTANT_LLM_API_KEY` | — | API key, sent as a `Bearer` token. Leave empty for local servers without auth.                                                                |
| `ASSISTANT_LLM_CONTEXT` | — | Extra instructions appended to the system prompt for every interpretation (e.g. `"I want my description field to be returned in Romanian."`). |

The feature counts as **configured** as soon as *either* an endpoint *or* an API key is set:

- **OpenAI**: set only `ASSISTANT_LLM_API_KEY` — endpoint and model defaults do the rest.
- **Self-hosted**: set only `ASSISTANT_LLM_ENDPOINT` (and usually `ASSISTANT_LLM_MODEL`) — no key required.

### Voice transcription

Only needed if you want to send **audio recordings** to the API. In-app dictation uses your device's speech recognition, and plain-text rambles never touch this service. The endpoint must be OpenAI-compatible (`/audio/transcriptions`) — so a self-hosted Whisper server (e.g. Speaches, faster-whisper-server) works too.

| Variable | Default | Description |
| --- | --- | --- |
| `ASSISTANT_TRANSCRIPTION_ENDPOINT` | `https://api.openai.com/v1/audio/transcriptions` | Full URL of an OpenAI-compatible audio transcription endpoint. |
| `ASSISTANT_TRANSCRIPTION_MODEL` | `gpt-4o-mini-transcribe` | Transcription model to request. |
| `ASSISTANT_TRANSCRIPTION_API_KEY` | — | API key, sent as a `Bearer` token. |

Recordings are transcribed in a background job right after upload (or on the first load of your rambles as a fallback), and the transcribed text is appended to the ramble.

### Docker compose example

```yaml
services:
  firefly-pico:
    image: cioraneanu/firefly-pico:latest
    environment:
      - FIREFLY_URL=https://firefly.domain.com
      # ... your existing config ...

      # Optional: AI assistant "Ramble" (any OpenAI compatible API)
      - ASSISTANT_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
      - ASSISTANT_LLM_MODEL=gpt-4o-mini
      - ASSISTANT_LLM_API_KEY=your-api-key
      # - ASSISTANT_LLM_CONTEXT=I want my description field to be returned in Romanian.

      # Optional: voice transcription for audio rambles
      - ASSISTANT_TRANSCRIPTION_ENDPOINT=https://api.openai.com/v1/audio/transcriptions
      - ASSISTANT_TRANSCRIPTION_MODEL=gpt-4o-mini-transcribe
      - ASSISTANT_TRANSCRIPTION_API_KEY=your-api-key
```

### Checking your setup

Head to **Settings → Assistant** in the app. It shows the status of both services (with the resolved endpoint and model) and has **test buttons** that fire a tiny request at each service, so you can verify your keys and URLs without guessing. The same page also holds a per-user **LLM context** field that complements the global `ASSISTANT_LLM_CONTEXT`.

## The API endpoint

Saved rambles are created through a deliberately simple endpoint, so any automation tool can talk to it:

```
POST {PICO_URL}/api/assistant/rambles
Authorization: Bearer <your Firefly III personal access token>
```

It accepts:

- **Plain text** — send the body as `Content-Type: text/plain`, or a form field named `text`.
- **Audio** — a `multipart/form-data` upload with a file field named `voice`. Accepted formats: `mp3`, `mpga`, `wav`, `m4a`, `mp4`, `aac`, `ogg`, `oga`, `opus`, `webm`, `flac` — max 25 MB.
- **Both** — a single request may include `text` *and* `voice`; the transcription gets appended to the text.

::tip
This endpoint makes iOS Shortcuts a perfect companion — see [Ramble iOS](/features/ramble/ios) for two ready-made Siri Shortcut recipes.
::
