# Install and configure

> Enable Ramble and optionally add server-side audio transcription.

Ramble needs a language model. The admin can configure one on the server for every user (steps 1 and 2), and each user can also bring their own connection from inside Pico (step 3).

## 1. Configure transaction interpretation

Ramble needs an OpenAI-compatible `/chat/completions` endpoint. This can be a hosted provider or a self-hosted service such as Ollama, LiteLLM, or llama.cpp.

<table>
<thead>
  <tr>
    <th>
      Variable
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Purpose
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ASSISTANT_LLM_ENDPOINT
      </code>
    </td>
    
    <td>
      <code>
        https://api.openai.com/v1/chat/completions
      </code>
    </td>
    
    <td>
      Full chat completions URL.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_LLM_MODEL
      </code>
    </td>
    
    <td>
      <code>
        gpt-4o-mini
      </code>
    </td>
    
    <td>
      Model sent with each request.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_LLM_API_KEY
      </code>
    </td>
    
    <td>
      None
    </td>
    
    <td>
      API key sent as a Bearer token. It may be empty for a local service without authentication.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_LLM_CONTEXT
      </code>
    </td>
    
    <td>
      None
    </td>
    
    <td>
      Optional instructions added to every request, such as a preferred language for descriptions.
    </td>
  </tr>
</tbody>
</table>

Ramble is enabled when either `ASSISTANT_LLM_ENDPOINT` or `ASSISTANT_LLM_API_KEY` is set.

- With OpenAI, setting only `ASSISTANT_LLM_API_KEY` uses the default endpoint and model.
- With a self-hosted service, set `ASSISTANT_LLM_ENDPOINT` and usually `ASSISTANT_LLM_MODEL`. A key is optional if your service does not require one.

## 2. Configure audio transcription (optional)

You only need this service when clients upload audio to the [Ramble API](/ramble/api#mode-2-audio). Typing and device dictation work without it.

The service must provide an OpenAI-compatible `/audio/transcriptions` endpoint.

<table>
<thead>
  <tr>
    <th>
      Variable
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Purpose
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ASSISTANT_TRANSCRIPTION_ENDPOINT
      </code>
    </td>
    
    <td>
      <code>
        https://api.openai.com/v1/audio/transcriptions
      </code>
    </td>
    
    <td>
      Full audio transcription URL.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_TRANSCRIPTION_MODEL
      </code>
    </td>
    
    <td>
      <code>
        gpt-4o-mini-transcribe
      </code>
    </td>
    
    <td>
      Transcription model sent with each request.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_TRANSCRIPTION_API_KEY
      </code>
    </td>
    
    <td>
      None
    </td>
    
    <td>
      API key sent as a Bearer token.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_TRANSCRIPTION_LANGUAGE
      </code>
    </td>
    
    <td>
      None
    </td>
    
    <td>
      Optional language hint, such as <code>
        en
      </code>
      
       or <code>
        ro
      </code>
      
      . This improves short recordings that are difficult to identify automatically.
    </td>
  </tr>
</tbody>
</table>

The transcription service is enabled when either its endpoint or API key is set. Uploaded recordings are transcribed after the upload response; Pico retries pending transcription when saved rambles are loaded.

## Docker Compose example

Add the variables under the existing Pico service:

```yaml
services:
  firefly-pico:
    image: cioraneanu/firefly-pico:latest
    environment:
      - FIREFLY_URL=https://firefly.example.com

      - ASSISTANT_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
      - ASSISTANT_LLM_MODEL=gpt-4o-mini
      - ASSISTANT_LLM_API_KEY=your-api-key
      # - ASSISTANT_LLM_CONTEXT=Return descriptions in Romanian.

      # Optional: required only for uploaded audio
      - ASSISTANT_TRANSCRIPTION_ENDPOINT=https://api.openai.com/v1/audio/transcriptions
      - ASSISTANT_TRANSCRIPTION_MODEL=gpt-4o-mini-transcribe
      - ASSISTANT_TRANSCRIPTION_API_KEY=your-api-key
      # - ASSISTANT_TRANSCRIPTION_LANGUAGE=ro
```

Restart the Pico container after changing its environment.

## 3. Use your own connection (optional)

Every user can override the server configuration for their own account in **Settings → Assistant**. Both the **Assistant LLM** and the **Voice transcription** cards have a **Configuration** switch:

- **Server**: uses the Docker environment variables above.
- **My own**: uses your own **Endpoint**, **API key** and **Model**. They are used together, so the server's settings are ignored while **My own** is selected.

API keys are stored encrypted on the server (with Pico's [`APP_KEY`](/installation/docker#environment-variables)) and are never shown again after saving.

<note>

By default your own endpoint can't point to a host on your local network. To allow it (ex. a self-hosted Ollama) the admin must set `ASSISTANT_ALLOW_PRIVATE_ENDPOINTS=true`.

</note>

## 4. Verify the setup

In Pico, open **Settings → Assistant**.

1. Select **Test LLM configuration**.
2. If you configured audio transcription, select **Test transcription configuration** too.
3. Optionally add **Additional LLM context**. It is added to every request, together with the server-wide `ASSISTANT_LLM_CONTEXT`.
4. Optionally set **Recent transactions** (Off, 25, 50 or 100). Pico then sends your last unique descriptions with their accounts, category and tags to help the model match how you usually record them. Amounts are never sent.
5. Use **Try it out** to run a sample text and see the resulting transactions, the exact prompt and the raw response. Nothing is saved to Firefly.

When the language model test succeeds, open Ramble (the microphone next to the assistant field on mobile, or in the sidebar on desktop) and try a short message.

<warning>

Keep API keys in Pico's server environment or in **Settings → Assistant**. Do not place them in an iOS Shortcut or another client.

</warning>
