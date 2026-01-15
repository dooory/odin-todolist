import FolderSystem from "./folder";

export default (() => {
    let tasks = [];

    const getAllTasks = () => tasks;
    const getTaskById = (id) => tasks.find((element) => element.getId() === id);
    const getTaskIndex = (id) =>
        tasks.findIndex((element) => element.getId() === id);

    const newTask = (title, dueDate, priority, folderId, index) => {
        let listPosition = index || tasks.length;

        folderId =
            (FolderSystem.getFolderById(folderId) && folderId) ||
            FolderSystem.getDefaultFolderId();

        let id = crypto.randomUUID();
        let completed = false;
        let favorite = false;

        let task = {
            getId: () => id,
            getTitle: () => title,
            getListPosition: () => listPosition,
            getFolderId: () => folderId,
            getPriority: () => priority,
            getDueDate: () => dueDate,
            isCompleted: () => completed,
            isFavorite: () => favorite,

            setFavorite: (isFavorite) => favorite,
            setCompleted: (isCompleted) => {
                if (typeof isCompleted !== "boolean") {
                    console.error(
                        `Expected type <boolean> not type ${typeof isCompleted} for completed variable`
                    );

                    return;
                }

                completed = isCompleted;
            },
            setDueDate: (newDate) => {
                dueDate = newDate;
            },
            setPriority: (newPriority) => {
                priority = newPriority;
            },
            setTitle: (newTitle) => (title = newTitle),
            setListPosition: (position) => (listPosition = position),
            setFolderId: (newFolderId) => {
                if (!FolderSystem.getFolderById(newFolderId)) {
                    console.error(`No folder with id <${newFolderId}> found`);
                    return;
                }

                folderId = newFolderId;

                FolderSystem.updateFolderTasks(tasks);
            },

            delete: () => deleteTask(task.id),
        };

        tasks.push(task);

        FolderSystem.updateFolderTasks(tasks);

        return task;
    };

    const deleteTask = (id) => {
        if (!getTaskById(id)) {
            console.error(`No folder with id <${id}> found`);
            return;
        }

        tasks.splice(getTaskIndex(id), 1);
        FolderSystem.updateFolderTasks(tasks);

        return tasks;
    };

    return {
        newTask,
        getAllTasks,
        getTaskById,
        getTaskIndex,
    };
})();
