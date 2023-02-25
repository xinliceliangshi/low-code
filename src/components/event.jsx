import { defineComponent, inject, watch, reactive } from "vue";
import {eventList} from '@/utils/event.js'

import {mapState} from 'vuex'

export default defineComponent({
    data() {
        return {
            isShowEvent: false,
            eventURL: '',
            eventActiveName: 'redirect',
            eventList,
        }
    },
    setup() {


        const addEvent = (event, params) => {
            this.isShowEvent = false;
            this.$stroe.commit('addEvent', {event, param})

        }

        const removeEvent = (event) => {
            this.$store.commit('removeEvent', event)
        }


        return () => {
       return <div class="event-list">
                <div class="div-event">
                    <el-button>添加事件</el-button>

                    <el-button>删除事件</el-button>

                </div>


            </div>


        }


    }


})
