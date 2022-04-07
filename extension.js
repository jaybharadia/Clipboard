// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  let config = vscode.workspace.getConfiguration("clipboard-2022");
  let clipboardSize = config.get("size", 12);
  var clipboardArray = [];
  var disposableArray = [];

  function addClipBoardItem(editor) {
    let doc = editor.document;
    let sels = editor.selections;
    if (sels.length) {
      for (var i = 0; i < sels.length; i++) {
        let line = sels[i].active.line;
        let text = doc.getText(new vscode.Range(sels[i].start, sels[i].end));
        if (sels[i].isEmpty) {
          let lineStart = new vscode.Position(line, 0);
          let lineEnd = new vscode.Position(
            line,
            doc.lineAt(line).range.end.character
          );
          text = doc.getText(new vscode.Range(lineStart, lineEnd));
        }
        clipboardArray.push(text);
        vscode.window.showInformationMessage("Code Copied");
        if (clipboardArray.length > clipboardSize) {
          clipboardArray.shift();
        }
      }
    }
  }

  function makeQuickPickItems(clipboardArray, toBeRemoved) {
    let copiedItems = [];
    if (toBeRemoved && clipboardArray.length > 0) {
      copiedItems.push({
        label: "",
        description: "Clear All History",
      });
    }

    for (var i = 0; i < clipboardArray.length; i++) {
      copiedItems.unshift({
        label: "",
        description: clipboardArray[i],
      });
    }

    return copiedItems;
  }

  function pasteSelectedItem(item) {
    let activeEditor = vscode.window.activeTextEditor;
    let text = item.description;
    activeEditor
      .edit((editBuilder) => {
        editBuilder.delete(activeEditor.selection); // delete selected text first before pasting new stuff
      })
      .then(() => {
        activeEditor.edit((editBuilder) => {
          editBuilder.insert(activeEditor.selection.start, text); // Pasting selection
          vscode.window.showInformationMessage("Code Pasted");
        });
      });
  }

  function removeSelectedItem(item) {
    clipboardArray.filter((clip) => {
      return clip == item.description;
    });
  }

  var index = 0;
  function pasteCycle() {
    if (clipboardArray.length) {
      let text = clipboardArray[index];
      index++;

      if (index == clipboardArray.length) index = 0;

      let activeEditor = vscode.window.activeTextEditor;
      activeEditor.edit((editBuilder) => {
        editBuilder.replace(activeEditor.selection, text);
      });
    } else {
      vscode.window.showInformationMessage("No Items to paste.");
    }
  }

  disposableArray.push(
    vscode.commands.registerCommand("clipboard-2022.pasteCycle", () => {
      pasteCycle();
    })
  );

  disposableArray.push(
    vscode.commands.registerCommand("clipboard-2022.copy", () => {
      addClipBoardItem(vscode.window.activeTextEditor);
      vscode.commands.executeCommand("editor.action.clipboardCopyAction");
    })
  );

  disposableArray.push(
    vscode.commands.registerCommand("clipboard-2022.select-code", () => {
      if (clipboardArray.length) {
        vscode.window
          .showQuickPick(makeQuickPickItems(clipboardArray, true))
          .then((item) => {
            if (item.description == "Clear All History") {
              clipboardArray = [];
              vscode.window.showInformationMessage(
                "ClipBoard History Deleted."
              );
            } else {
              pasteSelectedItem(item);
            }
          });
      } else {
        vscode.window.showInformationMessage("No Items in ClipBoard");
      }
    })
  );

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "clipboard-2022" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(disposableArray);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
