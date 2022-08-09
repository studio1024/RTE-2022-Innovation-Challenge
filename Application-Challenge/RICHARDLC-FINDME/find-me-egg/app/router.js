'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  router.post('/timewalker/api/user/login', controller.sys.user.login);
  router.get(
    '/timewalker/api/user/info',
    jwt,
    controller.sys.user.getCurUserInfo
  );

  router.post('/timewalker/api/change/psw', jwt, controller.sys.user.changePsw);
  router.post('/timewalker/api/reset/psw', jwt, controller.sys.user.resetPsw);

  router.post('/timewalker/api/file', controller.sys.file.upload);

  router.get('/timewalker/api/user/page', jwt, controller.sys.user.page);
  router.post('/timewalker/api/user/create', jwt, controller.sys.user.create);
  router.post('/timewalker/api/user/update', jwt, controller.sys.user.update);
  router.post('/timewalker/api/user/delete', jwt, controller.sys.user.delete);

  router.get('/timewalker/api/role/query', jwt, controller.sys.role.query);
  router.get('/timewalker/api/role/page', jwt, controller.sys.role.page);
  router.post('/timewalker/api/role/create', jwt, controller.sys.role.create);
  router.post('/timewalker/api/role/update', jwt, controller.sys.role.update);
  router.post('/timewalker/api/role/delete', jwt, controller.sys.role.delete);

  // 查询所有菜单
  router.get(
    '/timewalker/api/menu/query/tree',
    jwt,
    controller.sys.menu.queryTree
  );
  // 添加菜单
  router.post('/timewalker/api/menu/create', jwt, controller.sys.menu.create);
  // 修改菜单
  router.post('/timewalker/api/menu/update', jwt, controller.sys.menu.update);
  // 删除菜单
  router.post('/timewalker/api/menu/delete', jwt, controller.sys.menu.delete);
  // 更新角色菜单
  router.post(
    '/timewalker/api/role/menu/update',
    jwt,
    controller.sys.menu.setRoleMenu
  );
  // 根据角色id查询菜单
  router.get('/timewalker/api/role/menu', jwt, controller.sys.menu.getRoleMenu);
  // 获取当前用户菜单
  router.get(
    '/timewalker/api/user/menu',
    jwt,
    controller.sys.menu.getCurUserMenu
  );
  // 通过角色获取对应的用户
  router.get(
    '/timewalker/api/users/by/role',
    jwt,
    controller.sys.user.getUsersByRole
  );

  // 患者
  router.get(
    '/timewalker/api/patient/getCurUserInfo',
    jwt,
    controller.time.patient.getCurUserInfo
  );
  router.post('/timewalker/api/patient/login', controller.time.patient.login);
  router.post('/timewalker/api/patient/create', controller.time.patient.create);
  router.post(
    '/timewalker/api/patient/changePsw',
    jwt,
    controller.time.patient.changePsw
  );
  router.post(
    '/timewalker/api/patient/update',
    jwt,
    controller.time.patient.update
  );
  router.post(
    '/timewalker/api/patient/delete',
    jwt,
    controller.time.patient.delete
  );

  // 医生
  // router.get(
  //   '/timewalker/api/doctor/getCurUserInfo',
  //   jwt,
  //   controller.time.doctor.getCurUserInfo
  // );
  // router.post('/timewalker/api/doctor/login', controller.time.doctor.login);
  // router.post('/timewalker/api/doctor/page', controller.time.doctor.page);
  // router.post('/timewalker/api/doctor/create', controller.time.doctor.create);
  // router.post(
  //   '/timewalker/api/doctor/changePsw',
  //   jwt,
  //   controller.time.doctor.changePsw
  // );
  // router.post(
  //   '/timewalker/api/doctor/update',
  //   jwt,
  //   controller.time.doctor.update
  // );
  // router.post(
  //   '/timewalker/api/doctor/delete',
  //   jwt,
  //   controller.time.doctor.delete
  // );

  // 字典
  // router.post('/timewalker/api/dict/create', controller.time.dict.create);
  // router.post('/timewalker/api/dict/update', controller.time.dict.update);
  // router.get('/timewalker/api/dict/query', controller.time.dict.query);
  // router.post('/timewalker/api/dict/delete', controller.time.dict.delete);

  // 就诊事件
  // router.post(
  //   '/timewalker/api/seeDoctor/create',
  //   controller.time.seeDoctor.create
  // );
  // router.post(
  //   '/timewalker/api/seeDoctor/update',
  //   controller.time.seeDoctor.update
  // );
  // router.post('/timewalker/api/seeDoctor/page', controller.time.seeDoctor.page);
  // router.post(
  //   '/timewalker/api/seeDoctor/delete',
  //   controller.time.seeDoctor.delete
  // );

  // 评论
  // router.post(
  //   '/timewalker/api/comments/create',
  //   controller.time.comments.create
  // );
  // router.post(
  //   '/timewalker/api/comments/update',
  //   controller.time.comments.update
  // );
  // router.post('/timewalker/api/comments/query', controller.time.comments.query);
  // router.post('/timewalker/api/comments/delete',controller.time.comments.delete)
};
