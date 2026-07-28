---
title: Ramble
description: Turn a few spoken or written words into complete transaction drafts.
---

Ramble is the fastest way to record one or more transactions when you do not want to fill in a form. Tell Pico what happened in your own words, then let it identify the transactions for you.

For example:

```text
Coffee and a croissant this morning, 5.50. Fuel yesterday at OMV, 60.
My salary came in today, 2,400.
```

Ramble turns that message into separate transaction drafts. It can fill in amounts, dates, descriptions, transaction types, accounts, categories, and tags by using the data already in your Firefly III account.

Nothing is saved immediately. You can review, edit, or remove every draft before creating the transactions.

## Choose how you want to use it

- **Inside Pico:** open Ramble, type or dictate a message, select **Interpret**, review the result, and create the transactions.
- **Capture now, review later:** send text or an audio recording to the Ramble API from an automation such as an iOS Shortcut. Pico keeps it until you are ready to review it.

## How Ramble handles your message

1. Pico sends your message and relevant Firefly III context to the language model you configured.
2. The model identifies the individual transactions.
3. Pico matches the results to your accounts, categories, tags, currency, language, and timezone.
4. You review the drafts and choose which transactions to create.

::note
Ramble sends financial context to the language model endpoint you configure. You can use a hosted provider or an OpenAI-compatible service on your own network.
::

## Get started

1. [Learn how to use Ramble](/features/ramble/use-ramble).
2. [Install and configure the required services](/features/ramble/configuration).
3. To capture rambles from another app or device, read the [Ramble API reference](/features/ramble/api).
4. iPhone and Apple Watch users can follow the [iOS Shortcuts guide](/features/ramble/ios).

::tip
Ramble is different from the regular [Assistant](/features/assistant). The Assistant fills a transaction form from a short, predictable command. Ramble understands natural, unstructured language and can produce several transactions at once.
::
