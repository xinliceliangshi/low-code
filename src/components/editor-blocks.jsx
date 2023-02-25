import { computed, defineComponent, inject, onMounted, ref } from "vue";
import BlockResize from "../utils/block-resize"
export default defineComponent({
    props: {
        block: { type: Object },
        formData: { type: Object }
    },
    setup(props) {
        const blockStyles = computed(() => ({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: `${props.block.zIndex}`
        }));
        const config = inject('config');

        const blockRef = ref(null)
        onMounted(() => {
            let { offsetWidth, offsetHeight } = blockRef.value;
            if (props.block.alignCenter) { // 说明是拖拽松手的时候才渲染的，其他的默认渲染到页面上的内容不需要居中
                props.block.left = props.block.left - offsetWidth / 2;
                props.block.top = props.block.top - offsetHeight / 2; // 原则上重新派发事件
                props.block.alignCenter = false; // 让渲染后的结果才能去居中
            }
            props.block.width = offsetWidth;
            props.block.height = offsetHeight;
        })

        return () => {

            const component = config.componentMap[props.block.key];



            const RenderComponent = component.render({
                size: props.block.hasResize ? { width: props.block.width, height: props.block.height } : {},
                props: props.block.props,

                model: Object.keys(component.model || {}).reduce((prev, modelName) => {
                    let propName = props.block.model[modelName];
                    prev[modelName] = {
                        modelValue: props.formData[propName],
                        "onUpdate:modelValue": v=>  props.formData[propName] = v
                    }
                    return prev;
                }, {})
            });
            const { width, height } = component.resize || {}
            return <div class="editor-block" style={blockStyles.value} ref={blockRef}>
                {RenderComponent}
                {props.block.focus && (width || height) && <BlockResize
                    block={props.block}
                    component={component}
                ></BlockResize>}
            </div>
        }
    }
})