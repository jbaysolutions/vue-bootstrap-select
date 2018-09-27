<template>
    <div id="app">
        <div class="container-fluid">
            <div class="row">
                <!--<div class="col-sm-12">
                    <button class="btn btn-primary">HELLO!</button>
                </div>-->
                <br/><br/>
                <vue-bootstrap-select ref="exampleSelect1"
                                      :btnstyle=style
                                      :list=dataList
                                      :selected.sync=select
                >
                </vue-bootstrap-select>
            </div>
            <h2>Events Received</h2>
            <div>
                <!--{{ logging }}-->
            </div>
        </div>
    </div>
</template>

<script>
    import VueBootstrapSelect from './components/VueBootstrapSelect';

    export default {
        name: 'app',
        components: {
            VueBootstrapSelect,
        },
        data() {
            return {
                dataList: ["Filipe","Marco","Rui","Gustavo"],
                select : "Rui",
                style: "btn-primary",

            }
        },
        mounted: function () {
        },
        methods: {},
    }
</script>

<style>
</style>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
</style>
