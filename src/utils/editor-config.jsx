
import Range from './Range'
import myvideo from "@/components/myvideo";


import "../../assets/style/iconfont.css"

function createEditorConfig() {


    const componentList = [];
    const componentMap = {}

    return {
        componentList,
        componentMap,
        register: (component) => {
            componentList.push(component);
            componentMap[component.key] = component;
        }
    }
}

export let registerConfig = createEditorConfig();
const createInputProp = (label) => ({ type: 'input', label });
const createFunctionProp = (label) => ({ type: 'inputcode', label });
const createSrcInputProp = (label) => ({ type: 'inputSrc', label });
const createvideoUrlInputProp= (label) => ({ type: 'inputv', label });
const createImageInputProp = (label) => ({ type: 'inputImage', label });
const createUpLoaderProp = (label) => ({ type: 'uploader', label });
const createColorProp = (label) => ({ type: 'color', label });
const createTableProp=(label,table)=>({ type:'table',label,table})
const createSelectProp = (label, options) => ({ type: 'select', label, options })

registerConfig.register({
    label: '文本',
    preview: () => <i className="iconfont icon-wenben"></i>
    ,
    render: ({ props }) => <span style={{ color: props.color, fontSize: props.size }}>{props.text || '渲染文本'}</span>,
    key: 'text',
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('字体颜色'),
        size: createSelectProp('字体大小',
            [
            { label: '14px', value: '14px' },
            { label: '20px', value: '20px' },
            { label: '24px', value: '24px' },
        ]),


    }
})


registerConfig.register({
    label: '按钮',
    resize: {
        width: true,
        height: true
    },

    preview: () => <i className="iconfont icon-anniu"></i>,
    render: ({ props, size }) => <ElButton style={{ height: size.height + 'px', width: size.width + 'px' }} type={props.type} size={props.size} onClick={props.fun}>{props.text || '渲染按钮'}</ElButton>,
    key: 'button',
    props: {
        text: createInputProp('按钮内容'),
        type: createSelectProp('按钮类型', [
            { label: 'primary', value: 'primary' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },

        ]),
        size: createSelectProp('按钮尺寸', [
            { label: '默认', value: '' },
            { label: '大', value: 'large' },
            { label: '小', value: 'small' },
        ]),

     fun:createFunctionProp('事件')

    },


})
registerConfig.register({
    label: '输入框',
    resize: {
        width: true,
    },
    preview: () => <i className="iconfont icon-duohangshurukuang"></i>,
    render: ({model,size}) => <ElInput placeholder="渲染输入框" {...model.default}  style={{ width: size.width + 'px' }}></ElInput>,
    key: 'input',
    model: {
        default: '绑定字段'
    }
});

registerConfig.register({
    label:'范围选择器',
    preview: () => <i className="iconfont icon-shuzixuanzeqi"></i>,
    render:({model})=>{
        return <Range {...{
            start:model.start.modelValue, // @update:start
            end:model.end.modelValue,
            'onUpdate:start':model.start['onUpdate:modelValue'],
            'onUpdate:end':model.end['onUpdate:modelValue']
        }}></Range>
    },
    model:{
        start:'开始范围字段',
        end:'结束范围字段'
    },
    key: 'range',
})

registerConfig.register({
    label:'下拉框',
    preview:()=><i className="iconfont icon-biaodanzujian-xialakuang"></i>,
   render:({props ,model}) => {
     return    <el-select {...model.default}>
         {(props.options || []).map((opt, index) => {
             return <ElOption label={opt.label} value={opt.value} key={index}></ElOption>
         })}


   </el-select>  },
    key:'select',
    props:{
       options:createTableProp('下拉选项',{
           options:[
               { label:'显示值',field:'label'},
               { label:'绑定值',field:'value'},
           ],
           key:'label'
       })
    },
    model: {
        default: '绑定字段'
    }
})


registerConfig.register({


    label:'图片',

    resize: {
        width: true,
        height: true
    },
    preview:()=><i className="iconfont icon-image-full"></i>,
    render:({size,props}) =>

        <el-image   style={{ width: size.width + 'px' ,height: size.height + 'px', }}   src={props.src||"https://img2.woyaogexing.com/2021/02/09/b936e87510614b66851f801527e6c859!400x400.jpeg"} lazy />,
    key: 'image',
   props:{
        uploader:createUpLoaderProp('图片'),
       src:createImageInputProp('图片地址')
   },




})


import {ElLink} from "element-plus";

registerConfig.register({
    label:'链接',
    preview:()=><i className="iconfont icon-lianjie"></i>,
    render:({props}) => <ElLink  href={props.href}type="primary" >link</ElLink>,


    key:'link',

    props:{
        href:createSrcInputProp('链接'),
    }

})


registerConfig.register({
    label:'视频',
    preview:()=><i className="iconfont icon-shipin"></i>,

    render:({props}) => {

         return<myvideo  videoUrl={props.videoUrl ||"https://video.pearvideo.com/mp4/short/20200209/cont-1650197-14888002-hd.mp4"}></myvideo>


    },

    key:'video',
    props:{
        videoUrl:createvideoUrlInputProp('链接')
}

})
