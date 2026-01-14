import "./style.css";

const FolderSystem = (() => {
	let folders = [];
	let defaultFolder;

	const getAllFolders = () => folders;
	const getFolderById = (id) => folders.find((element) => element.id === id);
	const getFolderIndex = (id) =>
		folders.findIndex((element) => element.id === id);
	const getDefaultFolder = () => defaultFolder || folders[0];

	const setFolderAsDefault = (folder) => {
		folder._default = true;
		defaultFolder = folder;
	};

	const newFolder = (title, index) => {
		let listPosition = index || folders.length;

		let folder = {
			id: crypto.randomUUID(),
			title,
			tasks: {},
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
	};
})();

const folder = FolderSystem.newFolder("Default");
folder.setDefault();

console.log(FolderSystem.getAllFolders());
