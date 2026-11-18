import { Filter, Todo } from '@/types/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todos:v1';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>('all');
    const [loaded, setLoaded] = useState(false);

    // โหลดครั้งแรก
    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) setTodos(JSON.parse(raw));
            } catch (e) {
                console.warn('load todos failed', e);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    // บันทึกทุกครั้งที่เปลี่ยน (ข้ามตอนยังไม่โหลดเสร็จ)
    useEffect(() => {
        if (!loaded) return;
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch((e) => console.warn(`save todos failed`, e));
    }, [todos, loaded]);


    const addTodo = useCallback((text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos((prev) => [
            {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                text: trimmed,
                done: false,
                createdAt: Date.now(),
            },
            ...prev,
        ]);
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    }, []);

    const removeTodo = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    }, [])

    const clearDone = useCallback(() => {
        setTodos((prev) => prev.filter((t) => !t.done));
    }, []);

    const filtered = useMemo(() => {
        if (filter === 'active') return todos.filter((t) => !t.done);
        if (filter === 'done') return todos.filter((t) => t.done);
        return todos;
    }, [todos, filter]);

    const stats = useMemo(() => {
        const done = todos.filter((t) => t.done).length;
        return { total: todos.length, done, active: todos.length - done };
    }, [todos]);


    return {
        todos: filtered,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        removeTodo,
        clearDone,
        stats,
        loaded,
    };
}