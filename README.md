# vscode-sticky-selection README

This extension provides sticky-selection (region in Emacs) that supports multiple cursors and multiple tabs.

## Extension Commands

This extension contributes the following commands:

- `sticky-selection.enterStickySelectionMode`: Enter sticky-selection-mode
- `sticky-selection.exitStickySelectionMode`: Exit sticky-selection-mode
- `sticky-selection.exitStickySelectionModeWithSelectionKeeped`: Exit sticky-selection-mode with selection keeped

## Extension Keybindings

This extension contributes the following keybindings:

| Key            | Description                                                                       | OS      |
| -------------- | --------------------------------------------------------------------------------- | ------- |
| ctrl+space     | Enter sticky-selection-mode                                                       |         |
| escape         | Exit sticky-selection-mode if the editor does not have multiple selections        |         |
| down           | Execute `cursorDownSelect` if the controller is in sticky-selection-mode          |         |
| left           | Execute `cursorLeftSelect` if the controller is in sticky-selection-mode          |         |
| right          | Execute `cursorRightSelect` if the controller is in sticky-selection-mode         |         |
| up             | Execute `cursorUpSelect` if the controller is in sticky-selection-mode            |         |
| ctrl+n         | Execute `cursorDownSelect` if the controller is in sticky-selection-mode          | macOS   |
| ctrl+b         | Execute `cursorLeftSelect` if the controller is in sticky-selection-mode          | macOS   |
| ctrl+f         | Execute `cursorRightSelect` if the controller is in sticky-selection-mode         | macOS   |
| ctrl+p         | Execute `cursorUpSelect` if the controller is in sticky-selection-mode            | macOS   |
| end            | Execute `cursorEndSelect` if the controller is in sticky-selection-mode           |         |
| home           | Execute `cursorHomeSelect` if the controller is in sticky-selection-mode          |         |
| cmd+right      | Execute `cursorEndSelect` if the controller is in sticky-selection-mode           | macOS   |
| cmd+left       | Execute `cursorHomeSelect` if the controller is in sticky-selection-mode          | macOS   |
| ctrl+e         | Execute `cursorLineEndSelect` if the controller is in sticky-selection-mode       | macOS   |
| ctrl+a         | Execute `cursorLineStartSelect` if the controller is in sticky-selection-mode     | macOS   |
| ctrl+end       | Execute `cursorBottomSelect` if the controller is in sticky-selection-mode        | Windows |
| ctrl+home      | Execute `cursorTopSelect` if the controller is in sticky-selection-mode           | Windows |
| cmd+down       | Execute `cursorBottomSelect` if the controller is in sticky-selection-mode        | macOS   |
| cmd+up         | Execute `cursorTopSelect` if the controller is in sticky-selection-mode           | macOS   |
| pagedown       | Execute `cursorPageDownSelect` if the controller is in sticky-selection-mode      |         |
| pageup         | Execute `cursorPageUpSelect` if the controller is in sticky-selection-mode        |         |
| alt+right      | Execute `cursorWordEndRightSelect` if the controller is in sticky-selection-mode  | macOS   |
| alt+left       | Execute `cursorWordLeftSelect` if the controller is in sticky-selection-mode      | macOS   |
| ctrl+alt+right | Execute `cursorWordPartRightSelect` if the controller is in sticky-selection-mode | macOS   |
| ctrl+alt+left  | Execute `cursorWordPartLeftSelect` if the controller is in sticky-selection-mode  | macOS   |

If you are an Emacs user, you can enable the mode for `ctrl+v` and `alt+v` by editing `keybindings.json` as follows:

```json
[
  {
    "key": "ctrl+v",
    "command": "cursorPageDown",
    "when": "textInputFocus"
  },
  {
    "key": "alt+v",
    "command": "cursorPageUp",
    "when": "textInputFocus"
  },
  {
    "key": "ctrl+v",
    "command": "cursorPageDownSelect",
    "when": "editorTextFocus && inStickySelectionMode"
  },
  {
    "key": "alt+v",
    "command": "cursorPageUpSelect",
    "when": "editorTextFocus && inStickySelectionMode"
  }
]
```

In such manners, you can support other move commands including those of third parties.

By default, sticky-selection-mode continues even if you execute commands such as cut and paste. You can exit the mode after execution by taking these commands as arguments to `sticky-selection.exitStickySelectionMode` as follows:

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

In such manners, you can support other commands such as `backspace` and `delete`.
