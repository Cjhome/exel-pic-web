import request from '@/utils/request'

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data: {
      password: data.password,
      user_name: data.username
    }
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const usersEditor = (data: any) =>
  request({
    url: '/users/editor',
    method: 'post',
    data
  })

export const usersAdd = (data: any) =>
  request({
    url: '/users/add',
    method: 'post',
    data
  })

export const usersDelete = (data: any) =>
  request({
    url: '/users/usersDelete',
    method: 'post',
    data
  })

export const userList = () =>
  request({
    url: '/users/list',
    method: 'get'
  })

export const postExcelData = (data: any) =>
  request({
    url: '/update/excel',
    method: 'post',
    data
  })

export const createExcel = () =>
  request({
    url: '/update/create-excel',
    method: 'get'
  })
