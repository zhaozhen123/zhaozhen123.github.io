declare module 'vant' {
    const Mint: any;
    declare module "vue/types/vue" {
        // 可以使用 `VueConstructor` 接口
        // 来声明全局属性
        interface Vue {
            $post: any
            $fetch:any
            $patch:string
            $pu:any
            $calendar:any
            $common:any
            $state:any
        }
    }
    export const Toast:any;
    export default Mint;
}