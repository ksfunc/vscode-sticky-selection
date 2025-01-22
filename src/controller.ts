import * as vscode from "vscode";
import { Command } from "./command";
import { Context } from "./context";

export class Controller {
  private static readonly controllers = new Map<string, Controller>();

  static getOrCreate(key: string) {
    let controller = Controller.controllers.get(key);

    if (controller === undefined) {
      controller = new Controller();
      Controller.controllers.set(key, controller);
    }

    return controller;
  }

  static remove(key: string) {
    Controller.controllers.delete(key);
  }

  private inStickySelectionMode = false;

  async activate() {
    await this.ensureContext();
  }

  async enterStickySelectionMode() {
    this.inStickySelectionMode = true;
    await this.ensureContext();
  }

  async exitStickySelectionMode(editor: vscode.TextEditor, command?: Command, delay?: number) {
    if (command !== undefined) {
      await command.execute();
      if (delay !== undefined && delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    this.removeSelections(editor);

    this.inStickySelectionMode = false;
    await this.ensureContext();
  }

  private removeSelections(editor: vscode.TextEditor) {
    editor.selections = editor.selections.map((selection) => {
      const active = selection.active;
      return new vscode.Selection(active, active);
    });
  }

  async exitStickySelectionModePreserving(command?: Command, delay?: number) {
    if (command !== undefined) {
      await command.execute();
      if (delay !== undefined && delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    this.inStickySelectionMode = false;
    await this.ensureContext();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async type(args: any) {
    await vscode.commands.executeCommand("default:type", args);

    this.inStickySelectionMode = false;
    await this.ensureContext();
  }

  async ensureContext() {
    await Context.set("inStickySelectionMode", this.inStickySelectionMode);
  }
}
