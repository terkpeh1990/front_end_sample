// export function createNotifier({ _context }) {

//   console.log('context', _context.app)

//   inject('notifier', {
//     showMessage ({ content = '', color = '' }) {
//       store.$patch('snackbar/showMessage', { content, color })
//     },
//   })
// }

// export default ({ app, store }, inject) => {
//   inject('notifier', {
//     showMessage ({ content = '', color = '' }) {
//       store.commit('snackbar/showMessage', { content, color })
//     },
//   })
// }

export default {
  install: (app, options) => {
    console.log(app)
  },
}