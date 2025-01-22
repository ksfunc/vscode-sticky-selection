# vscode-sticky-selection

This extension provides a "Sticky Selection" mode (similar to the "Region" in Emacs) with support for multiple cursors and multiple tabs.

## Commands

This extension provides the following commands:

- `sticky-selection.enterStickySelectionMode`: Enter Sticky Selection mode.
- `sticky-selection.exitStickySelectionMode`: Exit Sticky Selection mode.
- `sticky-selection.exitStickySelectionModePreserving`: Exit Sticky Selection mode while preserving the current selection.

## Keybindings

This extension provides the following keybindings:

| Key          | Description                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------- |
| `ctrl+space` | Enter Sticky Selection mode.                                                                |
| `escape`     | Exit Sticky Selection mode if there are no multiple selections created by multiple cursors. |

By default, `ctrl+space` is assigned to the `editor.action.triggerSuggest` command. To disable this default behavior, modify the `keybindings.json` file as follows:

```json
[
  {
    "key": "ctrl+space",
    "command": "-editor.action.triggerSuggest",
    "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly && !suggestWidgetVisible"
  },
  {
    "key": "ctrl+space",
    "command": "-toggleSuggestionDetails",
    "when": "suggestWidgetHasFocusedSuggestion && suggestWidgetVisible && textInputFocus"
  }
]
```

When the editor is in Sticky Selection mode, movement keys are reassigned to the `cursor*Select` commands as follows:

| Key              | Description                          | OS      |
| ---------------- | ------------------------------------ | ------- |
| `right`          | Execute `cursorRightSelect`.         |         |
| `left`           | Execute `cursorLeftSelect`.          |         |
| `down`           | Execute `cursorDownSelect`.          |         |
| `up`             | Execute `cursorUpSelect`.            |         |
| `ctrl+f`         | Execute `cursorRightSelect`.         | macOS   |
| `ctrl+b`         | Execute `cursorLeftSelect`.          | macOS   |
| `ctrl+n`         | Execute `cursorDownSelect`.          | macOS   |
| `ctrl+p`         | Execute `cursorUpSelect`.            | macOS   |
| `end`            | Execute `cursorEndSelect`.           |         |
| `home`           | Execute `cursorHomeSelect`.          |         |
| `cmd+right`      | Execute `cursorEndSelect`.           | macOS   |
| `cmd+left`       | Execute `cursorHomeSelect`.          | macOS   |
| `ctrl+e`         | Execute `cursorLineEndSelect`.       | macOS   |
| `ctrl+a`         | Execute `cursorLineStartSelect`.     | macOS   |
| `ctrl+end`       | Execute `cursorBottomSelect`.        | Windows |
| `ctrl+home`      | Execute `cursorTopSelect`.           | Windows |
| `cmd+down`       | Execute `cursorBottomSelect`.        | macOS   |
| `cmd+up`         | Execute `cursorTopSelect`.           | macOS   |
| `pagedown`       | Execute `cursorPageDownSelect`.      |         |
| `pageup`         | Execute `cursorPageUpSelect`.        |         |
| `alt+right`      | Execute `cursorWordEndRightSelect`.  | macOS   |
| `alt+left`       | Execute `cursorWordLeftSelect`.      | macOS   |
| `ctrl+alt+right` | Execute `cursorWordPartRightSelect`. | macOS   |
| `ctrl+alt+left`  | Execute `cursorWordPartLeftSelect`.  | macOS   |

For Emacs users, `ctrl+v` and `alt+v` can be configured to perform the page-down and page-up actions by modifying the `keybindings.json` file as follows:

```json
[
  {
    "key": "ctrl+v",
    "command": "cursorPageDown",
    "when": "textInputFocus"
  },
  {
    "key": "ctrl+v",
    "command": "cursorPageDownSelect",
    "when": "editorTextFocus && inStickySelectionMode"
  },
  {
    "key": "alt+v",
    "command": "cursorPageUp",
    "when": "textInputFocus"
  },
  {
    "key": "alt+v",
    "command": "cursorPageUpSelect",
    "when": "editorTextFocus && inStickySelectionMode"
  }
]
```

In this way, other movement keys can also be supported, including those from third-party extensions.

By default, the editor does not exit Sticky Selection mode after performing actions like cut and paste. To configure the editor to exit Sticky Selection mode after these actions, pass them as arguments to the `sticky-selection.exitStickySelectionMode` command, as follows:

```json
[
  {
    "key": "cmd+x",
    "command": "sticky-selection.exitStickySelectionMode",
    "args": {
      "command": "editor.action.clipboardCutAction",
      "delay": 100
    },
    "when": "editorTextFocus && !editorReadonly && inStickySelectionMode"
  },
  {
    "key": "cmd+c",
    "command": "sticky-selection.exitStickySelectionMode",
    "args": {
      "command": "editor.action.clipboardCopyAction",
      "delay": 100
    },
    "when": "editorTextFocus && inStickySelectionMode"
  },
  {
    "key": "cmd+v",
    "command": "sticky-selection.exitStickySelectionMode",
    "args": {
      "command": "editor.action.clipboardPasteAction",
      "delay": 100
    },
    "when": "editorTextFocus && !editorReadonly && inStickySelectionMode"
  }
]
```

Similarly, you can configure other keys, such as `backspace` and `delete`, to exit Sticky Selection mode.
