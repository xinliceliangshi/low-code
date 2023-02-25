
import event from './event'

import Vuex from 'vuex'


const data = {
    state: {

        ...event.state,


        editMode: 'edit', // 编辑器模式 edit preview
        canvasStyleData: { // 页面全局数据
            width: 1200,
            height: 740,
            scale: 100,
            color: '#000',
            opacity: 1,
            background: '#fff',
            fontSize: 14,
        },
        isInEdiotr: false, // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
        componentData: [], // 画布组件数据
        curComponent: null,
        curComponentIndex: null,
        // 点击画布时是否点中组件，主要用于取消选中组件用。
        // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
        isClickComponent: false,
    },
    mutations: {

        ...event.mutations,


        aceSetCanvasData(state, value) {
            state.canvasStyleData = value
        },

        aceSetcurComponent(state, value) {
            for (let i = 0; i < state.componentData.length; i++) {
                if (state.componentData[i].id === value.id) {
                    state.componentData.splice(i, 1)
                }
            }
            state.componentData.push(value)
            state.curComponent = value
        },

        setClickComponentStatus(state, status) {
            state.isClickComponent = status
        },

        setEditMode(state, mode) {
            state.editMode = mode
        },

        setInEditorStatus(state, status) {
            state.isInEdiotr = status
        },

        setCanvasStyle(state, style) {
            state.canvasStyleData = style
        },

        setCurComponent(state, { component, index }) {
            state.curComponent = component
            state.curComponentIndex = index
        },

        setShapeStyle({ curComponent }, { top, left, width, height, rotate }) {
            if (top) curComponent.style.top = Math.round(top)
            if (left) curComponent.style.left = Math.round(left)
            if (width) curComponent.style.width = Math.round(width)
            if (height) curComponent.style.height = Math.round(height)
            if (rotate) curComponent.style.rotate = Math.round(rotate)
        },

        setShapeSingleStyle({ curComponent }, { key, value }) {
            curComponent.style[key] = value
        },

        setComponentData(state, componentData = []) {
            Vue.set(state, 'componentData', componentData)
        },

        addComponent(state, { component, index }) {
            if (index !== undefined) {
                state.componentData.splice(index, 0, component)
            } else {
                state.componentData.push(component)
            }
        },

        deleteComponent(state, index) {
            if (index === undefined) {
                index = state.curComponentIndex
            }

            if (index == state.curComponentIndex) {
                state.curComponentIndex = null
                state.curComponent = null
            }

            if (/\d/.test(index)) {
                state.componentData.splice(index, 1)
            }
        },
    },
}

export default new Vuex.Store(data)