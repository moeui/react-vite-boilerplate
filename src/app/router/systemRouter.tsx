import { lazy } from 'react'

// https://www.jianshu.com/p/d2152789759d webpackPrefetch
const Login = lazy(() => import(/*webpackChunkName: 'Login'*/ /* webpackPrefetch: true */ '../containers/Login'))
const Register = lazy(() => import(/*webpackChunkName: 'Register'*/ /* webpackPrefetch: true */ '../containers/Register'))
const User = lazy(() => import(/*webpackChunkName: 'User'*/ /* webpackPrefetch: true */ '../containers/Admin/User'))
const Role = lazy(() => import(/*webpackChunkName: 'Role'*/ /* webpackPrefetch: true */ '../containers/Admin/Role'))

const menuData = [
    {
        name: '登录',
        key: 'Login',
        router: '/login/',
        component: Login
    },
    {
        name: '注册',
        key: 'Register',
        router: '/register/',
        component: Register
    },
    {
        name: '用户列表',
        key: 'UserList',
        router: '/userList/',
        component: User,
        exact: true
    },
    {
        name: '角色列表',
        key: 'RoleList',
        router: '/roleList/',
        component: Role
    },
    {
        name: '角色列表',
        key: 'RoleList',
        router: '/roleList/',
        component: Role
    }
]

export default menuData
