import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return { friendWithMessages: [] }
  }

  getOpenChatUserID() {
    if (!this.get('openChatID')) this.setOpenChatUserID(null)
    return this.get('openChatID')
  }

  setOpenChatUserID(id) {
    this.set('openChatID', id)
  }

  getFriendWithMessages() {
    return this.state.friendWithMessages
  }
}

const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setOpenChatUserID(action.userID)
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGE_BY_ID:
      var lastAccess
      if (action.friend.id === action.friendship.to_user_id) {
        lastAccess = { currentUser: action.friendship.from_user_last_access, recipient: action.friendship.to_user_last_access }
      } else if (action.friend.id === action.friendship.from_user_id) {
        lastAccess = { currentUser: action.friendship.to_user_last_access, recipient: action.friendship.from_user_last_access }
      }
      MessagesStore.state.friendWithMessages.push({
        friend    : action.friend,
        lastAccess: lastAccess,
        messages  : action.json,
      })
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
