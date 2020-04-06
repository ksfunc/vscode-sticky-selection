import * as vscode from 'vscode';
import Command from './command';

export default class Controller {
	private isInStickySelectionMode: boolean;

	constructor() {
		this.isInStickySelectionMode = false;
	}

	async activate() {
		await this.ensureContext();
	}

	async enterStickySelectionMode() {
		this.isInStickySelectionMode = true;
		await this.ensureContext();
	}

	async exitStickySelectionMode(editor: vscode.TextEditor, command?: Command) {
		if (command !== undefined) {
			await command.execute();
		}
		this.removeSelections(editor);
		this.isInStickySelectionMode = false;
		await this.ensureContext();
	}

	removeSelections(editor: vscode.TextEditor) {
		editor.selections = editor.selections.map(selection => {
			const active = selection.active;
			return new vscode.Selection(active, active);
		});
	}

	async type(args: any) {
		await vscode.commands.executeCommand("default:type", args);
		this.isInStickySelectionMode = false;
		await this.ensureContext();
	}

	async ensureContext() {
		await vscode.commands.executeCommand('setContext', 'inStickySelectionMode', this.isInStickySelectionMode);
	}
}
