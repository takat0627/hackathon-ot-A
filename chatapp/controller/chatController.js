'use strict';
const dbModels = require('../models/');

let chatController = {
  roomChatsHistory: function (request, response, next) {
    dbModels.Chat.findAll({
      include: {
        model: dbModels.User
      }
    }).then(chats => {
      console.dir(chats);
      response.render('room', { user: request.session.user, chats: chats });
    })
  }
}

module.exports = chatController;