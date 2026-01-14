import "./style.css";
import FolderSystem from "./systems/folder";
import TaskSystem from "./systems/task";

const defaultFolder = FolderSystem.newFolder("Default");
defaultFolder.setDefault();

const newFolder = FolderSystem.newFolder("MyFolder");

const task = TaskSystem.newTask("Title", newFolder.id);
const otherTask = TaskSystem.newTask("Other");

console.log(defaultFolder.tasks, newFolder.tasks);
otherTask.setFolderId(newFolder.id);
console.log(defaultFolder.tasks, newFolder.tasks);
