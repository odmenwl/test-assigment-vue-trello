import fetchFakeApi from '@/utils/fake-api'
import {TASK_CARD_STATE} from '@/utils/task-card-state';

export default {
  state: {
    todoTasksList: [],
    inProgressTasksList: [],
    completedTasksList: []
  },
  mutations: {
    setTodoTasks(state, list) {
      state.todoTasksList = list
    },
    setInProgressTasks(state, list) {
      state.inProgressTasksList = list;
    },
    setCompletedTasks(state, list) {
      state.completedTasksList = list;
    },
    swapItems(state, {from, to}) {
      let fromList;
      let toList;

      switch (Number(from.state)) {
        case TASK_CARD_STATE.TODO: {
          fromList = state.todoTasksList;
          break;
        }
        case TASK_CARD_STATE.IN_PROGRESS: {
          fromList = state.inProgressTasksList;
          break
        }
        case TASK_CARD_STATE.COMPLETED: {
          fromList = state.completedTasksList;
          break
        }
      }

      switch (Number(to.state)) {
        case TASK_CARD_STATE.TODO: {
          toList = state.todoTasksList;
          break;
        }
        case TASK_CARD_STATE.IN_PROGRESS: {
          toList = state.inProgressTasksList;
          break
        }
        case TASK_CARD_STATE.COMPLETED: {
          toList = state.completedTasksList;
          break
        }
      }

      const fromListCopy = [...fromList];
      const toListCopy = [...toList];

      const fromItem = fromListCopy[from.index];
      fromItem.state = to.state;
      if (to.index) {
        toList[to.index] = fromItem;
      } else {
        toList.push(fromItem);
      }

      if(to.index) {
        const toItem = toListCopy[to.index];
        toItem.state = from.state;
        fromList[from.index] = toItem;
      } else {
        fromList.splice(from.index, 1);
      }
    },
  },
  actions: {
    async fetchTasks({commit}) {
      try {
        const tasks = await fetchFakeApi();
        const todoList = [];
        const inProgressTasksList = [];
        const completedTasksList = [];

        Array.isArray(tasks) && tasks.forEach((task) => {

          switch (task.state) {
            case TASK_CARD_STATE.TODO: {
              todoList.push(task);
              break
            }
            case TASK_CARD_STATE.IN_PROGRESS: {
              inProgressTasksList.push(task);
              break
            }
            case TASK_CARD_STATE.COMPLETED: {
              completedTasksList.push(task);
              break
            }
          }
        })

        todoList.length && commit('setTodoTasks', todoList);
        inProgressTasksList.length && commit('setInProgressTasks', inProgressTasksList);
        completedTasksList.length && commit('setCompletedTasks', completedTasksList);

      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    dragAndDropHandler({commit}, {from, to}) {
      commit('swapItems', {from, to});
    }
  },
  getters: {
    todoTasks: s => s.todoTasksList,
    inProgressTasks: s => s.inProgressTasksList,
    completedTasks: s => s.completedTasksList
  }
}
