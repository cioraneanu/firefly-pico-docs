# Ramble

> Turn a few spoken or written words into complete transaction drafts.

Ramble is the fastest way to record one or more transactions when you do not want to fill in a form. Tell Pico what happened in your own words, then let it identify the transactions for you.

For example:

```text
I got coffee and a croissant this morning, 5.50. Fuel yesterday at OMV, 60.
My salary came in today, 2,400.
```

Ramble turns that message into separate transaction drafts. It can fill in amounts, dates, descriptions, transaction types, accounts, categories, and tags by using the data already in your Firefly III account.

Nothing is saved immediately. You can review, edit, or remove every draft before creating the transactions.

## Choose how you want to use it

- **Inside Pico:** open Ramble, type or dictate a message, select **Interpret**, review the result, and create the transactions.
- **Capture now, review later:** send text or an audio recording to the Ramble API from an automation such as an iOS Shortcut. Pico keeps it until you are ready to review it.

## How Ramble handles your message

1. Pico sends your message and relevant Firefly III context to the language model you configured.
2. The model interprets the transactions matching it to your setup(accounts,tags, categories etc)
3. You review the drafts and choose which transactions to create.

<note>

Ramble sends financial context to the language model endpoint you configure. You can use a hosted provider or an OpenAI-compatible service on your own network.

</note>

<note>

Always review the drafts. A language model can misunderstand an amount, date, account, or transaction type.

</note>

## Showcase:

<table>
<tbody>
  <tr>
    <td width="50%">
      1. Configure the iPhone <b>
        Action Button
      </b>
      
       to start the <code>
        docs/siri-shortcuts/pico-text-template-signed.shortcut
      </code>
      
       shortcut
    </td>
    
    
        <td width="50%">
      At the end of the day check your Rambles, interpret them, tweak anything you want and save everything in one go.
    </td>
  </tr>
  
  
    <tr>
    <td align="center">
      <img width="300" alt="pico-llm1" src="/video/pico-llm1.gif" />
    </td>
    
    
        <td align="center">
      <img width="300" alt="pico-llm2" src="/video/pico-llm2.gif" />
    </td>
  </tr>
</tbody>
</table>

<tip>

Ramble is different from the regular [Assistant](/features/assistant). The Assistant fills a transaction form from a short, predictable command. Ramble understands natural, unstructured language and can produce several transactions at once.

</tip>
