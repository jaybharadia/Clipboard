<h1 align="center">
  <br>
  VS Code - ClipBoard 2022
  <br>
  <br>
    <img src="https://raw.githubusercontent.com/jaybharadia/Clipboard/main/images/clipboard.png" alt="logo" width="200">
  <br>
</h1>
<h4 align="center">Keep a history of your copied and cut items and re-paste if needed.</h4>

---

## Key Features

1. Save history of all copied and cut items
2. Paste from history
3. Clear all history
4. Remove selected item from history
5. Cycle all copied items for pasting without picking one by one

## Keyboard Shortcuts

**Type Clipboard in the command palette to view all commands.**

`Ctrl+C` copies and `Ctrl+X ` cuts the selected item. These override the default shortcuts to save the item to clipboard. If nothing is selected, the entire line will be saved.

`Ctrl+V` pastes the most recent item.

`Ctrl+Alt+P` opens dropdown for pasting item from a list of copied items.

`Ctrl+Shift+V` Loops through available copied items and pastes it one at a time as user presses key binding continuously.

`Ctrl+Alt+V D` opens the clipboard delete settings. Use the arrow keys to scroll and press Enter to remove a selected item. The "Clear History" option will erase all items from history.

You can also add custom keyboard short cuts by following the instructions in the [customization documentation](https://code.visualstudio.com/docs/customization/keybindings).

## Configuration

`clipboard.size` is the maximum number of items saved in the clipboard. The default is 12, but this can be changed in [settings](https://code.visualstudio.com/docs/getstarted/settings#_default-settings).

## Demos

### Saving to and Pasting from Clipboard History

![demo](https://raw.githubusercontent.com/jaybharadia/Clipboard/main/images/copy-and-paste-clipboard.gif)

### Erasing from Clipboard History and Deleting Particular Item from List

![demo](https://raw.githubusercontent.com/jaybharadia/Clipboard/main/images/delete-clear-all-clipboard.gif)

### Cycle Through List of Items and Paste according to requirements without having to pick from Dropdown

![demo](https://raw.githubusercontent.com/jaybharadia/Clipboard/main/images/cycle-copy-items-clipboard.gif)

---
