import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions,Image } from 'react-native';
import select from './icons/select.png';
import selected from './icons/selected.png';
import {items} from './bridge'
import cross from './icons/cross.png';


class ListItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }
    
    // accessible from MemberDetails Component
    addToBasket() {
        items.addItem({ 
            shopName: this.props.shopName, // this need to be primary key in the DB
            itemName: this.props.itemName, 
            itemPrice: this.props.itemPrice, 
            area: this.props.area
        })
        this.setState({checked: true}) 
    }

    // accessible from MemberDetails Component
    cancelAddToBasket() {
        items.setItemsSelected = items.getItems.filter(i => i.itemName !== this.props.itemName) 
        this.setState({checked: false})
    }
    // accessible from Checkout Component
    throughBackFromTheBasket() { 
        items.setItemsSelected = items.getItems.filter(i => i.itemName !== this.props.itemName)
        this.props.refresh()
    }

    // BoilerPlate Function : this function returns a wrapper for images inside a listitem
    checkCross(image, action){
        return(
            <TouchableOpacity style = {{borderColor: 'red'}} 
                onPress = {()=> action()}>
                <Image source = {image}/>
            </TouchableOpacity>
        );
    }
    // can only be seen in Checkout Component
    crossBox(){
       return this.checkCross(cross, this.throughBackFromTheBasket.bind(this));  
    }
    // can only be seen in MemberDetails Component
    checkbox() {
        // checked -> is controlled from inside this function to change images
        return (this.state.checked ? this.checkCross(selected, this.cancelAddToBasket.bind(this)) :
                            this.checkCross(select, this.addToBasket.bind(this)))
    }
    render(){
        return(
            <TouchableOpacity style = {styles.food_wrapper} >
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                    <View style={styles.foodname}>
                        <Text style = {{color: 'white',fontSize: 24}}>{this.props.itemName}</Text>
                        {/* this will render the source of the item only when the listItem gets render in Checkout.js*/}
                        {this.props.cross ? (<Text style = {{color: 'white',fontSize: 12}}>
                                                    {this.props.shopName}
                                                </Text>) : null}
                    </View>
                    <View style={styles.foodprice}>
                        <Text style = {{color: 'white',fontSize: 22, paddingRight: 4}}>£: {this.props.itemPrice}</Text>
                        <View style = {{marginBottom: '4%'}}>
                            {this.props.checkbox ? this.checkbox()  : null}
                            {this.props.cross ? this.crossBox()  : null}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    food_wrapper:{
        flex: 1,
        flexDirection :'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        width: '100%',
        minHeight: 50,
        marginVertical: '1%',
        padding: '2%',
        backgroundColor: 'rgb(155,200,200)',

    },
    foodname:{
        flex: 2,
        flexDirection :'column',
    },
    foodprice:{
        flex: 1,
        flexDirection :'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
});

export default ListItem;