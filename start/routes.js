'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/test', async () => {
    const tests = await use('App/Models/Test').findAll()
    return tests
})
Route.get('/productos', 'ProductoController.index')
Route.post('/productos', 'ProductoController.store')
Route.get('/productos/:id', 'ProductoController.show')
Route.put('/productos/:id', 'ProductoController.update')
Route.delete('/productos/:id', 'ProductoController.destroy')


