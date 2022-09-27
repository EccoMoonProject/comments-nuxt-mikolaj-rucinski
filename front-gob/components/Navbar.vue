<template>
    <div>
        <vs-navbar v-model="activeItem" class="nabarx">
            <div slot="title">
                <vs-navbar-title>
                    Wspieram projekt
                </vs-navbar-title>
            </div>

            <vs-navbar-item index="0">
                <a href="#">opis projektu</a>
            </vs-navbar-item>
            <vs-navbar-item index="1">
                <a href="#">Cele</a>
            </vs-navbar-item>
            <vs-navbar-item index="2">
                <a href="#">Aktualności</a>
            </vs-navbar-item>
            <vs-navbar-item index="3">
                <a href="#">Komentarze</a>
            </vs-navbar-item>
        </vs-navbar>
    </div>
</template>
<script>
import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax, {
    // make blue buttons default
    colors: {
        primary: '#5A8DEE',
        success: '#39DA8A',
        danger: '#FF5B5C',
        warning: '#FDAC41',
        dark: '#1E1E1E',
    },
    // options here
})

export default {
    data: () => ({
        activeItem: 0
    })
}
</script>
