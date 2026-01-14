import "./style.css";
import FolderSystem from "./systems/folder";
import TaskSystem from "./systems/task";

const defaultFolder = FolderSystem.newFolder("Default");
defaultFolder.setDefault();

const newFolder = FolderSystem.newFolder("MyFolder");

const task = TaskSystem.newTask("Title", newFolder.id);
const otherTask = TaskSystem.newTask("Other");

newFolder.delete();
console.log(defaultFolder.tasks);
