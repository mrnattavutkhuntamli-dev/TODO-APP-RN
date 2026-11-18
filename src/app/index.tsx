import TodoInput from '@/components/Todo-input';
import TodoFilter from '@/components/TodoFilter';
import TodoItem from '@/components/TodoItem';
import { useTodos } from '@/hooks/useTodos';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { todos, filter, setFilter, addTodo, toggleTodo, removeTodo, clearDone, stats, loaded } =
    useTodos();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>📝 Todo</Text>
        <Text style={styles.subtitle}>
          ทั้งหมด {stats.total} · เสร็จ {stats.done} · ค้าง {stats.active}
        </Text>

        <TodoInput onAdd={addTodo} />
        <TodoFilter value={filter} onChange={setFilter} />

        {!loaded ? (
          <Text style={styles.empty}>กำลังโหลด...</Text>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(t) => t.id}
            renderItem={({ item }) => (
              <TodoItem todo={item} onToggle={toggleTodo} onRemove={removeTodo} />
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>ยังไม่มีรายการ</Text>
            }
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}

        {stats.done > 0 && (
          <Pressable onPress={clearDone} style={styles.clearBtn}>
            <Text style={styles.clearText}>ลบรายการที่เสร็จแล้ว ({stats.done})</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0f172a' },
  subtitle: { color: '#64748b', marginTop: 4, marginBottom: 12 },
  empty: { textAlign: 'center', color: '#94a3b8', marginTop: 40 },
  clearBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    marginTop: 8,
  },
  clearText: { color: '#b91c1c', fontWeight: '600' },
});