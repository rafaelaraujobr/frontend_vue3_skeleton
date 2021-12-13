export default [
    {
        path: '/',
        component: () => import("@/layouts/Main"),
        meta: {
            requiresAuth: true,
        },
        children: [
            { path: "", redirect: "main" },
            {
                path: 'main',
                name: 'Main',
                component: () => import('@/pages/Main.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: 'schedule',
                name: 'Schedule',
                component: () => import('@/pages/Schedule.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/about',
                name: 'About',
                component: () => import(/* webpackChunkName: "about" */ '@/pages/About.vue'),
                meta: {
                    requiresAuth: false,
                },
            }
        ]
    },
    {
        path: "/",
        component: () => import("@/layouts/Page.vue"),
        children: [
            // { path: "/account", redirect: "/account/signin" },
            {
                path: "signin",
                name: "SignIn",
                component: () => import("@/pages/SignIn.vue"),
                meta: { requiresAuth: false },
            },
            {
                path: "recoverpassword",
                name: "RecoverPassword",
                component: () => import("@/pages/RecoverPassword.vue"),
                meta: { requiresAuth: false },
            },
            {
                path: "signup",
                name: "SignUp",
                component: () => import("@/pages/SignUp.vue"),
                meta: { requiresAuth: false },
            }
        ],
    },
]