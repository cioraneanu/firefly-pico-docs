# Installation

## Docker (Recommended)

If you already have **Firefly III** installed the fastest way to get started with **Firefly-Pico** is via docker-compose.

```yaml
version: '3.3'
services:
  firefly-pico:
    image: cioraneanu/firefly-pico:latest
    ports:
      - "6976:80"
    environment:
      - FIREFLY_URL=https://firefly.domain.com
    volumes:
      - /path/firefly-pico-data:/var/www/html/database/data
    restart: unless-stopped
```

<note>

Make sure the environment variable <u>

FIREFLY_URL

</u>

 points to your **Firefly III** instance. This can be either IP + Port (ex. `http://192.168.1.99:8080`) or subdomain (ex. `https://firefly.domain.com`) if you use a reverse proxy like Nginx Proxy Manager.
<br />



- Set the volume to a persistent folder for the SQLite database.

</note>

- Make sure the environment variable **FIREFLY_URL** points to your **Firefly III** instance. This can be either IP + Port (ex. `http://192.168.1.99:8080`) or subdomain (ex. `https://firefly.domain.com`) if you use a reverse proxy like Nginx Proxy Manager.
- Set the volume to a persistent folder for the SQLite database.

### Other variants:

If you prefer PostgreSQL over SQLite for Pico's own database:

- [Pico + PostgreSQL](https://github.com/cioraneanu/firefly-pico/blob/main/docker-compose.pico.yml)

If you don't yet have **Firefly III** installed and want both inside a single Docker-compose file:

- [Pico + Firefly](https://github.com/cioraneanu/firefly-pico/blob/main/docker-compose.pico+firefly.yml)
- [Pico + Firefly + Importer](https://github.com/cioraneanu/firefly-pico/blob/main/docker-compose.pico+firefly+importer.yml)
  - Update `FIREFLY_URL` / `APP_URL` / `FIREFLY_III_URL` accordingly.
  - Change `DB_PASSWORD` and `POSTGRES_PASSWORD` to something secure. **Make sure they match!**

Further information on how to setup and configure **Firefly III** can be found on their officials docs: [HERE](https://docs.firefly-iii.org/how-to/firefly-iii/installation/docker/)

### Environment Variables

<table>
<thead>
  <tr>
    <th>
      Name
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
        NUXT_PUBLIC_QUERY_TIMEOUT
      </code>
    </td>
    
    <td>
      Milliseconds Pico should wait before a request times out. (Default: 8000)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        TZ
      </code>
    </td>
    
    <td>
      Pico backend Timezone (ex. <code>
        Europe/London
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        APP_KEY
      </code>
    </td>
    
    <td>
      Encrypts the assistant API keys users save in Pico. Must be 32 characters (or <code>
        base64:
      </code>
      
       + 32 bytes). If unset, one is generated on the first start and kept in the data volume.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        NGINX_PORT
      </code>
    </td>
    
    <td>
      Internal port of the container. (Default: 80) Set it to <code>
        8080
      </code>
      
       and map <code>
        6976:8080
      </code>
      
       on hosts that don't allow binding port 80 (ex. Synology Container Manager).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        CUSTOM_ICONS_PATH
      </code>
    </td>
    
    <td>
      Folder for your own <a href="/features/custom-icons">
        custom icons
      </a>
      
      . (Default: <code>
        storage/app/custom-icons
      </code>
      
      )
    </td>
  </tr>
</tbody>
</table>

### Optional Environment Variables

These power the AI features of [Ramble](/ramble) for all users of the instance. Leave them unset and Pico works exactly as before; each user can still add their own LLM connection in `Settings -> Assistant`.

<table>
<thead>
  <tr>
    <th>
      Name
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
        ASSISTANT_LLM_ENDPOINT
      </code>
    </td>
    
    <td>
      OpenAI-compatible chat completions endpoint used by <a href="/ramble">
        Ramble
      </a>
      
      . (Default: <code>
        https://api.openai.com/v1/chat/completions
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_LLM_MODEL
      </code>
    </td>
    
    <td>
      LLM model name. (Default: <code>
        gpt-4o-mini
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_LLM_API_KEY
      </code>
    </td>
    
    <td>
      API key for the LLM endpoint.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_LLM_CONTEXT
      </code>
    </td>
    
    <td>
      Extra instructions appended to every Ramble interpretation.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_TRANSCRIPTION_ENDPOINT
      </code>
    </td>
    
    <td>
      OpenAI-compatible audio transcription endpoint for voice rambles. (Default: <code>
        https://api.openai.com/v1/audio/transcriptions
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_TRANSCRIPTION_MODEL
      </code>
    </td>
    
    <td>
      Transcription model name. (Default: <code>
        gpt-4o-mini-transcribe
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_TRANSCRIPTION_API_KEY
      </code>
    </td>
    
    <td>
      API key for the transcription endpoint.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_TRANSCRIPTION_LANGUAGE
      </code>
    </td>
    
    <td>
      Optional language hint for transcription (ex. <code>
        en
      </code>
      
      , <code>
        ro
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ASSISTANT_ALLOW_PRIVATE_ENDPOINTS
      </code>
    </td>
    
    <td>
      Set to <code>
        true
      </code>
      
       to let users point their own connections at hosts on your local network (ex. Ollama). (Default: <code>
        false
      </code>
      
      )
    </td>
  </tr>
</tbody>
</table>

### Docker image flavors

- `:latest` - Stable, less frequent updates
- `:dev` - Latest features, more updates, still stable.

---

## Post-install Configuration

1. **Generate Firefly III Auth Token:** Open up **Firefly III** and finish the onboarding process if this is your first usage. **** Go to `Options` -> `Profile` -> `OAuth` -> `Create New Personal Access Token`.
2. **Connect Pico:** Open **Firefly-Pico**, **** go to `Settings` -> `Setup` (on desktop `Settings` -> `Connection & data`), paste the token in `Personal access token` and use `Test connection` to check it.

<note>

In most scenarios you don't need to change the <u>

Pico Backend URL

</u>

 field!!! This is helpful only if deploy the **Firefly-Pico** backend somewhere separate from the frontend.

</note>

<tip>

Just want to look around first? Use `Try with sample data` on the same page. **Demo mode** runs entirely on your device with sample data, no server needed. `Exit demo mode` deletes the sample data and resets the app.

</tip>
