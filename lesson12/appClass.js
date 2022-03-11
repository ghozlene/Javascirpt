class Component {
	constructor(hostElementId, insertBefore = false) {
		if (hostElementId) {
			this.hostElement = document.getElementById(hostElementId);
		} else {
			this.hostElement = document.body;
		}
		this.insertBefore = insertBefore;
	}
	detach() {
		if (this.element) {
			this.element.remove();
		}
	}

	attach() {
		this.hostElement.insertAdjacentElement(
			this.insertBefore ? 'afterbegin' : 'beforeend',
			this.element
		);
	}
}

class ToolTip extends Component {
	constructor(closeNotifierFunction) {
		super();
		this.closeNotifier = closeNotifierFunction;
		this.create();
	}
	closeToolTip = () => {
		this.detach();
		this.closeNotifier();
	};
	create() {
		const toolTipElement = document.createElement('div');
		toolTipElement.className = 'card';
		toolTipElement.textContent = 'toolTip';
		toolTipElement.addEventListener('click', this.closeToolTip);
		this.element = toolTipElement;
	}
}

class DOMHelper {
	static clearEventListeners(element) {
		const cloneElement = element.cloneNode(true);
		element.replaceWith(cloneElement);
		return cloneElement;
	}
	static moveElement(elementId, newDestinationSelector) {
		const element = document.getElementById(elementId);
		const destinationElement = document.querySelector(newDestinationSelector);
		destinationElement.append(element);
		element.scrollIntoView({ behavior: 'smooth' });
	}
}
class ProjectItem {
	hasActiveToolTipe = false;
	constructor(id, updateProjectListsFunction, type) {
		this.id = id;
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.connectMoreInfoButton();
		this.connectSwitchButton(type);
	}

	showMoreInfoHandler() {
		if (this.hasActiveToolTipe) {
			return;
		}
		const toolTip = new ToolTip(() => {
			this.hasActiveToolTipe = false;
		});
		toolTip.attach();
		this.hasActiveToolTipe = true;
	}

	connectMoreInfoButton() {
		const projectItemElement = document.getElementById(this.id);
		const moreInfoBtn = projectItemElement.querySelector(
			'button:first-of-type'
		);
		moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);
	}

	connectSwitchButton(type) {
		const projectItemElement = document.getElementById(this.id);
		let switchButton = projectItemElement.querySelector('button:last-of-type');
		switchButton = DOMHelper.clearEventListeners(switchButton);
		switchButton.textContent = type === 'active' ? 'finish' : 'Activate';
		switchButton.addEventListener(
			'click',
			this.updateProjectListsHandler.bind(null, this.id)
		);
	}

	update(updateProjectListsFunction, type) {
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.connectSwitchButton(type);
	}
}

class ProjectList {
	projects = [];
	constructor(type) {
		this.type = type;
		const projItems = document.querySelectorAll(`#${type}-projects li`);
		for (const projItem of projItems) {
			this.projects.push(
				new ProjectItem(projItem.id, this.siwtchProject.bind(this), this.type)
			);
		}
		console.log(this.projects);
	}

	setSwitchHandlerFunction(switchHandlerFunction) {
		this.switchHandler = switchHandlerFunction;
	}

	addProject(project) {
		this.projects.push(project);
		DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
		project.update(this.siwtchProject.bind(this), this.type);
	}

	siwtchProject(projectId) {
		this.switchHandler(this.projects.find((p) => p.id === projectId));
		this.projects = this.projects.filter((p) => p.id !== projectId);
	}
}

class App {
	static init() {
		const activeProjectList = new ProjectList('active');
		const finishedProjectList = new ProjectList('finished');

		activeProjectList.setSwitchHandlerFunction(
			finishedProjectList.addProject.bind(finishedProjectList)
		);
		finishedProjectList.setSwitchHandlerFunction(
			activeProjectList.addProject.bind(activeProjectList)
		);
	}
}

App.init();
