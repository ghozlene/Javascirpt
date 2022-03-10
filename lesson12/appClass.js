class toolTrip {}

class ProjectItem {
	constructor(id) {
		this.id = id;
		this.connectMoreInfoButton();
		this.connectSwitchButton();
	}

	connectMoreInfoButton() {}

	connectSwitchButton() {}
}

class ProjectList {
	projects = [];
	constructor(type) {
		const projItems = document.querySelectorAll(`#${type}-projects li`);
		for (const projItem of projItems) {
			this.projects.push(new ProjectItem(projItem.id));
		}
		console.log(this.projects);
	}
}

class App {
	static init() {
		const avtivteProject = new ProjectList('active');
		const finishedProject = new ProjectList('finished');
	}
}

App.init();
