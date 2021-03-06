export default [{
  path: '/',
  name: 'home',
  component: () => import("@/views/layout/LayOut"),
  redirect: '/index',
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/home/Home'),
      props:true
    }, {
      path: 'search',
      name: 'search',
      component: () => import('@/views/search/Search'),
    },{
      path:'mvDetail/:id/:url',
      name:'mvDetail',
      component:()=>import('@/views/detail/MVDetail'),
      props:true,
    },{
      path: 'playListDetail/:id',
      name: 'playListDetail',
      component: () => import('@/views/detail/PlayListDetail'),
      props:true,
    }, {
      path:'artistDetail/:id',
      name:'artistDetail',
      component:()=>import('@/views/detail/ArtistDetail/ArtistDetail'),
      props: true,
    }]
},]
