export const TASK_CARD_STATE  = {
  TODO: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3
}

export const TASK_CARD_STATE_LIST = {
  [TASK_CARD_STATE.TODO] : {
    id: TASK_CARD_STATE.TODO,
    color: 'blue',
    text: 'Открыто'
  },
  [TASK_CARD_STATE.IN_PROGRESS] : {
    id: TASK_CARD_STATE.IN_PROGRESS,
    color: 'orange',
    text: 'В обработке'
  },
  [TASK_CARD_STATE.COMPLETED] : {
    id: TASK_CARD_STATE.COMPLETED,
    color: 'red',
    text: 'Выполнено'
  }
}
