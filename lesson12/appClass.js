class toolTrip {}

class ProjectItem {
	constructor(id) {
		this.id = id;
		this.connectMoreInfoButton();
		this.connectSwitchButton();
	}

	connectMoreInfoButton() {}

	connectSwitchButton() {
		const projectItemElement = document.getElementById(this.id);
		const switchButton = projectItemElement.querySelector(
			'button:last-of-type'
		);
		switchButton.addEventListener('click');
	}
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
	siwtchProject(projectId) {
		this.projects = this.projects.filter((p) => p.id !== projectId);
	}
}

class App {
	static init() {
		const avtivteProject = new ProjectList('active');
		const finishedProject = new ProjectList('finished');
	}
}

App.init();
