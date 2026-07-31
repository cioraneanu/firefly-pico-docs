# Assistant

> Create transactions at the speed of thought.

The Assistant allows you to easily turn words into a transaction. You can even use your phone's dictation for a hands-free experience! 📢

## Format

The basic format is:
`[Tag / Category / Template] [Amount?] [Description?] [Todo?]`

### Parts

1. The first part tries to identify the transaction type via fuzzy searching your **tags**, **categories**
and **templates** (e.g., `elct` => `electricity`).
2. **Amount:** (optional) Supports mathematical expressions. Numbers separated by a space are automatically added up.
3. **Description:** (optional). If provided overwrites the default value (tag name / template description).
4. **Todo:** (optional) Appending a custom string (default `!!`) marks the transaction as a "Todo". This string is configurable in Settings.

## Examples

Assuming you have:

- **Tag**: "Electricity"
- **Template**: "Swimming"

<table>
<thead>
  <tr>
    <th>
      Input
    </th>
    
    <th>
      Result
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        electricity 23
      </code>
    </td>
    
    <td>
      Tag: Electricity, Amount: 23
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        elc 12*2+33
      </code>
    </td>
    
    <td>
      Tag: Electricity, Amount: 57
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        elc 12+2*3 custom description
      </code>
    </td>
    
    <td>
      Tag: Electricity, Amount: 18, Description: "custom description"
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        elc 25 !!
      </code>
    </td>
    
    <td>
      Tag: Electricity, Amount: 25, Marked as Todo
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        swim
      </code>
    </td>
    
    <td>
      Template: Swimming (uses template defaults)
    </td>
  </tr>
</tbody>
</table>

<tip>

Want to go one step further and just *talk* at your budget app? Check out [Ramble](/features/ramble) — the Assistant's AI-powered big brother.

</tip>
