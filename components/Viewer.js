import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';

export default function Viewer({data, selectPosition}) {
    const [selectedLanguage, setSelectedLanguage] = useState(`${data.location.lat},${data.location.lon}`);
    const select = (item) => {
        setSelectedLanguage(item);
        selectPosition(item);
    }
    Moment.locale('ru');
    console.log(data);
    return (
        <SafeAreaView style={styles.main}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'}/>
            <View style={styles.container}>
                <Picker style={{borderWidth: 0}}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue) =>
                            select(itemValue)
                        }>
                    <Picker.Item label="Текущее местоположение" value="true"/>
                    <Picker.Item label="JavaScript" value="51.52,-0.11;"/>
                </Picker>
                <Text>{data.location.name}/{data.location.lat},{data.location.lon}</Text>
                <LinearGradient
                    colors={["#4F7FFA", "#4F7FFA", "#335FD1"]}
                    start={{x: 0.1, y: 0.2}}
                    end={{x: 0.1, y: 0.2}}
                    style={styles.background}
                >
                    <View>
                        <View style={styles.row}>
                            <Text
                                style={styles.text}>{Moment(data.location.localtime).format('dddd, DD MMMM YYYY')}</Text>
                            <Text
                                style={styles.text}>{Moment(data.location.localtime).format('HH:mm')}</Text>
                        </View>
                        <View style={styles.currentWeather}>
                            <Image source={{uri: 'https:' + data.current.condition.icon}} style={styles.icon}/>
                            <View style={styles.rightText}>
                                <Text style={styles.textTop}>{data.current.temp_c} °С</Text>
                                <Text style={[styles.textTop, styles.textBottom]}>{data.current.condition.text}</Text>
                            </View>
                        </View>
                        <View style={styles.currentWeather}>
                            <Text style={styles.reload}>Последнее обновление 15:00</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 14,
        paddingTop: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 14,
        lineHeight: 17,
        color: '#ffffff',
    },
    background: {
        borderRadius: 12,
        padding: 24,
    },
    currentWeather: {
        flexDirection: 'row',
        marginTop: 24,
    },
    rightText: {
        marginLeft: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textTop: {
        fontSize: 20,
        lineHeight: 24,
        color: '#ffffff',
    },
    textBottom: {
        marginTop: 4,
    },
    reload: {
        fontSize: 14,
        lineHeight: 17,
        color: '#ffffff'
    },
    icon: {
        width: 64,
        height: 64,
        overflow: "visible",
        resizeMode: 'stretch'
    }
});
