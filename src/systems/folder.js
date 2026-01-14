import TaskSystem from "./task";

export default (() => {
    let folders = [];
    let defaultFolder;
    let defaultFolderId;

    const getAllFolders = () => folders;
    const getFolderById = (id) => folders.find((element) => element.id === id);
    const getFolderIndex = (id) =>
        folders.findIndex((element) => element.id === id);
    const getDefaultFolder = () => defaultFolder || folders[0];
    const getDefaultFolderId = () => defaultFolderId || folders[0].id;

    const setFolderAsDefault = (folder) => {
        folder._default = true;
        defaultFolder = folder;
        defaultFolderId = folder.id;
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
            const folderId = task.folder;

            let folder = getFolderById(folderId);

            folder.tasks.push(task.id);
        }
    };

    const newFolder = (title, index) => {
        let listPosition = index || folders.length;

        let folder = {
            id: crypto.randomUUID(),
            title,
            tasks: [],
            delete: () => {
                deleteFolder(folder.id);
            },
            getListPosition: () => listPosition,
            setListPosition: (position) => (listPosition = position),
            _default: false,
            isDefault: () => folder._default,
            setDefault: () => setFolderAsDefault(folder),
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

        delete folders[index];

        return folders;
    };

    return {
        newFolder,
        getAllFolders,
        getFolderById,
        getDefaultFolder,
        getDefaultFolderId,
    };
})();
