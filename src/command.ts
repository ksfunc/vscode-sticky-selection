import * as vscode from "vscode";

export class Command {
  constructor(readonly name: string, readonly args?: any) {}

  async execute() {
    if (this.args !== undefined) {
      await vscode.commands.executeCommand(this.name, this.args);
    } else {
      await vscode.commands.executeCommand(this.name);
    }
  }
}
