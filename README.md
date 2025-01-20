# vscode-sticky-selection

This extension provides a "Sticky Selection" mode (similar to the "Region" in Emacs) that supports multiple cursors and multiple tabs.

## Commands

This extension provides the following commands:

- `sticky-selection.enterStickySelectionMode`: Enter Sticky Selection mode.
- `sticky-selection.exitStickySelectionMode`: Exit Sticky Selection mode.
- `sticky-selection.exitStickySelectionModeWhilePreservingSelection`: Exit Sticky Selection mode while preserving the current selection.

## Keybindings

This extension provides the following keybindings:

| Key              | Description                                                        | OS      |
| ---------------- | ------------------------------------------------------------------ | ------- |
| `ctrl+space`     | Enter Sticky Selection mode.                                       |         |
| `escape`         | Exit Sticky Selection mode if there are no multiple selections.    |         |
| `right`          | Execute `cursorRightSelect` when in Sticky Selection mode.         |         |
| `left`           | Execute `cursorLeftSelect` when in Sticky Selection mode.          |         |
| `down`           | Execute `cursorDownSelect` when in Sticky Selection mode.          |         |
| `up`             | Execute `cursorUpSelect` when in Sticky Selection mode.            |         |
| `ctrl+f`         | Execute `cursorRightSelect` when in Sticky Selection mode.         | macOS   |
| `ctrl+b`         | Execute `cursorLeftSelect` when in Sticky Selection mode.          | macOS   |
| `ctrl+n`         | Execute `cursorDownSelect` when in Sticky Selection mode.          | macOS   |
| `ctrl+p`         | Execute `cursorUpSelect` when in Sticky Selection mode.            | macOS   |
| `end`            | Execute `cursorEndSelect` when in Sticky Selection mode.           |         |
| `home`           | Execute `cursorHomeSelect` when in Sticky Selection mode.          |         |
| `cmd+right`      | Execute `cursorEndSelect` when in Sticky Selection mode.           | macOS   |
| `cmd+left`       | Execute `cursorHomeSelect` when in Sticky Selection mode.          | macOS   |
| `ctrl+e`         | Execute `cursorLineEndSelect` when in Sticky Selection mode.       | macOS   |
| `ctrl+a`         | Execute `cursorLineStartSelect` when in Sticky Selection mode.     | macOS   |
| `ctrl+end`       | Execute `cursorBottomSelect` when in Sticky Selection mode.        | Windows |
| `ctrl+home`      | Execute `cursorTopSelect` when in Sticky Selection mode.           | Windows |
| `cmd+down`       | Execute `cursorBottomSelect` when in Sticky Selection mode.        | macOS   |
| `cmd+up`         | Execute `cursorTopSelect` when in Sticky Selection mode.           | macOS   |
| `pagedown`       | Execute `cursorPageDownSelect` when in Sticky Selection mode.      |         |
| `pageup`         | Execute `cursorPageUpSelect` when in Sticky Selection mode.        |         |
| `alt+right`      | Execute `cursorWordEndRightSelect` when in Sticky Selection mode.  | macOS   |
| `alt+left`       | Execute `cursorWordLeftSelect` when in Sticky Selection mode.      | macOS   |
| `ctrl+alt+right` | Execute `cursorWordPartRightSelect` when in Sticky Selection mode. | macOS   |
| `ctrl+alt+left`  | Execute `cursorWordPartLeftSelect` when in Sticky Selection mode.  | macOS   |

If you're an Emacs user, you can enable `ctrl+v` and `alt+v` to work with the page-down and page-up actions by modifying your `keybindings.json` as follows:

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

In this way, you can also support other movement commands, including those from third-party extensions.

By default, Sticky Selection mode remains active even when performing actions like cut and paste. You can exit the mode after these actions by passing them as arguments to the `sticky-selection.exitStickySelectionMode` command, as shown below:

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

Similarly, you can set up other commands, such as `backspace` and `delete`, to exit Sticky Selection mode.
