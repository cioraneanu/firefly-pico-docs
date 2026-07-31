# Ramble API

> Save text or audio rambles from automations and other devices.

The Ramble API lets another app save a message in Pico. It is useful when you want to capture a transaction immediately and review it later.

```http
POST {PICO_URL}/api/assistant/rambles
Authorization: Bearer <FIREFLY_PERSONAL_ACCESS_TOKEN>
```

Use the URL of your Pico instance for `{PICO_URL}`. Authentication uses your Firefly III personal access token, just like Pico itself.

The endpoint has two main modes.

## Mode 1: text

Use text mode when the client already has typed or dictated text. It only requires the Ramble language model to be [configured](/ramble/configuration#_1-configure-transaction-interpretation).

Send a plain-text body:

```bash
curl --request POST \
  --url "{PICO_URL}/api/assistant/rambles" \
  --header "Authorization: Bearer {FIREFLY_TOKEN}" \
  --header "Content-Type: text/plain" \
  --data "Coffee this morning 4.50"
```

You can also send `text` as a JSON or form field:

```json
{
  "text": "Coffee this morning 4.50"
}
```

## Mode 2: audio

Use audio mode to upload the recording itself. Pico stores it and uses the server-side transcription service before interpretation. [Audio transcription must be configured](/ramble/configuration#_2-configure-audio-transcription-optional).

Send a `multipart/form-data` request with:

<table>
<thead>
  <tr>
    <th>
      Field
    </th>
    
    <th>
      Required
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        voice
      </code>
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      Audio file, up to 25 MB.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        language
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Language hint such as <code>
        en
      </code>
      
      , <code>
        de
      </code>
      
      , or <code>
        ro
      </code>
      
      . It overrides the server default for this recording.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        text
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Extra text to keep alongside the transcription.
    </td>
  </tr>
</tbody>
</table>

```bash
curl --request POST \
  --url "{PICO_URL}/api/assistant/rambles" \
  --header "Authorization: Bearer {FIREFLY_TOKEN}" \
  --form "voice=@recording.m4a" \
  --form "language=en"
```

Accepted file extensions are `mp3`, `mpga`, `wav`, `m4a`, `mp4`, `aac`, `ogg`, `oga`, `opus`, `webm`, and `flac`.

### Sending text and audio together

A multipart request may include both `text` and `voice`. Pico keeps the supplied text and appends the audio transcription to it.

## Response

A successful request returns the saved ramble:

```json
{
  "data": {
    "id": 42,
    "text": "Coffee this morning 4.50",
    "has_voice": false
  }
}
```

The endpoint saves a ramble; it does not immediately create or interpret a transaction. Open Ramble in Pico, select **Load saved**, then review and create the resulting drafts.
