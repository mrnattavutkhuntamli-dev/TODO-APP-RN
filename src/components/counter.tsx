import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function Counter() {
    const [count, setCount] = useState(0);
    return (
        <View>
            <Text>นับได้ {count}</Text>
            <Button title="เพิ่ม" onPress={() => setCount(count + 1)} />
            <Button title="ลบ" onPress={() => setCount(0)} />
        </View>
    )
}