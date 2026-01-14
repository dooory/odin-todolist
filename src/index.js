import "./style.css";

const FolderSystem = (() => {
	let folders = [];

	const getAllFolders = () => folders;
	const getFolderById = (id) => folders.find((element) => element.id === id);
	const getFolderIndex = (id) =>
		folders.findIndex((element) => element.id === id);

	const setFolderAsDefault = (folder) => (folder._default = true);

	const newFolder = (title, index) => {
		let folder = {
			id: crypto.randomUUID(),
			title,
			tasks: {},
			delete: () => {
				deleteFolder(folder.id);
			},
			fakeIndex: index || folders.length,
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
