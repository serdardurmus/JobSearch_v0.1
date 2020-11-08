import Axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';

import { JobItem } from '../components';
import { jobs } from '../styles';

const Jobs = (props) => {
    const [data, setData] = useState([]);

    // modul içine veri gçndermek için bunu kullanacağız
    const [selectedJob, setSelectedJob] = useState("");

    // Modul un değerini bir state de yakalamak istiyorum. Modul state takibinde ilerleyecek
    // Flag özel kelimedir. Bir şeyin açık kapalı olup olmadığı ya da aktif inaktif yapıları flag ile tutulur
    // sayfa açıldığında modal yüklenir, o yüzden false yaptım. modul ilk anda kapalı olması lazım
    const [modalFlag, setModalFlag] = useState(false);
    const {selectLanguage} = props.route.params

    const fetchData = async () => {
        const response = await Axios.get(`https://jobs.github.com/positions.json?search=${selectLanguage.toLowerCase()}`)
        setData(response.data);
    }

    useEffect(() => { 
        fetchData()
    }, []);


    const onJobSelect= (job) => {
        setModalFlag(true)
        setSelectedJob(job)
    }

    // renderItem için buraya fonksiyonu yazıyoruz
    const renderJobs = ( {item}) => <JobItem job={item} onSelect={() => onJobSelect(item)}/>

    // iş kaydetmek için bu fonksiyonu yazıyorum
    const onJobSave = async () => {
        let savedJobList = await AsyncStorage.getItem("@SAVED_JOBS");
        // console.log(savedJobList);
        savedJobList = savedJobList == null ? [] : JSON.parse(savedJobList);

        const updatedJobList = [...savedJobList, selectedJob];
        AsyncStorage.setItem("@SAVED_JOBS", JSON.stringify(updatedJobList));
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Text style={{textAlign: "center", fontWeight:"bold", fontSize: 20,}}>JOBS FOR {selectLanguage.toUpperCase()}</Text>
                {/* <Text>{selectLanguage}</Text> */}
                <FlatList 
                    data={data}
                    renderItem={renderJobs}
                />

                <TouchableOpacity 
                    style={{
                        backgroundColor: "blue",
                        padding: 10,
                        borderRadius: 10,
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                    }}
                    onPress={() => props.navigation.navigate("SavedJobs")}
                >
                    <Text style={{color: "white"}}>Kayıtlıları Gör</Text>
                </TouchableOpacity>

                <Modal isVisible={modalFlag} onBackdropPress={() => setModalFlag(false)}>
                    <View style={jobs.modalBackground}>
                        <View style={{borderBottomWidth:2, borderColor: "#bdbdbd"}}>
                            <Text style={jobs.jobTitle}>{selectedJob.title}</Text>
                            <Text>{selectedJob.location}</Text>
                            <Text>{selectedJob.company}</Text>
                        </View>
                        {/* <View style={jobs.jobDesc}>
                            <Text style={{fontWeight:"bold"}}>Description</Text>
                            <Text numberOfLines={5}>{selectedJob.description}</Text>
                        </View> */}
                        <View style={jobs.jobDesc}>
                            <WebView
                                source={{html: selectedJob.description}}
                                // Aşağıdaki style'ı vermezsek gözükmez!!
                                // height: Dimensions.get("window").height / 2
                            />
                        </View>
                        <Button title="Save" onPress={onJobSave}/> 
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export { Jobs }; 