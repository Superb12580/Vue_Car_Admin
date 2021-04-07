import router from "./router";

// 路由判断登录
router.beforeEach((to, from, next) => {
    // 如果需要权限
    if (to.matched.some(record => record.meta.requireAuth)) {
        const token = sessionStorage.getItem('user')
        if (token) {
            if (to.path === '/login') {

            } else {
                next()
            }
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})
