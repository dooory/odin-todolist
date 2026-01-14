import FolderSystem from "@systems/folder";

export default (() => {
    let tasks = [];

    const getAllTasks = () => tasks;
    const getTaskById = (id) => tasks.find((element) => element.id === id);
    const getTaskIndex = (id) =>
        tasks.findIndex((element) => element.id === id);

    const newTask = (title, folder, index) => {
        let listPosition = index || tasks.length;

        let task = {
            id: crypto.randomUUID(),
            title,
            getListPosition: () => listPosition,
            setListPosition: (position) => (listPosition = position),
            delete: () => deleteTask(task.id),
            folder: folder || FolderSystem.getDefaultFolder(),
        };

        tasks.push(task);

        return task;
    };

    const deleteTask = (id) => {
        if (!getTaskById(id)) {
            console.error(`No folder with id <${id}> found`);
            return;
        }

        delete tasks[getTaskIndex(id)];

        return tasks;
    };

    return {
        newTask,
        getAllTasks,
        getTaskById,
        getTaskIndex,
    };
})();
