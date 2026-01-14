import "./style.css";
import FolderSystem from "@systems/folder.js";
import TaskSystem from "@systems/task.js";

const folder = FolderSystem.newFolder("Default");
folder.setDefault();

const task = TaskSystem.newTask("Title");

console.log(TaskSystem.getAllTasks());
