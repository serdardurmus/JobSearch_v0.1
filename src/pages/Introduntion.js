import React from 'react';
import { SafeAreaView, Text, View, ScrollView} from 'react-native';

import { TopicItem } from '../components';
import { introduction } from '../styles';

const topics = [
    {id: 0, name: 'Java', color: 'fb5607'},
    {id: 1, name: 'Python', color: '007f5f'},
    {id: 2, name: 'Javascript', color: 'ffb703'},
    {id: 3, name: '.NEt', color: '023e7d'},
    {id: 4, name: 'Dart', color: '001845'},
    {id: 5, name: 'GO', color: 'f8961e'},
    {id: 6, name: 'Ruby', color: 'e63946'},
    {id: 7, name: 'C', color: 'fb8b24'},
    {id: 8, name: 'C++', color: '06d6a0'},
]

const Introduction = (props) => {

    // Herhangi bir dile basınca sayfayı yönlendirmek için fonksiyonumu yazıyorum
    function selectLanguage(lang) {
        props.navigation.navigate("Jobs", { selectLanguage: lang})
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#eceff1"}}>
            <View style={{flex: 1}}>
                <View style={introduction.banner}> 
                    <Text style={introduction.bannerText}>Aradığınız dili seçin</Text>
                </View>
                <ScrollView
                    horizontal
                    // contentContainerStyle her bir sütuna özel style vermek için kullanıyoruz
                    contentContainerStyle= {{ alignItems: "center"}}
                >
                    {
                        topics.map( t => <TopicItem key={t.id} item={t} onSelect={() => selectLanguage(t.name)}/>)
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export { Introduction }; 