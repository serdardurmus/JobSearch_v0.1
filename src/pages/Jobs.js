import Axios from 'axios';
import Modal from 'react-native-modal';

import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, View, FlatList} from 'react-native';

import { JobItem } from '../components';
import { jobs } from '../styles';

const Jobs = (props) => {
    const [data, setData] = useState([]);

    // modul içine veri gçndermek için bunu kullanacağız
    const [selectedJob, setSelectedJob] = useState([]);

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


    const onJobSelect= () => {
        setModalFlag(true)
        setSelectedJob(jobs)
    }

    // renderItem için buraya fonksiyonu yazıyoruz
    const renderJobs = ( {item}) => <JobItem job={item} onSelect={() => onJobSelect(item)}/>

    return (
        <SafeAreaView>
            <View>
                <Text style={{textAlign: "center", fontWeight:"bold", fontSize: 20,}}>JOBS FOR {selectLanguage.toUpperCase()}</Text>
                {/* <Text>{selectLanguage}</Text> */}
                <FlatList 
                    data={data}
                    renderItem={renderJobs}
                />
                <Modal isVisible={modalFlag}>
                    <View style={jobs.modalBackground}>
                        <Text style={jobs.jobTitle}>{selectedJob.title}</Text>
                        <Text>{selectedJob.location}</Text>
                        <Text>{selectedJob.company}</Text>
                        <Text numberOfLines={5}>{selectedJob.description}</Text>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export { Jobs }; 