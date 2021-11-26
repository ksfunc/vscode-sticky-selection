import * as vscode from "vscode";
import Controller from "./controller";
import Command from "./command";

export function activate(context: vscode.ExtensionContext) {
  const controllers = new Map<string, Controller>();

  function getOrCreateController(editor: vscode.TextEditor) {
    const key = editor.document.fileName;
    if (controllers.has(key)) {
      return controllers.get(key)!;
    } else {
      const controller = new Controller();
      controllers.set(key, controller);
      return controller;
    }
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("sticky-selection.enterStickySelectionMode", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const controller = getOrCreateController(editor);
      await controller.enterStickySelectionMode();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("sticky-selection.exitStickySelectionMode", async (args) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const controller = getOrCreateController(editor);
      if (args && args.command) {
        const command = new Command(args.command, args.args ? args.args : null);
        if (args.delay) {
          await controller.exitStickySelectionMode(editor, command, args.delay);
        } else {
          await controller.exitStickySelectionMode(editor, command);
        }
      } else {
        await controller.exitStickySelectionMode(editor);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("sticky-selection.exitStickySelectionModeWithSelectionKeeped", async (args) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const controller = getOrCreateController(editor);
      if (args && args.command) {
        const command = new Command(args.command, args.args ? args.args : null);
        if (args.delay) {
          await controller.exitStickySelectionModeWithSelectionKeeped(command, args.delay);
        } else {
          await controller.exitStickySelectionModeWithSelectionKeeped(command);
        }
      } else {
        await controller.exitStickySelectionModeWithSelectionKeeped();
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("type", async (args) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const controller = getOrCreateController(editor);
      await controller.type(args);
    })
  );

  vscode.window.onDidChangeActiveTextEditor(async (editor) => {
    if (!editor) {
      return;
    }

    const controller = getOrCreateController(editor);
    await controller.activate();
  });

  vscode.workspace.onDidCloseTextDocument((document) => {
    controllers.forEach((_controller, key) => {
      if (key === document.fileName) {
        controllers.delete(key);
      }
    });
  });
}

export function deactivate() {
  return;
}
