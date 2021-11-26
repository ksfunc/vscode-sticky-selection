import * as vscode from "vscode";

export default class Command {
  constructor(readonly name: string, readonly args: object | null) {
    return;
  }

  async execute() {
    if (this.args) {
      await vscode.commands.executeCommand(this.name, this.args);
    } else {
      await vscode.commands.executeCommand(this.name);
    }
  }
}
