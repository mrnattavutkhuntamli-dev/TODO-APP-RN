import { Todo } from '@/types/todo';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onRemove }: Props) {
  return (
    <View style={styles.row}>
      <Pressable onPress={() => onToggle(todo.id)} style={styles.checkArea}>
        <View style={[styles.checkbox, todo.done && styles.checkboxDone]}>
          {todo.done && <Text style={styles.check}>✓</Text>}
        </View>
        <Text style={[styles.text, todo.done && styles.textDone]}>
          {todo.text}
        </Text>
      </Pressable>
      <Pressable onPress={() => onRemove(todo.id)} hitSlop={8}>
        <Text style={styles.delete}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    gap: 12,
  },
  checkArea: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  check: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  text: { fontSize: 16, flexShrink: 1 },
  textDone: { textDecorationLine: 'line-through', color: '#94a3b8' },
  delete: { fontSize: 18, color: '#ef4444', paddingHorizontal: 4 },
});