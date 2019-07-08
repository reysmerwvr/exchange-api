'use strict'

const User = use('App/Models/User')
const {validate} = use('Validator')

class UserController {
    async login ({auth, request, response}) {
        const rules = {
            email: 'required|email',
            password: 'required'
        }
        const validation = await validate(request.all(), rules)
        if (validation.fails()) {
            const message = validation.messages()[0].message;
            return response.status(400).json({data: {}, message, status: 'error', title : 'ValidationFailed'})
        }
        const {email, password} = request.all()
        try {
            const {token} = await await auth.attempt(email, password)
            if (!token) {
                return response.status(401).json({data: {}, message: 'Unauthorized', status: 'error', title : 'Unauthorized'})
            }
            const user = await User.query().where('email', email).first()
            user.token = `Bearer ${token}`
            return response.status(200).json({data: user.toJSON(), message: 'OK', status: 'success', title : ''})
        } catch (error) {
            return response.status(400).json({data: {}, message: error.message, status: error.status, title : ''})
        }
    }
}

module.exports = UserController
