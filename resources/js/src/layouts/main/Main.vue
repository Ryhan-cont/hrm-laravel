<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
========================================================================================== -->


<template>
  <div class="layout--main" :class="[layoutTypeClass, navbarClasses, footerClasses, {'no-scroll': isAppPage}]">

    <v-nav-menu
      :navMenuItems = "navMenuItems"
      title         = "AgileX"
      parent        = ".layout--main" />

    <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <div id="content-overlay" />

    <!-- Navbar -->
    <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1200">
      <the-navbar-horizontal
        :navbarType= "navbarType"
        :navbarData= "navbarData"
        :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]" />

      <div style="height: 62px" v-if="navbarType === 'static'"></div>

      <h-nav-menu
        :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]"
        :navMenuItems="navMenuItems" />
    </template>

    <template v-else>
      <the-navbar-vertical
        :navbarColor="navbarColor"
        :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]" />
    </template>
    <!-- /Navbar -->

      <div class="content-wrapper vs-con-loading__container" id="div-with-loading">

        <div class="router-view">
          <div class="router-content">
            <div class="content-area__content">
              <back-to-top bottom="5%" :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'" visibleoffset="500" v-if="!hideScrollToTop">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg btn-back-to-top" />
              </back-to-top>
              <transition :name="routerTransition" mode="out-in">
                <router-view @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" />
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>


<script>
import BackToTop           from 'vue-backtotop'
import HNavMenu            from '@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue'
//import navMenuItems        from '@/layouts/components/vertical-nav-menu/navMenuItems.js'
import TheNavbarHorizontal from '@/layouts/components/navbar/TheNavbarHorizontal.vue'
import TheNavbarVertical   from '@/layouts/components/navbar/TheNavbarVertical.vue'
import TheFooter           from '@/layouts/components/TheFooter.vue'
import themeConfig         from '@/../themeConfig.js'
import VNavMenu            from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue'

export default {
    components: {
        BackToTop,
        HNavMenu,
        TheFooter,
        TheNavbarHorizontal,
        TheNavbarVertical,
        VNavMenu
    },
    data() {
        return {
            footerType: themeConfig.footerType || 'static',
            hideScrollToTop: themeConfig.hideScrollToTop,
            isNavbarDark: false,
            navbarColor: themeConfig.navbarColor || '#fff',
            navbarType: themeConfig.navbarType || 'floating',
            navMenuItems: [],
            routerTransition: themeConfig.routerTransition || 'none',
            routeTitle: this.$route.meta.pageTitle,
            navbarData: [],
        }
    },
    watch: {
        $route() {
            this.routeTitle = this.$route.meta.pageTitle;
            this.changeRouteTitle(this.$route.meta.pageTitle);
            this.$store.commit('UPDATE_ERROR_DATA', []);
            this.$store.commit('UPDATE_FULL_ERROR_FIELD', {});
        },
        isThemeDark(val) {
            const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff'
            this.updateNavbarColor(color)
        },
        '$store.state.mainLayoutType'(val) {
            this.setNavMenuVisibility(val)
        }
    },
    computed: {
        bodyOverlay() {
            return this.$store.state.bodyOverlay
        },
        contentAreaClass() {
            if (this.mainLayoutType === 'vertical') {
                if (this.verticalNavMenuWidth === 'default') return 'content-area-reduced'
                else if (this.verticalNavMenuWidth === 'reduced') return 'content-area-lg'
                else return 'content-area-full'
            } else return 'content-area-full'
        },
        footerClasses() {
            return {
                'footer-hidden': this.footerType === 'hidden',
                'footer-sticky': this.footerType === 'sticky',
                'footer-static': this.footerType === 'static'
            }
        },
        isAppPage() {
            return this.$route.meta.no_scroll
        },
        isThemeDark() {
            return this.$store.state.theme === 'dark'
        },
        layoutTypeClass() {
            return `main-${this.mainLayoutType}`
        },
        mainLayoutType() {
            return this.$store.state.mainLayoutType
        },
        navbarClasses() {
            return {
                'navbar-hidden': this.navbarType === 'hidden',
                'navbar-sticky': this.navbarType === 'sticky',
                'navbar-static': this.navbarType === 'static',
                'navbar-floating': this.navbarType === 'floating'
            }
        },
        verticalNavMenuWidth() {
            return this.$store.state.verticalNavMenuWidth
        },
        windowWidth() {
            return this.$store.state.windowWidth
        }
    },
    methods: {
        async loadNavMenuItems() {
            try {
                var req = await axios.get('/api/data/layout');
                this.navMenuItems = req.data.menu;

                var userdata = {};
                userdata.displayName = req.data.user.full_name;
                userdata.uid = req.data.user.user_id;
                userdata.userRole = req.data.user.role_name;
                userdata.roleId = req.data.user.roleid;
                userdata.isAdmin = req.data.user.roleid === this.$constants.CONST_ROLE_COMPANY_ADMIN;
                userdata.photoURL = req.data.user.propic_url;
                this.$store.commit('UPDATE_USER_INFO', userdata);
                //console.log(req);
                //console.log(this.$store);
            } catch (err) {
                this.notificationAlert(err.response);
                console.log(err);
            }
        },

        changeRouteTitle(title) {
            this.routeTitle = title;
            document.title = title || 'Some Default Title';
        },

        updateNavbarColor(val) {
            this.navbarColor = val
            if (val === '#fff') this.isNavbarDark = false
            else this.isNavbarDark = true
        },
        setNavMenuVisibility(layoutType) {
            if ((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === 'vertical' && this.windowWidth < 1200)) {
                this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
                this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
            } else {
                this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
            }
        }
    },
    mounted() {
        this.changeRouteTitle(this.$route.meta.pageTitle);
        this.loadNavMenuItems();
    },
    created() {
        const color = this.navbarColor === '#fff' && this.isThemeDark ? '#10163a' : this.navbarColor
        this.updateNavbarColor(color)
        this.setNavMenuVisibility(this.$store.state.mainLayoutType)
    }
}

</script>

