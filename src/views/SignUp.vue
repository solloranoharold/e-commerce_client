<template>
    <v-container fluid>
        <VerticalNavBar />
        <br/>
        <center>
            <v-flex md3 lg3 xs6 sm6>
                <v-card style="border:1px solid;" flat >
                    <v-card-text>
                        <h2>Create new Account</h2>
                        <h3>Already Registered ? <a @click="$router.push('/login')">Login Here </a></h3>
                        <br/><br/>
                        <label style="text-align:left;">NAME</label>
                        <v-text-field v-model="addObj.fullname" dark hide-details class="text" outlined  dense ></v-text-field>
                        <br/>
                        <label style="text-align:left;">EMAIL</label>
                        <v-text-field v-model="addObj.email" dark hide-details class="text" outlined dense  type="email"></v-text-field><br />
                        <label style="text-align:left;">PASSWORD</label>
                        <v-text-field  v-model="addObj.password" dark hide-details class="text" outlined dense  type="password"></v-text-field><br />
                        <label style="text-align:left;">CONFIRM PASSWORD</label>
                        <v-text-field v-model="addObj.cpass"  dark hide-details class="text" outlined dense  type="password"></v-text-field><br />
                        <label style="text-align:left;">MUNICIPALITY</label>
                        <v-autocomplete v-model="addObj.shipping_id" :items="Shippings" item-text="municipality" item-value="shipping_id" dark hide-details class="text" outlined dense ></v-autocomplete><br />
                        <label style="text-align:left;">COMPLETE ADDRESS</label>
                        <v-textarea v-model="addObj.address"  dark hide-details class="text" outlined dense ></v-textarea>
                        <br />
                        <v-btn dark class="green darken-2" @click="signUp()">SIGN UP</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </center>
    </v-container>
</template>

<script>
import VerticalNavBar from './VerticalNavBar.vue';
import axios from 'axios'
export default {
    components: {
        VerticalNavBar,
    },
    data: () => ({
        date:null,
        menu:false,
        Shippings:[],
        addObj:{},
        Accounts:[]
    }),
    created(){
        this.loadShippings()
        this.loadAccounts()
    },
    methods:{
        loadShippings(){
            axios.get(`${this.api}loadShippingFees`).then(res=>{
                if(res.data){
                    this.Shippings = res.data 
                }
            })
        },
        loadAccounts(){
            axios.get(`${this.api}loadAccounts`).then(res=>{
                if(res.data){
                    this.Accounts = res.data 
                }
            })
        },
        signUp(){
            if(!this.addObj.fullname || !this.addObj.email || !this.addObj.password || !this.addObj.cpass || !this.addObj.shipping_id || !this.addObj.address){
                alert('Please complete fields!')
                return false 
            }
            this.addObj.method = 0
            let i = this.Accounts.findIndex(x=>x.email.toUpperCase() == this.addObj.email.toUpperCase())
            if(i>-1){
                alert('Email already Exists!')
                return false 
            }

            if(this.addObj.password.toUpperCase() == this.addObj.cpass.toUpperCase()){
                axios.post(`${this.api}addEditAccount` , this.addObj).then(res=>{
                    if(res.data){
                        alert('Account has been registered!')
                        this.$router.push('/login')
                    }
                })
            }else{
                alert('Password and Confirm password not matched!')
            }
            
        }
    }
}
</script>

<style>
    .text{
        background-color: rgb(161, 79, 24);
    }
</style>