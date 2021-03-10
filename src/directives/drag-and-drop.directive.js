let listeners = [];
let dragged = null;

function onDragStart(event) {
  const element = this;
  dragged = event.target;
  dragged.style.opacity = .5;

  const currentStateList = listeners.filter(x => x.dataset.state === element.dataset.state);

  for (let item of currentStateList) {
    item.dataset.uid !== dragged.dataset.uid && item.classList.add('trello-task_disabled');
  }
}

function onDragEnd(event) {
  dragged.style.opacity = 1;

  for (let item of listeners) {
    item.classList.remove("trello-task_disabled");
  }
}

function onDrop(event, vnode) {
  event.preventDefault();
  const element = this;

  if (dragged.dataset.state !== element.dataset.state) {
    event.stopPropagation();
    return false;
  }

  const listenerIndex = listeners.findIndex(x => x === dragged);
  listeners.splice(listenerIndex, 1);

  if (dragged.dataset.uid !== element.dataset.uid) {

    const eventName = 'onDrop';
    const eventData = {
      from: {
        state: dragged.dataset.state,
        index: dragged.dataset.index
      },
      to: {
        state: element.dataset.state,
        index: element.dataset.index
      }
    };

    vnode.elm.dispatchEvent(new CustomEvent(eventName, {detail: eventData}));
  }
}

function cancelDefault(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

function onDragEnterContainer(event) {
  event.preventDefault();
  const container = this;
  if(dragged.dataset.state !== container.dataset.state) {
    container.classList.add('trello-drag-container_active');
  }
}

function onDragLeaveContainer(event) {
  const container = this;
  if(dragged.dataset.state !== container.dataset.state) {
    container.classList.remove('trello-drag-container_active');
  }
}

function onDropContainer(event, vnode) {
  event.preventDefault();
  const container = this;
  container.classList.remove('trello-drag-container_active')

  if (dragged.dataset.state === container.dataset.state) {
    event.stopPropagation();
    return false;
  }

  const eventName = 'onDrop';
  const eventData = {
    from: {
      state: dragged.dataset.state,
      index: dragged.dataset.index
    },
    to: {
      state: container.dataset.state,
      index: undefined
    }
  };

  vnode.elm.dispatchEvent(new CustomEvent(eventName, {detail: eventData}));
}


export default {

  bind(el, {value}, vnode) {
    el.draggable = true;
    el.dataset.state = value;

    el.addEventListener("dragover", cancelDefault, false);
    el.addEventListener("dragenter", onDragEnterContainer, false);
    el.addEventListener("dragleave", onDragLeaveContainer, false);
    el.addEventListener("drop", function (event) { onDropContainer.call(this, event, vnode)}, false);

    const items = el.children;

    for (let i = 0; i < items.length; i++) {
      const div = items[i];
      div.draggable = true;
      div.dataset.state = value;
      div.dataset.index = `${i}`;
      div.dataset.uid = `${value}-${i}`;

      div.addEventListener("dragstart", onDragStart, false)
      div.addEventListener("dragend", onDragEnd, false)
      div.addEventListener("dragover", cancelDefault, false)
      div.addEventListener("drop", function (event) { onDrop.call(this, event, vnode) }, false)

      listeners.push(div);
    }
  },

  componentUpdated(el, {value}, vnode) {
    if(!el.draggable) el.draggable = true;
    el.dataset.state = value;

    const items = el.children;
    for (let i = 0; i < items.length; i++) {
      const div = items[i];
      if(!div.draggable) div.draggable = true;
      div.dataset.state = value;
      div.dataset.index = `${i}`;
      div.dataset.uid = `${value}-${i}`;

      if(!listeners.includes(div)) {
        div.addEventListener("dragstart", onDragStart, false)
        div.addEventListener("dragend", onDragEnd, false)
        div.addEventListener("dragover", cancelDefault, false)
        div.addEventListener("drop", function (event) { onDrop.call(this, event, vnode) }, false)
        listeners.push(div);
      }
    }
  }
}
