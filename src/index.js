import "./style.css";
import FolderSystem from "./systems/folder";
import TaskSystem from "./systems/task";

const defaultFolder = FolderSystem.newFolder("Default");
defaultFolder.setDefault();
defaultFolder.delete();

const newFolder = FolderSystem.newFolder("MyFolder");

const task = TaskSystem.newTask("Title", newFolder.id);
const otherTask = TaskSystem.newTask("Other");
