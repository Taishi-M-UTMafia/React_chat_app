import request from 'superagent'
import Dispatcher from '../dispatcher'
import { ActionTypes } from '../constants/app'

export default {
  // 検索フォームのvalueを取得
  getSearchUser(value) {
    return new Promise((resolve, reject) => {
      request
      .get('/api/users/search') // 取得したいjsonがあるURLを指定する
      .query({value: value})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          // dispatcherからサーバーのアクションを取ってくる
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_SEARCH_USER,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  // current_userを取得
  getCurrentUser() {
    // debugger
    return new Promise((resolve, reject) => {
      // debugger
      request
      .get('/api/users/find_current_user')
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          // debugger
          // dispatcherからサーバーのアクションを取ってくる
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_CURRENT_USER,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  getFriends() {
    // Promiseでインスタンスを作る
    return new Promise((resolve, reject) => {
      request
      .get('/api/users/find_friends') // 取得したいjsonがあるURLを指定する
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text).reverse()
          // dispatcherからサーバーのアクションを取ってくる
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDS,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          if (json !== []) {
            Dispatcher.handleServerAction({
              type: ActionTypes.FIRST_OPENCHATID,
              firstID: json[0].id,
            })
          }
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
