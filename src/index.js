import "./style.css";
import { add } from "date-fns";
import FolderSystem from "./systems/folder";
import TaskSystem from "./systems/task";

const defaultFolder = FolderSystem.newFolder("Default");
defaultFolder.setDefault();

const newFolder = FolderSystem.newFolder("MyFolder");

const task = TaskSystem.newTask(
    "Title",
    add(new Date(), { days: 10 }),
    1,
    newFolder.getId()
);
const otherTask = TaskSystem.newTask("Other", add(new Date(), { days: 14 }), 1);

otherTask.setCompleted(true);
console.log(otherTask.isCompleted());
