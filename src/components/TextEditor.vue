<template>
    <div ref="editorContainer" class="editor-container"></div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, defineProps, watch, defineEmits } from 'vue';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css'; 
  
  const props = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
  
  const editorContainer = ref<HTMLElement | null>(null);
  const quill = ref<Quill | null>(null);
  
  onMounted(() => {
    quill.value = new Quill(editorContainer.value!, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
      },
      placeholder: 'Write your description here...',
    });
  
    quill.value.on('text-change', () => {
      const content = quill.value?.root.innerHTML || '';
      emit('update:modelValue', content);
    });
  });
  
  onBeforeUnmount(() => {
    if (quill.value) {
      quill.value = null;
    }
  });
  
  watch(() => props.modelValue, (newValue) => {
    if (quill.value && newValue !== quill.value.root.innerHTML) {
      quill.value.root.innerHTML = newValue;
    }
  });
</script>
  
<style scoped>
  .editor-container {
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 150px;
  }
</style>