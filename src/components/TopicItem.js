import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity} from 'react-native';

import { topicItem } from '../styles';

// {id: 0, name: 'Java', color: 'fb5607'}

const TopicItem = (props) => {
    return (
        <TouchableOpacity
            style={[topicItem.container, { backgroundColor: `#${props.item.color}`}]}
            onPress={props.onSelect}  // onPress metodunu yukarı çıkartmış olduk
        >
            <Text style={topicItem.text}>{props.item.name}</Text>
        </TouchableOpacity>
    )
}

export { TopicItem }; 