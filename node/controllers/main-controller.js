const userSchema = require('../schemas/userSchema')
const postSchema = require('../schemas/postSchema')
const bcrypt = require('bcrypt')
const { uid } = require('uid')
const sendRes = require("../modules/universal-res")
const session = require('express-session')

module.exports = { 
    register: async (req, res) => {
        const {email, password, color} = req.body
        const hash = await bcrypt.hash(password, 10)
        const userFound = await userSchema.findOne({email})
        if(!userFound){
             async function newUser() {
                const user = new userSchema({
                    email: email,
                    password: hash,
                    color: color,
                })
                console.log(user)
                const member = await user.save()
             }
             sendRes(res, false, 'user created', {OK: 'OK'})
             newUser()
        } else {
            req.session.email = email
            req.session.color = color
            const compare = await bcrypt.compare(password, userFound.password)
            if(compare) return sendRes(res, false, 'user found: ', {session: req.session.email, user: userFound})
        }
    },
    sendmessage: async(req, res) => {
        const {message} = req.body
        const {email} = req.session
        const {color} = req.session

        const messagesFound = await postSchema.find({email})
        if(req.session.email) {
            async function newMessage() {
                const messageNew = new postSchema({
                    message: message,
                    email: email,
                    color: color,
                })
                console.log(messageNew)
                const newMessage = await messageNew.save()
            }
            sendRes(res, false, 'message sent', {session: req.session.email, message: messagesFound})
            newMessage()
        } else {
            return sendRes(res, true, 'you gotta register to send messages', {error: 'error'})
        }
    },
    allmessages: async(req, res) => {
        const messages = await postSchema.find({})
        res.send(messages)
    },
    autologin: async(req,res) => {
        const {email} = req.session
        if(email) {
            const user = await userSchema.findOne({email})
            return sendRes(res, false, 'ok', {email})
        }
        return sendRes(res, true, 'no session data', null)
    }
}

