import { Filter } from '@/types/todo';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  value: Filter;
  onChange: (f: Filter) => void;
};

const OPTIONS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'active', label: 'ยังไม่เสร็จ' },
  { key: 'done', label: 'เสร็จแล้ว' },
];

export default function TodoFilter({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((o) => (
        <Pressable
          key={o.key}
          onPress={() => onChange(o.key)}
          style={[styles.chip, value === o.key && styles.chipActive]}
        >
          <Text style={[styles.chipText, value === o.key && styles.chipTextActive]}>
            {o.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginVertical: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
  },
  chipActive: { backgroundColor: '#2563eb' },
  chipText: { color: '#334155', fontSize: 14 },
  chipTextActive: { color: '#fff', fontWeight: '600' },
});