import TaskSystem from "./task";

export default (() => {
    let folders = [];
    let defaultFolder;
    let defaultFolderId;

    const getAllFolders = () => folders;
    const getFolderById = (id) =>
        folders.find((element) => element.getId() === id);
    const getFolderIndex = (id) =>
        folders.findIndex((element) => element.getId() === id);
    const getDefaultFolder = () => defaultFolder || folders[0];
    const getDefaultFolderId = () => defaultFolderId || folders[0].getId();

    const setFolderAsDefault = (folder) => {
        defaultFolder = folder;
        defaultFolderId = folder.getId();
    };

    const clearFolderTasks = () => {
        for (let index = 0; index < folders.length; index++) {
            let folder = folders[index];
            folder.tasks = [];
        }
    };

    const updateFolderTasks = (tasks) => {
        clearFolderTasks();

        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            const folderId = task.getFolderId();

            let folder = getFolderById(folderId);

            folder.tasks.push(task.getId());
        }
    };

    const newFolder = (title, index) => {
        let listPosition = index || folders.length;
        let defaultFolder = false;
        let id = crypto.randomUUID();
        let favorite = false;

        let folder = {
            getId: () => id,
            getTitle: () => title,
            getListPosition: () => listPosition,
            isDefault: () => defaultFolder,
            isFavorite: () => favorite,

            tasks: [],

            setTitle: (newTitle) => (title = newTitle),
            setListPosition: (position) => (listPosition = position),
            setDefault: () => {
                defaultFolder = true;
                setFolderAsDefault(folder);
            },
            setFavorite: (isFavorite) => favorite,

            delete: () => {
                deleteFolder(id);
            },
        };

        folders.push(folder);

        return folder;
    };

    const deleteFolder = (id) => {
        const folder = getFolderById(id);
        const index = getFolderIndex(id);

        if (!folder) {
            console.error(`No folder with id <${id}> found`);
            return;
        }

        if (folder.isDefault()) {
            console.error(
                `Unable to delete folder <${id}>, as it is the default folder`
            );

            return;
        }

        for (let index = 0; index < folder.tasks.length; index++) {
            const task = TaskSystem.getTaskById(folder.tasks[index]);

            task.setFolderId(defaultFolderId);
        }

        folders.splice(index, 1);

        updateFolderTasks(TaskSystem.getAllTasks());

        return folders;
    };

    return {
        newFolder,
        getAllFolders,
        getFolderById,
        getDefaultFolder,
        getDefaultFolderId,
        updateFolderTasks,
    };
})();
