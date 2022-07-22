import React from "react";
import * as Location from 'expo-location';
import Loading from "./components/Loading";
import Viewer from "./components/Viewer";
import {Alert} from "react-native";
import axios from "axios";

const API_KEY = '3d24c4f6fb12406e833135024222206';

export default class extends React.Component {

    state = {
        isLoading: true
    }

    selcted = (item) => {
        if (item === 'true') {
            this.getWeather(true);
        } else {
            this.getWeather(false, item);
        }
    }

    getWeather = async (pos, coord) => {
        let position = '';
        if (pos) {
            // const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
            // position = `${latitude},${longitude}`;
            position = '47.6971008,35.3632256';
        } else {
            position = coord;
        }
        this.setState({isLoading: true});
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${position}&days=10&aqi=yes&lang=ru&alerts=yes`;
        axios.get(url).then(res => {
            this.setState({isLoading: false, dataWeather: res.data});
        });
    }

    getLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            this.getWeather(true);
        } catch (error) {
            Alert.alert('Не могу определить местоположение', 'Очень жаль :(')
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        return (
            this.state.isLoading ? <Loading/> : <Viewer data={this.state.dataWeather} selectPosition={this.selcted}/>
        );
    }
}
