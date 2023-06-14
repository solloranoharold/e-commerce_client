<template>
  <v-container fluid>
    <VerticalNavBarVue v-if="userInfo == null || userInfo.type!='ADMIN'"/>
        <AdminNavBarVue v-if="userInfo && userInfo.type=='ADMIN'"/>

        <br/>
        <h2 class="text-center">ACCOUNTS</h2>

        <v-data-table dense :items="Accounts" :headers="Headers">
            <template v-slot:[`item.status`]="{item}">
                <v-chip class="ma-2" text-color="white" :color="item.status==1 ? 'success' : 'red'">
                    {{item.status == 1 ?'Active':'Ban'}}
                </v-chip>
            </template>
            <template v-slot:[`item.action`]="{item}">
                {{item}}
            </template>
        </v-data-table>

  </v-container>
</template>

<script>
import AdminNavBarVue from './AdminNavBar.vue'
import VerticalNavBarVue from './VerticalNavBar.vue'
import axios from 'axios'
export default {
    components:{
        AdminNavBarVue,VerticalNavBarVue
    },
    created(){
        this.loadAccounts()
    },
    data:()=>({
        Headers:[
            {text:'Fullname' , align:'center',value:'fullname'},
            {text:'Email',align:'left',value:'email'},
            {text:'Status',align:'center',value:'status'},
            {text:'Actions',align:'center',value:'action'}
        ],
        Accounts:[]
    }),
    methods:{
        loadAccounts(){
            axios.get(`${this.api}loadAccounts`).then(res=>{
                if(res.data){
                    this.Accounts = res.data.filter(rec=>{
                        return rec.fullname != 'ADMINISTRATOR'
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>