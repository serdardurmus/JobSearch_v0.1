import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, View, FlatList} from 'react-native';

import { JobItem } from '../components';

const Jobs = (props) => {
    const [data, setData] = useState([]);
    const {selectLanguage} = props.route.params

    const fetchData = async () => {
        const response = await Axios.get(`https://jobs.github.com/positions.json?search=${selectLanguage.toLowerCase()}`)
        setData(response.data);
    }

    useEffect(() => { 
        fetchData()
    }, []);

    // renderItem için buraya fonksiyonu yazıyoruz
    const renderJobs = ( {item}) => <JobItem job={item}/>

    return (
        <SafeAreaView>
            <View>
                <Text style={{textAlign: "center", fontWeight:"bold", fontSize: 20,}}>JOBS FOR {selectLanguage.toUpperCase()}</Text>
                {/* <Text>{selectLanguage}</Text> */}
                <FlatList 
                    data={data}
                    renderItem={renderJobs}
                />
            </View>
        </SafeAreaView>
    )
}

export { Jobs }; 