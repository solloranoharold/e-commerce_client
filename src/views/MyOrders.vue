<template>
      <v-container fluid>
        <VerticalNavBarVue v-if="userInfo == null || userInfo.type!='ADMIN'"/>
        <AdminNavBar v-if="userInfo && userInfo.type=='ADMIN'"/>

        <br/>
        <h2 class="text-center">ORDERS</h2>
        <v-data-table 
        disable-pagination
        hide-default-footer
        :headers="headers" :items="Orders" dense
        >
            <template v-slot:[`item.status`]="{item}">
                <v-chip small class="ma-2" text-color="white" :color="item.status==1 ? 'orange' : item.status==2 ? 'blue' : 'success'">
                    {{ item.status == 1 ? 'Pending' : item.status == 2 ? 'For Delivery' : 'Delivered' }}
                </v-chip>
            </template>
            <template v-slot:[`item.action`]="{item}">
                <v-tooltip bottom  v-if="item.type_of_payment=='Gcash' && item.status == 1" >
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="primary" v-bind="attrs" v-on="on">mdi-upload</v-icon>
                    </template>
                    <span>Upload Receipt </span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="indigo"  v-bind="attrs" v-on="on">mdi-eye</v-icon>
                    </template>
                    <span>View Order </span>
                </v-tooltip>
                <v-tooltip bottom v-if="userInfo.fullname == 'ADMINISTRATOR'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="success"  v-bind="attrs" v-on="on">mdi-truck</v-icon>
                    </template>
                    <span>For Delivery</span>
                </v-tooltip>
                <v-tooltip bottom v-if="userInfo.fullname == 'ADMINISTRATOR'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="primary"  v-bind="attrs" v-on="on">mdi-check</v-icon>
                    </template>
                    <span>Delivered</span>
                </v-tooltip>
                <v-tooltip bottom v-if="userInfo.fullname == 'ADMINISTRATOR'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="red"  v-bind="attrs" v-on="on">mdi-cancel</v-icon>
                    </template>
                    <span>Cancel</span>
                </v-tooltip>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import VerticalNavBarVue from './VerticalNavBar.vue';
import AdminNavBar from './AdminNavBar.vue'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
export default {
    data:()=>({
        headers:[
            {text:'Invoice' , align:'center' , value:'invoice_id'},
            {text:'Fullname',align:'center',value:'fullname'},
            {text:'Status' , align:'center' , value:'status'},
            {text:'Total Price ' , align:'center' , value:'total_price'},
            {text:'Payment Method' , align:'center' , value:'type_of_payment'},
            {text:'Receipt(Gcash)' , align:'center' , value:'receipt'},
            {text:'Ordered Date' , align:'center' , value:'DateCreated'},
            {text:'Actions' , align:'center' , value:'action'}
        ],
        Orders:[]
    }),
components: {
    VerticalNavBarVue,AdminNavBar
  },
  created(){
    this.loadOrders()
    this.loadNotifications()
  },
  methods:{
    loadOrders(){
        let id = this.userInfo.fullname != 'ADMINISTRATOR' ? this.userInfo.acc_id : -1 
        axios.get(`${this.api}loadOrders/${id}`).then(res=>{
            if(res.data){
                this.Orders = res.data.filter(rec=>{
                    rec.DateCreated = moment(rec.DateCreated).format('YYYY-MM-DD HH:mm:ss')
                    return rec 
                })
                this.Orders = _.orderBy(this.Orders , ['DateCreated'],['desc'])
            }
        })
    }
  }
}
</script>

<style>

</style>