import {TASK_CARD_STATE} from '@/utils/task-card-state';

const fakeData = [
  {
    id: Date.now(),
    title: 'Title #1',
    description: 'Проверь, пожалуйста, роли пользователей, чтобы водители не имели доступ к ненужному им функционалу',
    creationData: new Date(),
    state: TASK_CARD_STATE.TODO
  },
  {
    id: Date.now(),
    title: 'Панель водителя',
    description: 'Баланс на счету водителя.\n' +
        'Кнопка открыть смену.\n' +
        'Открытые смены. Кнопка закрыть смену.\n' +
        'Последние 10 транзакций на его счету.',
    creationData: new Date(),
    state: TASK_CARD_STATE.TODO
  },
  {
    id: Date.now(),
    title: 'Транзакции пересдали работать и отображаться',
    description: '',
    creationData: new Date(),
    state: TASK_CARD_STATE.IN_PROGRESS
  }
]
export default function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeData, 1000)
    })
  })
}
