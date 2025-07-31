import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('monaco-webview-extension.openEditor', () => {
      const panel = vscode.window.createWebviewPanel(
        'monacoEditor',
        'Monaco Webview Editor',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'webview', 'public'))
          ]
        }
      );

      const scriptUri = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(context.extensionPath, 'webview', 'public', 'bundle.js'))
      );

      const html = getWebviewHtml(scriptUri);
      panel.webview.html = html;
    })
  );
}

function getWebviewHtml(scriptUri: vscode.Uri) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monaco Editor</title>
</head>
<body style="margin:0; padding:0;">
  <div id="root"></div>
  <script src="${scriptUri}"></script>
</body>
</html>`;
}
