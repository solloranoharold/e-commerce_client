<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <VerticalNavBar />
            </v-col>
        </v-row>
        <v-container fluid class="green darken-2" >
            <h2 class="text-center header" style="color:white;">WHOLE LECHON</h2>
            <v-divider style="border:2px solid white;"/>
            <v-row>
                <v-col style=" background-color: rgb(161, 79, 24);border-radius: 20px;">
                    <h2 class="text-center header" style="color:white;">PRICE</h2>
                    <v-divider style="border:2px solid white;"/>
                   <h2 v-for="(item ,i ) in Whole" :key="i" class="text-center header" style="color:white;"> {{ parseFloat(item.product_price).toFixed(2)  }}</h2>
                
                </v-col>
                <v-col style="background-color:#B71C1C;border-radius: 20px;">
                    <h2 class="text-center header" style="color:white;">LIVE WEIGHT</h2>
                    <v-divider style="border:2px solid white;" />
                    <h2 v-for="(item ,i ) in Whole" :key="i" class="text-center header" style="color:white;"> {{ item.product_name }}</h2> 
                </v-col>
            </v-row>
            <h2 class="text-center header" style="color:white;">VARIETY OF  LECHON</h2>
            <v-divider style="border:2px solid white;"/>
            <v-row>
                <v-col style=" background-color: rgb(161, 79, 24);border-radius: 20px;">
                    <h2 class="text-center header" style="color:white;">PRICE</h2>
                    <v-divider style="border:2px solid white;"/>
                   <h2 v-for="(item ,i ) in Variety" :key="i" class="text-center header" style="color:white;"> {{ parseFloat(item.product_price).toFixed(2)  }}</h2>
                
                </v-col>
                <v-col style="background-color:#B71C1C;border-radius: 20px;">
                    <h2 class="text-center header" style="color:white;">TYPE OF LECHON</h2>
                    <v-divider style="border:2px solid white;" />
                    <h2 v-for="(item ,i ) in Variety" :key="i" class="text-center header" style="color:white;"> {{ item.product_name }}</h2> 
                </v-col>
            </v-row>
            <h2 class="text-center header" style="color:white;"> DISHES</h2>
            <v-divider style="border:2px solid white;"/>
            <v-row>
                <v-col style=" background-color: rgb(161, 79, 24);border-radius: 20px;">
                    <h2 class="text-center header" style="color:white;">PRICE</h2>
                    <v-divider style="border:2px solid white;"/>
                   <h2 v-for="(item ,i ) in Dishes" :key="i" class="text-center header" style="color:white;"> {{ parseFloat(item.product_price).toFixed(2)  }}</h2>
                
                </v-col>
                <v-col style="background-color:#B71C1C;border-radius: 20px;">
                    <h2 class="text-center header" style="color:white;">TYPE OF DISHES</h2>
                    <v-divider style="border:2px solid white;" />
                    <h2 v-for="(item ,i ) in Dishes" :key="i" class="text-center header" style="color:white;"> {{ item.product_name }}</h2> 
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import VerticalNavBar from './VerticalNavBar.vue';
import axios from 'axios'
export default {
    components: {
        VerticalNavBar
    },
    data: () => ({
        Price: [
            '10,000', '11,000', '12,000', '13,000', '14,000', '15,000', '16,000'
        ],
        Kilos:[
            '20','25','30','35','40','45','50','55'
        ],
        Products:[],
        Whole:[],
        Variety:[],
        Dishes:[],
    }),
    created(){
        this.loadProducts()
        this.loadNotifications()
    },
    methods:{
        loadProducts(){
            this.Whole=[]
            this.Variety=[]
            this.Dishes=[]
            axios.get(`${this.api}loadProducts`).then(res=>{
                if(res.data){
                    this.Products = res.data
                    res.data.forEach(rec=>{
                        if(rec.category == 1 ) this.Whole.push(rec);
                        else if(rec.category == 2 ) this.Variety.push(rec);
                        else if(rec.category==3)this.Dishes.push(rec);
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>