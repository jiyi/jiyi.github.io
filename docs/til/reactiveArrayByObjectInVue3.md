---
lang: zh-CN
title: vue3 里面reactive数组中对象的处理
description: vue3 reactive 数组，里面存储对象，如何对对象进行添加，修改，删除
---

# vue3 里面数组里对象的处理

```javascript
/**
 * 定义一个reactive数组
 * [{id, content, created}, {}, ...]
 */
const notes = reactive([])
// 定义已选择的id
const selectedId = ref(null)
/**
 * 生成已选择的note
 * find有找到返回的是ref对象
 * find没找到到返回的是undefined
 * 可以使用 v-model="selectedNote.content" 显示与修改notes里的数据
 */
const selectedNote = computed(() =>
    notes.find(note => note.id === selectedId.value)
)

/**
 * 新增数据
 * reactive 使用 push新增数据
 */
const addNote = () => {
    const time = Date.now()
    const note = {
        id: String(time),
        content: '内容',
        created: time
    }
    notes.push(note)
}

/**
 * 删除已选择的数据
 * reactive 可以使用indexOf查找数组里的数据，参数是对象原始值
 * 使用computed返回的值查找，需要加上value
 * reactive 可以使用splice 删除数组里面的的值
 */
const removeNote = () => {
    const index = notes.indexOf(selectedNote.value)
    if (index !== -1) {
        notes.splice(index, 1)
    }
}

/**
 * 生成排序后的新数组，通过创建时间排序
 * 使用 slice() 返回新数组，使用 sort 排序
 */
const sortedNotes = computed(() =>
    notes.slice()
        .sort((a, b) => a.created - b.created)
)

```
