import { defineComponent, inject, watch, reactive } from "vue";
import type, { UploadProps, UploadUserFile } from 'element-plus'

import deepcopy from "deepcopy";
import TableEditor from '../components/table-editor'
export default defineComponent({
    props: {


        block: { type: Object },
        data: { type: Object },
        updateContainer:{type:Function},
        updateBlock:{type:Function},

    },
    setup(props, ctx) {
        const config = inject('config');
        const state = reactive({
            editData: {},

        })
        const reset = () => {
            if (!props.block) {
                state.editData = deepcopy(props.data.container)
            } else {
                state.editData = deepcopy(props.block);
            }
        }
        const apply = () =>{
            if (!props.block) {
                props.updateContainer({...props.data,container: state.editData});
            } else {
                props.updateBlock(state.editData,props.block);
            }



        }

        const handleUploadImage=(e) =>{
            const file = e.target.files[0];

            const name = e.target.value;
            const fileName = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
            if (fileName !== 'jpg' && fileName !== 'jpeg' && fileName !== 'png' && fileName !== 'gif') {
                this.$message.error('图片格式错误')
                return
            }
            const isLt2M = file.size / 1024 / 1024 < 10
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 10MB!')
            } else {
                try {
                    const formData = new FormData()
                    formData.append('file', file)
                    const _self = this
                    var reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = function(e) {
                        // 图片base64化
                        var newUrl = this.result
                        _self.imageUrl = newUrl
                    }
                    this.imgFile = formData
                } catch (e) {
                    console.log(e)
                }

            }
        }





        watch(() => props.block, reset, { immediate: true })
        return () => {
            let content = []
            if (!props.block) {
                content.push(<>
                    <ElFormItem label="容器宽度">
                        <ElInputNumber v-model={state.editData.width}></ElInputNumber>
                    </ElFormItem>
                    <ElFormItem label="容器高度">
                        <ElInputNumber v-model={state.editData.height}></ElInputNumber>
                    </ElFormItem>
                </>)
            } else {
                let component = config.componentMap[props.block.key];
                if (component && component.props) {

                    content.push(Object.entries(component.props).map(([propName, propConfig]) => {
                        return <el-form-item label={propConfig.label}>
                            {{
                                input: () => <el-input v-model={state.editData.props[propName]}></el-input>,
                                inputcode:()=><el-input v-model={state.editData.props[propName]}></el-input>,
                                color: () => <el-color-picker v-model={state.editData.props[propName]}></el-color-picker>,
                                select: () => <ElSelect v-model={state.editData.props[propName]}>
                                    {propConfig.options.map(opt => {
                                        return <ElOption label={opt.label} value={opt.value}></ElOption>
                                    })}
                                </ElSelect>,
                                table:()=><TableEditor propConfig={propConfig} v-model={state.editData.props[propName]}



                                ></TableEditor>,
                                inputSrc:()=><el-input v-model={state.editData.props[propName]}></el-input>,
                                inputImage:()=><el-input v-model={state.editData.props[propName]}></el-input>,
                                inputv:()=><el-input v-model={state.editData.props[propName]}></el-input>,
                                uploader:()=>
                                    <el-upload
                                    class="upload-demo"
                                    list-type="picture"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                    onPreview={file => this.handlePreview(file)}
                                    onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                                    // fileList={fileList2}
                                    listType="picture"
                                onChange={handleUploadImage}
                                tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
                                >
                                    <el-button type="primary">Click to upload</el-button>
                                </el-upload>

                            }[propConfig.type]()}
                        </el-form-item>
                    }))
                }

                if(component && component.model){
                    content.push(Object.entries(component.model).map(([modelName,label])=>{
                        return <ElFormItem label={label}>
                            {}
                            <ElInput  v-model={state.editData.model[modelName]}></ElInput>
                        </ElFormItem>
                    }))
                }

            }


            return <ElForm labelPosition="top" style="padding:30px">
                {content}
                <ElFormItem>
                    <ElButton type="primary" onClick={()=>apply()}>应用</ElButton>
                    <ElButton onClick={reset} >重置</ElButton>
                </ElFormItem>
            </ElForm>
        }
    }
})