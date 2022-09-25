import { v4 as uuid } from "uuid";
import { TodoItem } from "./models/todoModel.js";

// 生成唯一 id
export function generateId() {
    return uuid();
}
// 从 localStorage 获取或向 localStorage 同步数据
export function store(namespace: string, data?: Array<TodoItem>) {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }
    
    const store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
  }