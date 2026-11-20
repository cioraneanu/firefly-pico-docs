# App usage

> Get the most out of Firefly Pico with this daily workflow.

**Firefly III** is very flexible and that can leave people unsure about how they should organise things. By no means is this the only way to do, but here's my opinionated guide:

### Daily usage

- Create **asset** accounts for everything: one for every family member, one for your savings, stocks broker etc.
- Don't create any **revenue** or **expense** accounts; that way they will be treated as "cash" and you'll have one less field to fill inside transactions
- Create your big, general **categories**: ex. Bills, Food, Fun, Transportation etc.
- Create your root **tags** with names identical to the **categories** above. This enables auto-selection of a **tag** when you pick a **category** and vice-versa.
- Create your child **tags** for granularity (ex. *Electricity*, *Heating*, *Internet* all under the parent **tag** *Bills*). It's a good idea to remember these names and use them with the assistant for super fast expense tracking
- Create a **tag**, name it "*todo*", and set the `Mark as to-do` field to Yes. Attach this tag to any transaction that needs later editing (or end the assistant text with `!!`). Ex. You paid dinner for multiple people and some will give you the money back later. Or you buy multiple shoes and return some of them. All these transactions will show up on your **Dashboard** and in the **TODO Inbox** (`Extras -> TODO Inbox` on mobile, sidebar on desktop) where you can review them and **Mark as done** (this just removes the todo **tag**).
- Set the usual account from which you make payments in `Settings -> Transactions -> Default form values -> Default source account` (on desktop `Settings -> Transaction defaults`)
- Create **recurring transactions** for all your subscriptions and transactions that repeat at fixed intervals. You can manage them directly in **Firefly-Pico** (`Extras -> Recurring transactions`) and see them in the "Upcoming transactions" dashboard card.
- Identify any transactions that you perform regularly but cannot be turned into **Repeating transactions** because of irregularities. Create **templates** for them. The assistant can easily handle them as well.
- For budgets you can setup "Rules" inside Firefly III. When a transaction is created, if it has a list of tags, asign it to your desiered budget.

### Split transactions

In **Firefly III** you can create *split transactions*: one transaction with multiple parts. Although useful for some
users, I would advise against using them. They add another level of complexity and don't work with the assistant.
My recommendation is to keep things simple and just create **N separate transactions**.

If you want to mark them as a "group" you can use matching descriptions like: `lidl - pet food`, `lidl - groceries`.

Although Pico doesn't allow the creation of split-transactions, you can always create them in Firefly III and see them as
readonly in Pico.

### On vacation:

- Create a new **tag** "vacation germany 2026" under a root tag "vacation".
- Create a new **profile** called "vacation"
- Configure `Settings -> Transactions -> Default form values` (desktop: `Settings -> Transaction defaults`) to use the foreign currency "Euro" and default tag "vacation germany 2026"
- Configure `Settings -> Assistant -> Currency` to "Euro"
This way you can still use the assitant to create new transactions, write the amount in the actual local currency and have the "vacation germany 2026" **tag** added automatically so you can check your total spending when you get back.

Example: In assistant `museum 50` -> means 50 Euros

If you don't like the fetched rate, set your own in `Extras -> Exchange rates` (it's saved per profile).

### Mobile device.

Finally make the process of starting the app faster by installing the PWA:

- <span>

iOS

</span>

 open the app in Safari -> Share -> Add to Homescreen. The app will also show up in you iOS global search

### Desktop

On a wide screen with a mouse or trackpad Pico opens its dedicated desktop interface. You can force either interface from `Settings -> Appearance & formatting -> Interface` (on tablets: `Settings -> User interface`).

- Press `N` anywhere to add a new transaction.
- Press `Cmd/Ctrl + K` to jump to any page or entity, or type an assistant text (ex. `groc 23`) to create a transaction or search for it.
