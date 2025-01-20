import * as vscode from "vscode";

export abstract class Context {
  private static readonly cache = new Map<string, string | boolean>();

  static async set(key: string, value: string | boolean): Promise<void> {
    if (value !== Context.get(key)) {
      Context.cache.set(key, value);
      await vscode.commands.executeCommand("setContext", key, value);
    }
  }

  static get(key: string): string | boolean | undefined {
    return Context.cache.get(key);
  }
}
