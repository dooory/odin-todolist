import "./style.css";
import FolderSystem from "./systems/folder";
import TaskSystem from "./systems/task";

const defaultFolder = FolderSystem.newFolder("Default");
defaultFolder.setDefault();

const newFolder = FolderSystem.newFolder("MyFolder");

const task = TaskSystem.newTask("Title", 1, newFolder.getId());
const otherTask = TaskSystem.newTask("Other", 1);

console.log(otherTask.getPriority());
newFolder.delete();
