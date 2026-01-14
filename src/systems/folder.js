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
            setDefault: () => setFolderAsDefault(folder),
        };

        folders.push(folder);

        return folder;
    };

    const deleteFolder = (id) => {
        if (!getFolderById(id)) {
            console.error(`No folder with id <${id}> found`);
            return;
        }

        delete folders[getFolderIndex(id)];

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
