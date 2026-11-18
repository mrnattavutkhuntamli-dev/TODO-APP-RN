import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = { onAdd: (text: string) => void };

export default function TodoInput({ onAdd }: Props) {
    const [text, setText] = useState('');

    const submit = () => {
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };


    return (
        <View style={styles.row}>
            <TextInput
                value={text}
                onChangeText={setText}
                onSubmitEditing={submit}
                placeholder="เพิ่มงานใหม่..."
                style={styles.input}
                returnKeyType="done"
            />
            <Pressable onPress={submit} style={styles.btn}>
                <Text style={styles.btnText}>+</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: 8, marginBottom: 12 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    btn: {
        width: 48,
        borderRadius: 10,
        backgroundColor: '#2563eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: { color: '#fff', fontSize: 24, lineHeight: 28 },
});