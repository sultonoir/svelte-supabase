<script>
	import Document from '@tiptap/starter-kit';
	import Paragraph from '@tiptap/extension-paragraph';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	import {
		Bold,
		Code,
		CornerDownLeft,
		Heading1,
		Heading2,
		Heading3,
		Heading4,
		Heading5,
		Heading6,
		Italic,
		List,
		ListOrdered,
		Minus,
		Quote,
		Redo,
		RemoveFormatting,
		SquareCode,
		Strikethrough,
		Type,
		Undo
	} from 'lucide-svelte';

	/**
	 * @type {HTMLDivElement}
	 */
	let element;
	/**
	 * @type {Editor}
	 */
	let editor;
	/**
	 * @type {string}
	 */
	let show;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Document,
				Paragraph.configure({
					HTMLAttributes: {
						class: 'text-sm'
					}
				})
			],
			editorProps: {
				attributes: {
					class:
						'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-block border border-border p-4'
				}
			},
			content: `
      <p>text...</p>
            `,
			onUpdate: ({ editor }) => {
				const test = editor.getHTML();
				show = test;
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});
</script>

{#if editor}
	<div class="tiptap">
		<div class="flex flex-wrap justify-between mx-5">
			<button
				on:click={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class={editor.isActive('bold') ? 'is-active' : ''}
			>
				<Bold />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class={editor.isActive('italic') ? 'is-active' : ''}
			>
				<Italic size="20" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class={editor.isActive('strike') ? 'is-active' : ''}
			>
				<Strikethrough />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				class={editor.isActive('code') ? 'is-active' : ''}
			>
				<Code />
			</button>
			<button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
				<RemoveFormatting />
			</button>

			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class={editor.isActive('paragraph') ? 'is-active' : ''}
			>
				<Type />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
			>
				<Heading1 />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
			>
				<Heading2 />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
			>
				<Heading3 />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				class={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
			>
				<Heading4 />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				class={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
			>
				<Heading5 />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				class={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
			>
				<Heading6 />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				<List />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class={editor.isActive('orderedList') ? 'is-active' : ''}
			>
				<ListOrdered />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCodeBlock().run()}
				class={editor.isActive('codeBlock') ? 'is-active' : ''}
			>
				<SquareCode />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				class={editor.isActive('blockquote') ? 'is-active' : ''}
			>
				<Quote />
			</button>
			<button on:click={() => editor.chain().focus().setHorizontalRule().run()}><Minus /></button>
			<button on:click={() => editor.chain().focus().setHardBreak().run()}>
				<CornerDownLeft /></button
			>
			<button
				on:click={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				<Undo />
			</button>
			<button
				on:click={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				<Redo />
			</button>
		</div>
	</div>
{/if}
<div bind:this={element} />

<div
	class="tiptap prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-block p-4"
>
	{@html show}
</div>
