<template>
    <div>
        <div class="dropdown">
          <button class="btn dropdown-toggle" :class="btnstyle"
                  type="button"  
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  v-on:click="focusFilter"
                  ref="dropdown">
              {{ selected }}
              <span v-show="selected===''" style="font-style: italic;font-size: smaller"> Select </span>
          </button>
          <ul class="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
              ref="listItems">

              <li>
                  <input type="text" class="form-control"
                         autocomplete="off"
                         autofocus="autofocus"
                         role="textbox"
                         aria-label="Search"
                         style="margin: 3px; width: auto !important;"
                         v-model="tableFilter"
                         ref="tableFilter"
                         v-on:keyup.down="selectNext"
                         v-on:keyup.up="selectPrev"
                         v-on:keyup.esc="hide"
                         v-on:keyup.enter="selectCurrent"
                  >
              </li>
              <li v-for="item in filteredData" :key="item"
                      :class="getActiveClasses(item)"
                      :value="item"
                      v-on:keydown="keyFocusFilter"
                      v-on:keydown.down="selectNext"
                      v-on:keydown.up="selectPrev"
                      v-on:keydown.esc="hide"
                      v-on:click="selectThis(item)">
                  <a  class="dropdown-item" href="#">{{item}}</a>
              </li>
          </ul>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>

    /* used for fixing IE problems*/
    // import { polyfill } from 'es6-promise'; polyfill();
    import lodashincludes from 'lodash.includes';
    // import bootstrap from 'bootstrap';
    import $ from 'jquery';


    export default {
        name: "VueBootstrapSelect",
        props: {
            btnstyle: {
                type: String,
                default: "btn-default",
                required: false
            },
            selected: {
                type: String,
                required: true,
            },  // immutable
            list: {
                type: Array,
                required: true,
            }
        },
        data: function () {
            return {
                selectedFinal:'',
                tableFilter:'',
            };
        },
        mounted() {
            this.selectedFinal = this.selected;
        },
        watch: {
            selected() {
                this.selectedFinal = this.selected;
            },
            list() {
            },
        },
        computed: {
            filteredData: function() {
                if (this.tableFilter === undefined || this.tableFilter ===null || this.tableFilter.trim()==='' )
                    return this.list;
                let tempList = [];
                for(let i=0, len=this.list.length; i < len; i++){
                    if (lodashincludes( this.list[i].toLowerCase(), this.tableFilter.toLowerCase()) ) {
                        tempList.push( this.list[i] );
                    }
                }
                return tempList;
            }
        },
        methods: {
            getActiveClasses: function(input) {
                if (this.isSelected(input))
                    return this.btnstyle;
                else return '';
            },
            isSelected(input) {
                return input === this.selectedFinal;
            },
            selectThis(input) {
                // console.log("### select this => " + input);
                this.$emit('update:selected', input);
                this.selectedFinal = input;
                //this.setCurrentSchema(input);
                // $(this.$refs.dropdown).dropdown("toggle");
                this.tableFilter = "";
            },
            selectCurrent() {
                // console.log("### select current => " + this.selectedFinal);
                this.$emit('update:selected', this.selectedFinal);
                //this.selected = this.selectedFinal;
                //this.setCurrentSchema(this.selected);
                $(this.$refs.dropdown).dropdown("toggle");
                this.tableFilter = "";
            },
            focusFilter: function() {
                this.$nextTick(() => {
                    // console.log("FOCUS");
                    this.$refs.tableFilter.focus();
                });
            },
            keyFocusFilter: function(e) {
                if (e !== undefined &&
                    (e instanceof KeyboardEvent) &&
                    e.key !== "BackSpace" &&
                    e.key !== "ArrowDown" &&
                    e.key !== "ArrowUp"
                ) {
                    this.tableFilter = this.tableFilter + e.key;
                    this.focusFilter();
                }
            },
            selectNext() {
                let index = 0;
                if (this.selectedFinal !== undefined && this.index !== null) {
                    const self = this;
                    index = this.filteredData.findIndex((item) => item === self.selectedFinal);
                }
                index++;
                // console.log("### select next " + index);
                if (index < this.filteredData.length) {
                    this.selectedFinal = this.filteredData[index];
                    this.$nextTick(() => {
                        $(this.$el).find(".dropdown-menu li."+this.btnstyle+" a").focus()
                    });
                }
            },
            selectPrev() {
                let index = 0;
                if (this.selectedFinal !== undefined && this.index !== null) {
                    const self = this;
                    index = this.filteredData.findIndex((item) => item === self.selectedFinal);
                }
                index--;
                // console.log("### select prev " + index);
                if (index >= 0) {
                    this.selectedFinal = this.filteredData[index];
                    this.$nextTick(() => {
                        $(this.$el).find(".dropdown-menu li."+this.btnstyle+" a").focus()
                    });
                }
            },
            hide() {
                $(this.$refs.dropdown).dropdown("toggle");
                this.tableFilter = "";
            }
        }
    }
</script>
