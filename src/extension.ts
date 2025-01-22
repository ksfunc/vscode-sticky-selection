import * as vscode from "vscode";
import { Controller } from "./controller";
import { Command } from "./command";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("sticky-selection.enterStickySelectionMode", async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor !== undefined) {
        const controller = Controller.getOrCreate(editor.document.fileName);
        await controller.enterStickySelectionMode();
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("sticky-selection.exitStickySelectionMode", async (args) => {
      const editor = vscode.window.activeTextEditor;
      if (editor !== undefined) {
        const controller = Controller.getOrCreate(editor.document.fileName);
        if (args?.command !== undefined) {
          const command = new Command(args.command, args.args);
          await controller.exitStickySelectionMode(editor, command, args.delay);
        } else {
          await controller.exitStickySelectionMode(editor);
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("sticky-selection.exitStickySelectionModePreserving", async (args) => {
      const editor = vscode.window.activeTextEditor;
      if (editor !== undefined) {
        const controller = Controller.getOrCreate(editor.document.fileName);
        if (args?.command !== undefined) {
          const command = new Command(args.command, args.args);
          await controller.exitStickySelectionModePreserving(command, args.delay);
        } else {
          await controller.exitStickySelectionModePreserving();
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("type", async (args) => {
      const editor = vscode.window.activeTextEditor;
      if (editor !== undefined) {
        const controller = Controller.getOrCreate(editor.document.fileName);
        await controller.type(args);
      }
    })
  );

  vscode.window.onDidChangeActiveTextEditor(async (editor) => {
    if (editor !== undefined) {
      const controller = Controller.getOrCreate(editor.document.fileName);
      await controller.activate();
    }
  });

  vscode.workspace.onDidCloseTextDocument((document) => {
    Controller.remove(document.fileName);
  });
}

export function deactivate() {}
