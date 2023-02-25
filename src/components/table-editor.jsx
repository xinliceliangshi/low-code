import {computed, defineComponent} from "vue";
import deepcopy from "deepcopy";
import {$tableDialog} from "@/components/TableDialog";
import {ElTag} from "element-plus";
export default defineComponent({
    props:{
        propConfig:{type:Object},
        modelValue:{type:Array},
    },
    emits: ['update:modelValue'],
    setup(props,ctx){
        const data=computed({
            get(){
                return props.modelValue||[]
            },
            set(newValue){
                ctx.emit('update:modelValue', deepcopy(newValue))
            }
        })
        const add=()=>{
            $tableDialog ({
                config:props.propConfig,
                    data:data.value,
                    onConfirm(value){
                    data.value=value;
                }
            })
        }
        return ()=>{
          return  <div>
              {(!data.value||data.value.length==0)&&<el-button onClick={add}>添加</el-button>}
              {(data.value || []).map(item=><ElTag onClick={add}>{item[props.propConfig.table.key]}</ElTag>)}

          </div>
        }
    }
})