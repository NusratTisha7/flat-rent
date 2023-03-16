const userRouter = require('../routers/userRouter');
const propertyRouter = require('../routers/propertyRouter');
const districtRouter =require('../routers/districtRouter')

module.exports = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/property', propertyRouter);
    app.use('/api/district',districtRouter)
}