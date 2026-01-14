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
		getDefaultFolder,
	};
})();

const TaskSystem = (() => {
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

const folder = FolderSystem.newFolder("Default");
folder.setDefault();

const task = TaskSystem.newTask("Title");

console.log(TaskSystem.getAllTasks());
task.delete();
